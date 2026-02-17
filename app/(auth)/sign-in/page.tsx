"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import FloatingMedicines from "@/components/FloatingMedicines";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function SignInPage() {
  const formRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    gsap.from(formRef.current, {
      x: 120,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  const handleLogin = async () => {
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) window.location.href = "/dashboard";
    else alert("Login failed");
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT — Animation */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-cyan-500 to-blue-600">
        <FloatingMedicines />
      </div>

      {/* RIGHT — Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-background">

        <Card ref={formRef} className="w-[380px] shadow-xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              Welcome Back
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              onClick={handleLogin}
              className="w-full"
            >
              Sign In
            </Button>

            <p className="text-sm text-center">
              Don’t have an account?{" "}
              <a href="/sign-up" className="underline">
                Sign up
              </a>
            </p>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
