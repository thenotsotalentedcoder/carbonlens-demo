"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleNotch, Leaf } from "@phosphor-icons/react";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organisation: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate registration
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Redirect to onboarding
    router.push("/onboarding");
  };

  return (
    <div className="space-y-6">
      {/* Mobile logo */}
      <div className="lg:hidden text-center mb-8">
        <div className="inline-flex items-center gap-2">
          <div className="p-2 rounded bg-primary/10">
            <Leaf className="h-6 w-6 text-primary" />
          </div>
          <span className="text-xl font-serif font-bold">CarbonLens</span>
        </div>
      </div>

      <Card className="border-border/60">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-serif">Create an account</CardTitle>
          <CardDescription>
            Start tracking your institution&apos;s carbon footprint
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Dr. Jane Smith"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Work Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@university.edu"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="organisation">Institution Name</Label>
              <Input
                id="organisation"
                placeholder="University of Example"
                value={formData.organisation}
                onChange={(e) => setFormData(prev => ({ ...prev, organisation: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90"
              disabled={loading}
            >
              {loading ? (
                <>
                  <CircleNotch className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </Button>
          </form>

          <p className="mt-4 text-xs text-muted-foreground text-center">
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link href="/login" className="text-primary hover:text-primary/80 font-medium">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
