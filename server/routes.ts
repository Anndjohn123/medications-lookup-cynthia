import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { 
  getDrugLabelByName, 
  getAdverseEventsByDrug, 
  searchDrugLabel,
  searchAdverseEvents,
  searchDrugEnforcement,
  ValidationError
} from "./openfda-service";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/medications", async (req, res) => {
    try {
      const csvPath = path.join(__dirname, "medications.csv");
      const csvContent = fs.readFileSync(csvPath, "utf-8");
      
      const lines = csvContent.trim().split("\n");
      const headers = lines[0].split(",");
      
      const medications = lines.slice(1).map((line, index) => {
        const values: string[] = [];
        let currentValue = "";
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          
          if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === "," && !inQuotes) {
            values.push(currentValue.trim());
            currentValue = "";
          } else {
            currentValue += char;
          }
        }
        values.push(currentValue.trim());
        
        return {
          id: values[0].toLowerCase().replace(/\s+/g, "-"),
          genericName: values[0],
          brandNames: values[1],
          primaryUse: values[2],
          howToTake: values[3],
          warnings: values[4],
          sideEffects: values[5]
        };
      });
      
      res.json(medications);
    } catch (error) {
      console.error("Error reading medications CSV:", error);
      res.status(500).json({ error: "Failed to load medications" });
    }
  });

  app.get("/api/fda/drug-label/:drugName", async (req, res) => {
    try {
      const { drugName } = req.params;
      const label = await getDrugLabelByName(drugName);
      
      if (!label) {
        return res.status(404).json({ error: "Drug label not found in FDA database" });
      }
      
      res.json(label);
    } catch (error) {
      console.error("Error fetching FDA drug label:", error);
      if (error instanceof ValidationError) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Failed to fetch drug label from FDA" });
    }
  });

  app.get("/api/fda/adverse-events/:drugName", async (req, res) => {
    try {
      const { drugName } = req.params;
      const events = await getAdverseEventsByDrug(drugName);
      
      res.json({ 
        drugName,
        totalEvents: events.length,
        events 
      });
    } catch (error) {
      console.error("Error fetching FDA adverse events:", error);
      if (error instanceof ValidationError) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Failed to fetch adverse events from FDA" });
    }
  });

  app.get("/api/fda/search/labels", async (req, res) => {
    try {
      const { q, limit = "5" } = req.query;
      
      if (!q || typeof q !== "string") {
        return res.status(400).json({ error: "Query parameter 'q' is required" });
      }
      
      const parsedLimit = parseInt(limit as string);
      const results = await searchDrugLabel(q, parsedLimit);
      res.json(results);
    } catch (error) {
      console.error("Error searching FDA drug labels:", error);
      if (error instanceof ValidationError) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Failed to search drug labels" });
    }
  });

  app.get("/api/fda/search/events", async (req, res) => {
    try {
      const { q, limit = "10" } = req.query;
      
      if (!q || typeof q !== "string") {
        return res.status(400).json({ error: "Query parameter 'q' is required" });
      }
      
      const parsedLimit = parseInt(limit as string);
      const results = await searchAdverseEvents(q, parsedLimit);
      res.json(results);
    } catch (error) {
      console.error("Error searching FDA adverse events:", error);
      if (error instanceof ValidationError) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Failed to search adverse events" });
    }
  });

  app.get("/api/fda/enforcement/:drugName", async (req, res) => {
    try {
      const { drugName } = req.params;
      const results = await searchDrugEnforcement(drugName, 5);
      
      res.json({
        drugName,
        recalls: results.results || [],
        total: results.meta?.results?.total || 0
      });
    } catch (error) {
      console.error("Error fetching FDA enforcement data:", error);
      if (error instanceof ValidationError) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Failed to fetch enforcement data from FDA" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
