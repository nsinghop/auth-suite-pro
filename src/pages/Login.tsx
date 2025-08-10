import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { demoStorage } from "@/lib/demoStorage";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().default(false),
});

type FormValues = z.infer<typeof schema>;

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { remember: true } });

  useEffect(() => {
    document.title = "Admin Portal – Sign In";
  }, []);

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    try {
      await login(values.email, values.password, values.remember);
      toast({ title: "Welcome back", description: "You have signed in successfully." });
      const next = demoStorage.hasProducts() ? "/" : "/onboarding";
      navigate(next);
    } catch (e: any) {
      toast({ title: "Sign-in failed", description: e?.message || "Invalid credentials", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md card-elevated">
        <CardHeader>
          <CardTitle className="text-2xl text-heading">Sign in to Admin Portal</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" aria-label="Login form">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@company.com" aria-invalid={!!errors.email} {...register("email")} />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" aria-invalid={!!errors.password} {...register("password")} />
              {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
            </div>
            <div className="flex items-center justify-between">
              <Controller
                name="remember"
                control={control}
                render={({ field: { value, onChange, ref } }) => (
                  <div className="flex items-center gap-2">
                    <Checkbox id="remember" checked={value} onCheckedChange={(v) => onChange(Boolean(v))} ref={ref as any} />
                    <Label htmlFor="remember" className="text-sm text-muted-foreground">Remember me</Label>
                  </div>
                )}
              />
              <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
            </div>
            <Button type="submit" className="w-full hover-scale" disabled={submitting}>
              {submitting ? (
                <span className="inline-flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Signing in…</span>
              ) : (
                "Sign in"
              )}
            </Button>
            <p className="text-xs text-muted-foreground text-center">Demo mode: use any email and password to sign in.</p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
