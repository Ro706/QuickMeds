"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import FloatingMedicines from "@/components/FloatingMedicines";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function SignUpPage() {
  const formRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    gsap.from(formRef.current, {
      x: -120,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  const handleSignup = async () => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) window.location.href = "/signin";
    else alert("Signup failed");
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT — Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-background">

        <Card ref={formRef} className="w-[380px] shadow-xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              Create Account
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">

            <div>
              <Label>Name</Label>
              <Input
                placeholder="Your name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

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
              onClick={handleSignup}
              className="w-full"
            >
              Sign Up
            </Button>

            <p className="text-sm text-center">
              Already have an account?{" "}
              <a href="/sign-in" className="underline">
                Sign in
              </a>
            </p>

          </CardContent>
        </Card>
      </div>

      {/* RIGHT — Animation */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-teal-500 to-green-600">
        <FloatingMedicines />
      </div>
    </div>
  );
}
