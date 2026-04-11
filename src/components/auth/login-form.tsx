"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { loginAction } from "@/core-platform/actions/auth.actions";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginValues) {
    setLoading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    const result = await loginAction(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/garage");
      router.refresh();
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-[400px] border-border/50 bg-card/50 backdrop-blur-xl shadow-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">Login</CardTitle>
          <CardDescription>
            Enter your email and password to access your garage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="m@example.com" 
                className="bg-background/50"
                {...register("email")}
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <Input 
                id="password" 
                type="password" 
                className="bg-background/50"
                {...register("password")}
              />
              {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
            </div>
            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
            <Button type="submit" className="w-full font-semibold" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          {process.env.NODE_ENV === "development" && (
            <div className="w-full pt-2 border-t border-border/50">
                <Button 
                  variant="outline" 
                  className="w-full border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary gap-2"
                  onClick={() => router.push("/api/dev-login")}
                >
                  <Sparkles className="h-4 w-4" /> ENTRAR COMO JOÃO (DEV)
                </Button>
            </div>
          )}
          <div className="text-sm text-muted-foreground text-center">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="text-primary hover:underline font-medium">
              Create an account
            </a>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
