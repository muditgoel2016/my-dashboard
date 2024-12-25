# Project Overview and Design Philosophy
Feature and component structure
  - Separation of concerns through feature-based organization; each page correspond roughly to a feature
  - Responsive design with dedicated layouts
  - Shared common, mobile and desktop specific compponents to serve as building blocks, e.g. top-bar.tsx
  - Sepcific, "feature" components such as dashboard
  - Routed components called pages serving as portal into the application; they render specific and common components

Form Validations
 - A validation utility service method is used to facilitate client and server side validations of settings form.

Data-sources, services, contexts and apis
  - Data services tap into data sources (right now only settings has a separate data source file, setting.json); providing data to handlers that in turn are invoked by apis.
  - These apis can be invoked either on server (server to server) or client to server depending on certain flags in code.
  - utility services such as form validation services live inside other services.
  - Context are React context apis, that are either preseeded with data or fetch data on client side depending on code flags for apis powering the components with this data

Data Schema Structure
 - Follows simplified structure based on WYSWIG principles; there is a settings.json that powers settings form and profile image, get, post  etc. Rest of data is still held within response handlers for the time being.

Linting rules, Unit Testing
  - Unit testing at all layers
  - Robust set of eslint rules; divided up into separate sections based on purpose such as security, accessibility, performance, code quaqlity etc.
- 

Explanation for Design Implementation; Thought process
 - At highest level, app is made up of pages. Each page has a side nav and a top bar and a main area. Main area is decomposed into flex rows; each flex row has a paper with a traransparent paper level header that houses title; Each paper houses the actual widget. The flex rows themselves are flex items laid out columnwise in a flex contaienr. 
 Separate layouts have been made for desktop from mobile t oavoid cluttering single layout with conditionals as author believes layouts for both are distinct enough. 
So, any piece which has a different identity goes into separate desktop and mobile folders.
Utmost effort has been taken to align emerging designs to the mockup; Though icons in the mockup are custom designed and no library give them exactly same. So, the author has 
used similar lucid-react icons in most places instead of them. Just want to mention that these icons can any time be replaced by svg downloaded from the mockup. 
In few prominent places such as next to "Soar Task" title; on credit cards; author has already used svgs downloaded from the mockup.
Designing credit cards presented challenge as black with gradient had diffent styles from white one; so made styling in this case data driven. So data would tell styles needed
to render black credit card for instance for gradient effect; as gradient not needed for white card so its data does not contain gradient instruction.

Font type and other parameters have been aligned with Figma based font's provided with nextjs to the extent possible.
Decision was taken to use ShadCn ui components for things like tabs, buttons, avatars (see common folder). They provide their component through copy and paste mode as well.
That way we get complete ownership of their code and modify these components to suit our application avoiding styling  and behaviour conflicts etc many package based ui library result in. Also Shadcn is compatible with tailwind, one of the asks, so that works out additionally.

Also decision was made to use custom 404 page with side nav and top/bottom bar for pages not developed yet so that user can still navigate back to developed pages upon landing on them by using side nav etc.

Quick Transfer's "send amount" functionality has been bult without any backend api support, that is ui only as mentioned using shadcn toast.

Application can generate components etc on server as well as on client based on in-code flags. They can be toggled to switch between client and server side rendering to gain
best of both worlds.
None of the charts should be tried to be rendered on server as the libraries used for them are entirely browser based, not supporting server-side at all. In fact they are imported dynamically with ssr set to false.

Next Steps:
1. Factor out navbars, tonavs and bottom bars in top-level layout.js so that no need to import into each page.
2. Add functionality tests, e2e test, integration tests; right now unit tests are provided in jest.
3. Make the 'paper in grid' layout style dynamic driven by data; that way just need to specify new layout.json and it would be able to create paper grid based on that.
4. Refine the data source's schema to be entity based; so that wiould have user entity; card entity etc.
5. Extract out style patterns just as layout etc, and style based on them for eg have a theme service; you change font one place and it reflects application wide rather than having to run around from place to place making that change

## Soar Dashboard - Technical Architecture Document

## Project Overview and Design Philosophy
- Separation of concerns through feature-based organization
- Mobile-first responsive design with dedicated layouts
- Component reusability and maintainability
- Comprehensive testing at all layers

## Architectural Decisions

### 1. Directory Structure Rationale
The project follows a feature-first organization:

app/
  components/  
    - Organized by feature (dashboard, settings)
    - Shared components separated for reusability
    - Mobile/desktop separation for clear responsive design
  
  services/
    - Data services for business logic
    - Endpoint handlers for API interactions
    - Clear separation of data and presentation layers

  contexts/
    - Global state management
    - Feature-specific contexts for scalability

### 2. Component Architecture
We implement a three-tier component hierarchy:

a. Page Components (/pages)
   - Handle routing and layout selection
   - Manage mobile/desktop view switching
   - Example: dashboard/page.tsx orchestrates the dashboard experience

b. Feature Components (/components/[feature])
   - Implement core business functionality
   - Separate mobile/desktop versions
   - Example: dashboard/BalanceHistory.tsx for financial visualizations

c. Shared Components (/components/shared)
   - Reusable UI elements
   - Consistent styling and behavior
   - Example: common/button.tsx for standardized buttons

### 3. Data Flow Architecture
We use a service-oriented approach:

a. Data Services Layer
   - Handle business logic and data transformations
   - Example: dashboardDataService.ts processes financial data

b. API Layer
   - Route handlers for backend communication
   - Structured error handling
   - Example: dashboard/balanceHistory/route.ts

c. Context Layer
   - Global state management
   - Feature-specific contexts
   - Example: DashboardContext.tsx for dashboard state

### 4. Testing Strategy
Comprehensive testing at multiple levels:

a. Component Testing
   - Unit tests for individual components
   - Integration tests for feature flows
   - Example: BalanceHistory.test.tsx

b. Service Testing
   - Business logic validation
   - API endpoint testing
   - Example: dashboardDataService.test.ts

## Implementation Highlights

### 1. Responsive Design Implementation
- Dedicated mobile/desktop components
- Responsive layouts using Tailwind CSS
- Media query hooks for dynamic adaptation

### 2. State Management
- Context API for global state
- Feature-specific contexts for modularity
- Service layer for data operations

### 3. Performance Considerations
- Component-level code splitting
- Optimized bundle sizes
- Efficient data fetching patterns

## Development Workflow

### 1. Code Organization
- Feature-based directory structure
- Clear separation of concerns
- Consistent naming conventions

### 2. Testing Approach
- Jest for unit testing
- React Testing Library for component testing
- API route testing

### 3. Build and Deployment
- Next.js optimized builds
- Bundle analysis for optimization
- Environment-specific configurations

## Future Improvements and Scalability

### 1. Planned Features
- Additional financial modules
- Enhanced data visualization
- Advanced user customization

### 2. Technical Enhancements
- Performance optimization
- Accessibility improvements
- Enhanced error handling