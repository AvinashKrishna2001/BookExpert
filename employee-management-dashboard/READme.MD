## Assessment Overview

The application allows authenticated users to:

- Log in via a mock authentication flow
- View an employee dashboard
- Add, edit, delete employees
- Upload and preview profile images
- Search employees by name
- Filter employees by gender and active/inactive status (combined filtering)
- Print the filtered employee list
- Run unit tests for business logic and UI behavior

The project intentionally prioritizes **correct data flow, separation of concerns, and testability** over unnecessary visual complexity.

---

## Tech Stack

| Category         | Technology                       |
| ---------------- | -------------------------------- |
| Frontend         | React (JavaScript)               |
| Build Tool       | Vite                             |
| UI Library       | Material UI (MUI v5)             |
| Routing          | React Router v6                  |
| State Management | React Context API                |
| Persistence      | localStorage (via service layer) |
| Testing          | Vitest + React Testing Library   |
| Styling          | MUI Theme + CSS                  |

---

## Architecture

### Why React Context API?

React Context is used for **global, cross-cutting state**:

- `AuthContext` → Authentication state
- `EmployeeContext` → Employee data & CRUD operations

This avoids:

- Prop drilling
- Over-engineering with Redux for a medium-sized app

Context is ideal here because:

- The data is needed across multiple components
- State changes must be predictable and centralized

---

### Why a Service Layer?

All persistence logic is isolated inside **services**:

- `employeeService.js`
- `authService.js`

This ensures:

- UI components stay clean
- Business logic is reusable
- Swapping localStorage → real API is trivial

---

### Why This Folder Structure?

The structure is **responsibility-driven**, not file-type driven.

This mirrors how real production React applications are organized.

---

## Folder Structure & Explanation

```
src/
```

### `assets/`

- Centralized styling and theming
- `theme.js` defines the global MUI theme (colors, typography)

---

### `components/`

Reusable UI components, grouped by domain.

#### `components/common/`

Generic, reusable UI elements:

- `ConfirmDialog.jsx` → Delete confirmation modal
- `EmptyState.jsx` → Empty data UI
- `LoadingSpinner.jsx` → Loading indicator

#### `components/employee/`

Employee-specific UI:

- `EmployeeForm.jsx` → Add/Edit employee form (reused)
- `EmployeeTable.jsx` → Employee listing table
- `SearchBar.jsx` → Name search input
- `FilterPanel.jsx` → Gender & status filters
- `PrintableEmployeeList.jsx` → Print-only component

#### `components/layout/`

Layout and structural components:

- `Header.jsx` → App header + logout
- `Layout.jsx` → Wraps protected pages
- `SummaryCard.jsx` → Dashboard summary cards

---

### `context/`

Global state providers:

- `AuthContext.jsx` → Login / logout state
- `EmployeeContext.jsx` → Employee CRUD & state

---

### `data/`

- `mockData.js` → Optional seed/mock data for development

---

### `hooks/`

- `useLocalStorage.js` → Custom hook (kept for extensibility and experimentation)

---

### `pages/`

Route-level components:

- `LoginPage.jsx` → Authentication screen
- `DashboardPage.jsx` → Main employee dashboard

---

### `routes/`

Routing and route protection:

- `AppRoutes.jsx` → Centralized routing
- `ProtectedRoute.jsx` → Prevents unauthorized access

---

### `services/`

Business logic & persistence:

- `employeeService.js` → CRUD + localStorage
- `authService.js` → Mock authentication logic

---

### `tests/`

Unit tests (Vitest):

- `employeeService.test.js` → Business logic tests
- `EmployeeForm.test.jsx` → Form validation test
- `Dashboard.filter.test.jsx` → Combined filter logic test
- `setup.js` → Jest-DOM setup

---

### `utils/`

Pure helper functions:

- `validation.js` → Form validation rules
- `printHelper.js` → Print data formatting
- `helpers.js` → Shared utility logic

---

## Authentication Flow

- Mock authentication (no backend)
- User always starts on **Login page**
- Dashboard is protected using `ProtectedRoute`
- Logout clears auth state and redirects to login

> Authentication persistence was intentionally avoided to ensure a deterministic login flow for the assignment.

---

## Search & Filter Logic

- Search by **full name**
- Filter by:

  - Gender
  - Active / Inactive status

- Filters work **together**, not independently
- Filtering is implemented as **derived state** using `useMemo`

---

## Print Functionality

- Uses `react-to-print`
- Prints **only the currently filtered employees**
- Implemented via a hidden, print-only component
- Keeps print logic decoupled from UI

---

## Unit Testing

Tests focus on **high-value logic**, not UI snapshots.

### What is tested?

- Employee CRUD logic
- Form validation behavior
- Combined filter logic

### What is intentionally NOT tested?

- MUI internals
- Layout styling
- Icons and visuals

This approach keeps tests:

- Fast
- Maintainable
- Meaningful

---

## How to Run the Project

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

The app will run at:

```
http://localhost:5173
```

---

## Run Unit Tests

```bash
npm run test
```

Vitest runs in watch mode by default.
