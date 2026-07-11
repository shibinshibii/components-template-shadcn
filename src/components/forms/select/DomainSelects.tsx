import { AsyncSelect, type AsyncSelectProps } from './AsyncSelect';

// Mock API Call for Domain Selects
const mockFetch = async (query: string, page: number, domain: string) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  const items = Array.from({ length: 20 }).map((_, i) => ({
    label: `${domain} ${(page - 1) * 20 + i + 1} ${query ? `(Query: ${query})` : ''}`,
    value: `${domain}-${(page - 1) * 20 + i + 1}`,
  }));
  return { options: items, hasMore: page < 5 }; // stops infinite scrolling at page 5
};

export function UserSelect(props: Partial<AsyncSelectProps>) {
  return <AsyncSelect placeholder="Select User..." fetchOptions={(q, p) => mockFetch(q, p, 'User')} {...props} />;
}

export function RoleSelect(props: Partial<AsyncSelectProps>) {
  return <AsyncSelect placeholder="Select Role..." fetchOptions={(q, p) => mockFetch(q, p, 'Role')} {...props} />;
}

export function CountrySelect(props: Partial<AsyncSelectProps>) {
  return <AsyncSelect placeholder="Select Country..." fetchOptions={(q, p) => mockFetch(q, p, 'Country')} {...props} />;
}

export function StateSelect(props: Partial<AsyncSelectProps>) {
  return <AsyncSelect placeholder="Select State..." fetchOptions={(q, p) => mockFetch(q, p, 'State')} {...props} />;
}

export function CitySelect(props: Partial<AsyncSelectProps>) {
  return <AsyncSelect placeholder="Select City..." fetchOptions={(q, p) => mockFetch(q, p, 'City')} {...props} />;
}

export function AcademicYearSelect(props: Partial<AsyncSelectProps>) {
  return <AsyncSelect placeholder="Select Academic Year..." fetchOptions={(q, p) => mockFetch(q, p, '2024-2025')} {...props} />;
}

export function SessionSelect(props: Partial<AsyncSelectProps>) {
  return <AsyncSelect placeholder="Select Session..." fetchOptions={(q, p) => mockFetch(q, p, 'Session')} {...props} />;
}

export function SchoolSelect(props: Partial<AsyncSelectProps>) {
  return <AsyncSelect placeholder="Select School..." fetchOptions={(q, p) => mockFetch(q, p, 'School')} {...props} />;
}

export function TeacherSelect(props: Partial<AsyncSelectProps>) {
  return <AsyncSelect placeholder="Select Teacher..." fetchOptions={(q, p) => mockFetch(q, p, 'Teacher')} {...props} />;
}

export function StudentSelect(props: Partial<AsyncSelectProps>) {
  return <AsyncSelect placeholder="Select Student..." fetchOptions={(q, p) => mockFetch(q, p, 'Student')} {...props} />;
}
