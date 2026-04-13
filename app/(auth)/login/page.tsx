"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleNotch, Leaf, BookOpen } from "@phosphor-icons/react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    router.push("/");
  };

  return (
    <div className="space-y-6">
      {/* Mobile logo */}
      <div className="lg:hidden text-center mb-8">
        <div className="inline-flex items-center gap-2">
          <div className="p-2 rounded bg-primary/10">
            <Leaf className="h-6 w-6 text-primary" weight="fill" />
          </div>
          <span className="text-xl font-serif font-bold">CarbonLens</span>
        </div>
      </div>

      <Card className="border-border">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-serif">Welcome back</CardTitle>
          <CardDescription>Sign in to your CarbonLens account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-sm text-primary hover:text-primary/80">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <><CircleNotch className="mr-2 h-4 w-4 animate-spin" /> Signing in...</>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Don&apos;t have an account? </span>
            <Link href="/register" className="text-primary hover:text-primary/80 font-medium">
              Create account
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Methodology link */}
      <div className="text-center">
        <Link
          href="/methodology"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5" />
          View Calculation Methodology — publicly accessible
        </Link>
      </div>

      {/* Demo credentials hint */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          Demo: Use any email/password to explore the platform
        </p>
      </div>
    </div>
  );
}
