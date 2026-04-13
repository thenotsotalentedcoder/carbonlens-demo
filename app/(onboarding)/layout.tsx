import { Leaf } from "@phosphor-icons/react/dist/ssr";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/60 bg-background">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-primary/10">
              <Leaf className="h-5 w-5 text-primary" />
            </div>
            <span className="font-serif font-bold text-lg">CarbonLens</span>
          </div>
          <span className="text-sm text-muted-foreground">Setup Wizard</span>
        </div>
      </header>
      
      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}
