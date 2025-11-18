# Hope Street Health Center Medication Lookup

## Overview

This is a healthcare utility application designed for Hope Street Health Center in South Los Angeles. It provides a simple medication lookup tool for clinic staff and 12,000 low-income patients who need quick access to medication information. The application addresses a critical need created when the clinic's Electronic Health Records system and medication database subscriptions lapsed during shutdown.

The tool allows users to search medications by generic or brand name and displays essential information including primary use, dosage instructions, warnings, and side effects. It's optimized for users with limited digital literacy, vision impairments, and non-English speakers who may be under stress when seeking medication information.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool.

**Component Structure**: The application follows a component-based architecture with:
- Page components (`client/src/pages/`) for route-level views
- Reusable UI components (`client/src/components/`) for search, results, and medication display
- Shadcn/ui component library (`client/src/components/ui/`) for accessible, pre-built UI primitives

**State Management**: React Query (TanStack Query) handles server state and data fetching with built-in caching. Local component state manages UI interactions like search queries and selected medications.

**Routing**: Wouter provides lightweight client-side routing.

**Styling**: Tailwind CSS with a custom design system focused on accessibility. The configuration uses CSS variables for theming and includes a "New York" style preset from Shadcn/ui. Design guidelines emphasize:
- Large touch targets (minimum 44px)
- High contrast colors
- Readable font sizes (minimum 16px, body text at 18px)
- Single-column mobile-first layout
- Maximum content width of 800px for optimal readability

**Accessibility Design Decisions**: The application prioritizes clarity over aesthetics with system fonts, generous spacing, and error-tolerant interfaces designed for stressed users with varying technical abilities.

### Backend Architecture

**Server Framework**: Express.js running on Node.js.

**API Design**: RESTful API with a single endpoint (`/api/medications`) that serves medication data. The server reads from a CSV file and transforms it into JSON format.

**Data Parsing**: Custom CSV parser handles quoted fields to properly parse medication data with commas in descriptions.

**Development Setup**: Vite dev server runs in middleware mode alongside Express, enabling hot module replacement during development. Production builds serve static assets from the `dist/public` directory.

**Logging**: Custom request logging middleware tracks API calls with timing information.

### Data Storage Solutions

**Medication Data**: Currently stored in a CSV file (`server/medications.csv`) and served via API endpoint. Data is parsed on each request rather than cached.

**Database Configuration**: Drizzle ORM is configured with PostgreSQL support (using Neon serverless driver), though the current implementation uses in-memory storage for user data and file-based storage for medications. The schema includes a users table with username/password authentication structure.

**Future Database Integration**: The architecture is prepared for PostgreSQL integration with migration support configured in `drizzle.config.ts`.

### External Dependencies

**UI Component Library**: Radix UI provides accessible, unstyled component primitives for dialogs, dropdowns, popovers, and other interactive elements. These are wrapped with Shadcn/ui styling.

**Styling Tools**:
- Tailwind CSS for utility-first styling
- class-variance-authority for component variant management
- clsx and tailwind-merge for conditional class composition

**Form Handling**: React Hook Form with Zod resolvers for form validation (configured but not actively used in current medication lookup).

**Date Utilities**: date-fns for date manipulation.

**Icons**: Lucide React for accessible icon components.

**Development Tools**:
- Replit-specific Vite plugins for error overlays, cartographer, and dev banners
- TypeScript for type safety
- ESBuild for server-side bundling

**Database Driver**: @neondatabase/serverless for PostgreSQL connectivity (configured but not yet actively used for medication data).

**Session Management**: connect-pg-simple for PostgreSQL-backed session storage (configured but not actively used).