# Frontend Boilerplate

React + TypeScript + Vite starter with a ready-made UI kit: layout shell, forms, tables, cards, dialogs, widgets, feedback states, and design tokens. Clone this repo and build your product on top of the shared components under `src/components`.

## Stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS 4** + **shadcn/ui** primitives
- **React Router** for routing
- **React Hook Form** + **Zod** for forms
- **TanStack Table** + **TanStack Virtual** for data tables
- **date-fns** + **react-day-picker** for dates
- **Sonner** for toasts
- **Lucide React** for icons

## Getting started

```bash
npm install
npm run dev
```

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Typecheck and production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## Project structure

```
src/
├── components/
│   ├── layout/        # App shell (sidebar, topbar, page chrome)
│   ├── forms/         # Inputs, selects, date pickers, uploads
│   ├── tables/        # DataTable and helpers
│   ├── ui/            # Cards, dialogs, buttons, shadcn primitives
│   ├── feedback/      # Alerts, loaders, empty/error states
│   ├── widgets/       # Dashboard widgets
│   └── typography/    # Text scale components
├── config/            # Navigation and app config
├── pages/             # Route pages (examples / starters)
├── styles/tokens/     # Design tokens (color, spacing, type, etc.)
└── lib/               # Shared utilities (e.g. `cn`)
```

Prefer importing from barrel files when available:

```ts
import { AppInput, AppSelect, AppDatePicker } from '@/components/forms'
import { AppLayout, PageHeader } from '@/components/layout'
import { DataTable } from '@/components/tables'
import { StatCard, AppDialog } from '@/components/ui/card' // or dialogs
```

---

## Custom components

### Layout (`src/components/layout`)

App shell and page structure.

| Component | Description |
|-----------|-------------|
| `AppLayout` | Root layout with sidebar + topbar + content outlet |
| `Sidebar` | Collapsible / mobile navigation sidebar |
| `Topbar` | Top navigation bar |
| `PageContainer` | Page-level width and padding wrapper |
| `PageHeader` | Page title area with actions |
| `ContentArea` | Main scrollable content region |

### Typography (`src/components/typography`)

Consistent text styles.

| Component | Description |
|-----------|-------------|
| `PageTitle` | Primary page heading |
| `PageDescription` | Supporting text under a page title |
| `SectionTitle` | Section heading |
| `CardTitle` | Card / panel heading |
| `WidgetTitle` | Widget heading (optional uppercase) |
| `Text` | Body text |
| `Muted` | Secondary / muted body text |
| `Caption` | Small supporting text |
| `Label` | Form / UI labels |
| `Tag` | Uppercase micro-label |
| `Number` | Tabular numeric display |

### Forms (`src/components/forms`)

Form fields wrap labels, errors, and helper text via `FieldWrapper`.

#### Text inputs

| Component | Description |
|-----------|-------------|
| `FieldWrapper` | Shared label / description / error / tooltip shell |
| `AppInput` | Base text input |
| `PasswordInput` | Password input with visibility toggle |
| `EmailInput` | Email input |
| `PhoneInput` | Phone input |
| `NumberInput` | Numeric input |
| `CurrencyInput` | Currency-styled input |
| `SearchInput` | Search input |
| `OTPInput` | OTP / one-time code input |
| `Textarea` | Multi-line text field |

#### Selection controls

| Component | Description |
|-----------|-------------|
| `Checkbox` | Checkbox with label |
| `Radio` | Radio option with label |
| `Switch` | Toggle switch |

#### Advanced inputs

| Component | Description |
|-----------|-------------|
| `Slider` | Range slider |
| `Rating` | Star rating |
| `ColorPicker` | Color input |

#### Uploads

| Component | Description |
|-----------|-------------|
| `FileUpload` | Drag-and-drop file upload |
| `AvatarUpload` | Circular avatar image upload |

#### Selects (`forms/select`)

| Component | Description |
|-----------|-------------|
| `AppSelect` | Standard select |
| `SearchableSelect` | Filterable select |
| `AppMultiSelect` | Multi-value select |
| `AsyncSelect` | Async / paginated options |
| `GroupedSelect` | Options grouped by category |
| `UserSelect`, `RoleSelect`, `CountrySelect`, `StateSelect`, `CitySelect` | Domain async selects |
| `AcademicYearSelect`, `SessionSelect`, `SchoolSelect`, `TeacherSelect`, `StudentSelect` | Education-domain async selects |

#### Date & time (`forms/date`)

| Component | Description |
|-----------|-------------|
| `AppDatePicker` | Single date |
| `DateRangePicker` | Start / end date range |
| `DateTimePicker` | Date + time |
| `TimePicker` | Time only |
| `MonthPicker` | Month selection |
| `YearPicker` | Year selection |
| `WeekPicker` | Week selection |
| `AcademicYearPicker` | Academic year range |

### Tables (`src/components/tables`)

Built on TanStack Table.

| Component | Description |
|-----------|-------------|
| `DataTable` | Full-featured data table |
| `DataTableColumnHeader` | Sortable column header |
| `DataTableToolbar` | Search / filter toolbar |
| `DataTablePagination` | Page size and page controls |

### Cards (`src/components/ui/card`)

| Component | Description |
|-----------|-------------|
| `AppCard` | Base card (`CardHeader`, `CardBody`, etc.) |
| `StatCard` | KPI / statistic card with optional trend |
| `MetricCard` | Metric display card |
| `ChartCard` | Card shell for charts |
| `EmptyCard` | Empty-state card with optional action |
| `LoadingCard` | Loading placeholder card |
| `InfoCard` | Informational callout card |
| `ActionCard` | Clickable action card |
| `FeatureCard` | Feature highlight card |

### Dialogs & drawers (`src/components/ui/dialogs`)

| Component | Description |
|-----------|-------------|
| `AppDialog` | Base dialog |
| `ConfirmDialog` | Confirm / cancel prompt |
| `FormDialog` | Dialog with form submit footer |
| `WizardDialog` | Multi-step wizard dialog |
| `AppDrawer` | Side sheet / drawer |
| `RightDrawer` / `LeftDrawer` / `BottomDrawer` | Side-specific drawers |

### Buttons & UI primitives (`src/components/ui`)

App-level wrappers and shadcn-based primitives used throughout the kit.

| Component | Description |
|-----------|-------------|
| `AppButton` | Button with icons, loading, and full-width support |
| `Badge` | Status / label badge |
| `Avatar` | User avatar |
| `Tabs` | Tab navigation |
| `Tooltip` | Hover tooltips |
| `DropdownMenu` | Dropdown menus |
| `Command` | Command palette / combobox |
| `Calendar` | Low-level calendar (prefer date pickers above) |
| `Progress`, `Skeleton`, `ScrollArea`, `Popover`, `Sheet`, `Alert`, `Toaster` | Supporting primitives |

### Feedback (`src/components/feedback`)

| Component | Description |
|-----------|-------------|
| `Alert` | Inline alert (default, success, warning, danger, info) |
| `Banner` | Full-width banner message |
| `InlineMessage` | Compact inline status text |
| `Spinner` | Loading spinner |
| `LoadingOverlay` | Overlay spinner with optional text |
| `ProgressBar` | Labeled progress bar |
| `Skeleton` | Content placeholder |
| `AppToaster` + `toast` | Toast notifications (Sonner) |
| `StateView` | Generic full-page state |
| `SuccessState`, `ErrorState`, `EmptyState`, `NotFound` | Common states |
| `PermissionDenied`, `Maintenance`, `Offline`, `NetworkError` | System / access states |

### Widgets (`src/components/widgets`)

Dashboard building blocks.

| Component | Description |
|-----------|-------------|
| `RecentActivityWidget` | Activity feed |
| `AnnouncementsWidget` | Announcements list |
| `TasksWidget` | Task checklist |
| `NotificationsWidget` | Notifications list |
| `UpcomingEventsWidget` | Upcoming events |
| `TimelineWidget` | Vertical timeline |
| `QuickActionsWidget` | Grid of quick actions |
| `CalendarWidget` | Mini calendar |
| `PerformanceGraphWidget` | Performance bar chart placeholder |
| `AttendanceSummaryWidget` | Attendance breakdown |
| `FeeCollectionWidget` | Fee collection summary |
| `RecentAdmissionsWidget` | Recent admissions list |
| `ExamSummaryWidget` | Next exam summary |
| `StatWidget` / `ChartWidget` | Aliases for `StatCard` / `ChartCard` |

---

## Design tokens

Shared tokens live in `src/styles/tokens/`:

- `colors` — palette and semantic colors  
- `spacing` — spacing scale  
- `radius` — border radii  
- `typography` — type scale  
- `elevation` — shadows  
- `motion` — transitions / animation  
- `z-index` — stacking layers  
- `breakpoints` — responsive breakpoints  

Import from `@/styles/tokens` when you need token values in JS/TS.

---

## Conventions

1. **Prefer app wrappers over raw primitives** — e.g. `AppButton`, `AppInput`, `AppSelect`, `AppDatePicker`, `AppDialog` instead of bare shadcn controls.
2. **Forms** — use `FieldWrapper`-based fields so labels, errors, and helper text stay consistent.
3. **Pages** — compose layout with `AppLayout` → `PageContainer` → `PageHeader` → content.
4. **Example pages** under `src/pages` (dashboard, auth, students) show how the kit is meant to be used; replace or extend them for your product.

## License

Private boilerplate — use and adapt for your projects.
