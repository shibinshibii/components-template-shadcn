export * from './ListWidgets';
export * from './LayoutWidgets';
export * from './DomainWidgets';
// StatWidget can be directly imported from our cards system as StatCard, but for semantic completeness:
export { StatCard as StatWidget, ChartCard as ChartWidget } from '@/components/ui/card';
