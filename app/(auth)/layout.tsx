export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12" style={{ backgroundColor: '#0a3d28' }}>
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">CarbonLens</h1>
          <p className="text-sm mt-1" style={{ color: '#86c9a8' }}>Institutional Carbon Intelligence</p>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-4xl font-serif font-bold leading-tight text-balance text-white">
              Accurate carbon footprinting for universities in emerging economies
            </h2>
            <p className="mt-4 text-lg leading-relaxed max-w-lg" style={{ color: '#a8d8be' }}>
              GHG Protocol-compliant emissions tracking with AI-powered insights,
              designed for the unique challenges of Low and Middle Income Country contexts.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
            <div>
              <p className="text-3xl font-serif font-bold text-white">50+</p>
              <p className="text-sm" style={{ color: '#86c9a8' }}>Universities</p>
            </div>
            <div>
              <p className="text-3xl font-serif font-bold text-white">1.2M</p>
              <p className="text-sm" style={{ color: '#86c9a8' }}>tCO2e Tracked</p>
            </div>
            <div>
              <p className="text-3xl font-serif font-bold text-white">15%</p>
              <p className="text-sm" style={{ color: '#86c9a8' }}>Avg. Reduction</p>
            </div>
          </div>
        </div>

        <p className="text-xs" style={{ color: '#6aab8a' }}>
          Built on the GHG Protocol Corporate Standard with IPCC AR6 emission factors
        </p>
      </div>

      {/* Right side - Auth forms */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
