import React from 'react';
import {
  PageTitle,
  PageDescription,
  SectionTitle,
  CardTitle,
  WidgetTitle,
  Text,
  Muted,
  Caption,
  Label,
  Tag,
  Number,
} from './index';

export default function TypographyExample() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-12">
      {/* Header Section */}
      <div>
        <PageTitle>Dashboard Overview</PageTitle>
        <PageDescription className="mt-2">
          Monitor your key metrics and active tasks for this week.
        </PageDescription>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-6">
        <SectionTitle>Key Metrics</SectionTitle>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-6 border rounded-lg bg-card space-y-4">
            <WidgetTitle uppercase className="text-muted-foreground">Total Revenue</WidgetTitle>
            <div className="flex items-baseline gap-2">
              <Number>$124,500</Number>
              <Tag className="text-success">+12.5%</Tag>
            </div>
            <Caption>Updated 2 hours ago</Caption>
          </div>

          {/* Card 2 */}
          <div className="p-6 border rounded-lg bg-card space-y-4">
            <CardTitle>Recent Signups</CardTitle>
            <Number>1,234</Number>
            <Muted>Compared to 1,142 last week</Muted>
          </div>
        </div>
      </div>

      {/* Forms & Body Text */}
      <div className="space-y-6">
        <SectionTitle>Settings</SectionTitle>
        
        <div className="p-6 border rounded-lg bg-surface space-y-4">
          <div className="space-y-1.5">
            <Label uppercase htmlFor="email">Email Address</Label>
            <input 
              id="email" 
              className="w-full p-2 border rounded bg-input text-foreground text-sm" 
              placeholder="you@example.com" 
            />
          </div>
          
          <Text>
            By updating your email, all system notifications will be routed to your new address immediately.
          </Text>
        </div>
      </div>
    </div>
  );
}
