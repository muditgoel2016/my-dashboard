# Soar Dashboard Documentation

## Project Structure

1. File and Folder Organization
    Root Level Structure:
      - /app: Main application code using Next.js App Router
      - /public: Static code
      - /public/uploads: Location for keeping profile image uploads 
      (only for this assignment; in real world, would store in cloud env)
      - /data: for storing local data sources, right now settings.json for user profile settings.

    App Directory Breakdown:
   - /api: Route handlers organized by feature
     - /dashboard: Dashboard-related endpoints
     - /settings: Settings-related endpoints
   
   - /components: UI components organized by:
     - /shared: Common components
       - /common: Base UI elements (buttons, cards)
       - /desktop: Desktop-specific layouts
       - /mobile: Mobile-specific layouts
     - /dashboard: Dashboard-specific components
     - /settings: Settings-specific components
   
   - /services: Business and data logic
     - /dataServices: Data manipulation
     - /endpointHandlerServices: API handlers
     - /otherServices: Utilities
   
   - /contexts: React Context providers
   - /pages: Route-level components

2. Coding Patterns
   - Pages are the entry point into the running application.
   - page.tsx files are the first one to execute on server.
   - They check between mobile and desktop layout on server-side and feed that information to    client.tsx.
   - They prefetch app data server-side as well if flag set-so and pass it to intialize context data.
   - client.tsx intializes client side device detection utility with server-side device information and manages between serving up mobile and desktop layout.
   - client.tsx provides each feature with its context.
   - Each feature file such as Dashboard.tsx uses its context to populate its layout.
   - Each context fetches data on client side invoking the right service method if server fetch flags are disabled.

3. Development Standards & Code Quality
   - ESLint rules categorized by:
    - Security
    - Accessibility 
    - Performance
    - Code quality
    - and many more
  - Unit testing at all layers
  - TypeScript interfaces per feature
 
4. Build Configuration
  - Next.js configuration
  - Environment-based rendering toggles

## Architecture

1. Component Interactions
  - Context providers for data sharing
  - Service layer communication
  - Parent-child component relationships

2. Data Flow Patterns
  - Data services connecting to data sources
  - Handler services for API endpoints
  - React Contexts either pre-seeded or client-fetched
  - Form validation across client/server

3. System Design Decisions
  - Separate mobile/desktop implementations
  - Feature-based code organization
  - Service-oriented architecture
  - Custom error page with navigation

4. Technical Stack Choices
  - Next.js 15 for framework
  - TypeScript for type safety
  - ShadCn UI for components
  - Tailwind for styling
  - Jest for testing

## Implementation Thought Process

1. Layout Decisions
  - Identified "paper-in-grid" pattern from Figma
  - Separated layouts for mobile/desktop to avoid conditional complexity
  - Used flex-based grid for irregular layouts

2. UI Component Decisions
  - Chose ShadCn for complete code ownership
  - Selected Lucide-react icons with custom SVGs for key elements
  - Made styling data-driven for components like credit cards

3. Technical Considerations
  - Client-side only charts for browser compatibility
  - Feature-based organization for scalability
  - Toggle-based client/server rendering
  
4. Future Enhancements
  - Layout.js consolidation for navigation elements
  - Dynamic layout system based on JSON
  - Entity-based data schema
  - Centralized theme service