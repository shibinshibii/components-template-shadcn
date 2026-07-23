import { AppLayout } from '@/components/layout/AppLayout';
import { PageTitle, Muted, SectionTitle } from '@/components/typography';
import { FeatureCard } from '@/components/ui/card/FeatureCard';
import { Layers, Puzzle, Paintbrush, ArrowRight, Zap } from 'lucide-react';

function Github(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}
import { AppButton } from '@/components/ui/app-button';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden flex flex-col">
        {/* Background Gradients for premium look */}
        <div className="absolute top-0 left-1/2 w-full max-w-7xl -translate-x-1/2 h-[500px] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent pointer-events-none -z-10" />
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/20 blur-[100px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-[20%] left-[-5%] w-72 h-72 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none -z-10" />

        <div className="p-6 md:p-8 lg:p-12 w-full max-w-6xl mx-auto space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700 flex-1">
          
          {/* Hero Section */}
          <div className="flex flex-col items-center text-center gap-6 pt-10 md:pt-16">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary shadow-sm backdrop-blur-md">
              <Zap className="w-4 h-4 mr-2 text-primary" fill="currentColor" />
              Frontend Boilerplate is ready
            </div>
            
            <div className="space-y-4 max-w-3xl">
              <PageTitle className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
                Build stunning products with a <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">ready-made UI kit</span>.
              </PageTitle>
              <Muted className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed text-muted-foreground/90 mt-4">
                This is your ultimate starting point. A React + TypeScript + Vite starter bundled with layout shells, forms, tables, and design tokens. Build your app on top of the shared components under <code className="bg-muted px-1.5 py-0.5 rounded text-sm text-foreground">src/components</code>.
              </Muted>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
               <Link to="/showcase/inputs">
                 <AppButton 
                    size="lg" 
                    className="rounded-full shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all duration-300"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                 >
                    Explore UI Kit
                 </AppButton>
               </Link>
               <a href="https://github.com/your-username/components-template-shadcn" target="_blank" rel="noreferrer">
                 <AppButton 
                    variant="outline" 
                    size="lg" 
                    className="rounded-full bg-background/50 backdrop-blur-sm border-muted-foreground/20 hover:bg-muted/50"
                    leftIcon={<Github className="w-4 h-4" />}
                 >
                    View Repository
                 </AppButton>
               </a>
            </div>
          </div>

          {/* Workflow Section */}
          <div className="space-y-10 relative mt-20">
            <div className="flex flex-col items-center text-center space-y-3">
              <SectionTitle className="text-2xl sm:text-3xl">How to use this boilerplate</SectionTitle>
              <Muted className="text-base max-w-lg mx-auto">Everything you need to rapidly develop your next great application.</Muted>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <FeatureCard 
                title="1. Explore & Test" 
                description="Use the sidebar showcase to interact with forms, data tables, dialogs, and layout elements to understand what's available."
                icon={Layers}
                className="bg-background/60 backdrop-blur-md border border-muted-foreground/10 hover:border-primary/30 transition-colors shadow-sm"
              />
              <FeatureCard 
                title="2. Import & Build" 
                description="Import standard components from barrel files (e.g. @/components/forms) to quickly construct your product's unique pages."
                icon={Puzzle}
                className="bg-background/60 backdrop-blur-md border border-muted-foreground/10 hover:border-primary/30 transition-colors shadow-sm"
              />
              <FeatureCard 
                title="3. Customize Tokens" 
                description="Easily modify the design tokens in src/styles/tokens to universally adapt colors, spacing, and typography to your brand."
                icon={Paintbrush}
                className="bg-background/60 backdrop-blur-md border border-muted-foreground/10 hover:border-primary/30 transition-colors shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
