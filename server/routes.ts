import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

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

  const httpServer = createServer(app);

  return httpServer;
}
