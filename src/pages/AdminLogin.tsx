import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const passwordSchema = z.string()
  .min(12, "Password must be at least 12 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character");

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isForgotPassword) {
      // Handle password reset
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      });

      if (error) {
        toast({
          title: "Reset Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Check Your Email",
          description: "Password reset link has been sent to your email address.",
        });
        setIsForgotPassword(false);
      }
      return;
    }
    
    if (isSignUp) {
      // Validate password strength
      const passwordValidation = passwordSchema.safeParse(password);
      if (!passwordValidation.success) {
        toast({
          title: "Weak Password",
          description: passwordValidation.error.errors[0].message,
          variant: "destructive",
        });
        return;
      }

      // Handle signup
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard-secure-2025`
        }
      });

      if (error) {
        toast({
          title: "Signup Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Account Created!",
          description: "Please contact the administrator to grant you admin access.",
        });
        setIsSignUp(false);
      }
    } else {
      // Handle login
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Login Successful",
          description: "Welcome to the Admin Dashboard",
        });
        navigate("/admin/dashboard");
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Login | WizKidsHub</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen bg-secondary/5 flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-heading">
            {isForgotPassword ? "Reset Password" : isSignUp ? "Admin Signup" : "Admin Login"}
          </CardTitle>
          <CardDescription>
            {isForgotPassword 
              ? "Enter your email to receive a password reset link"
              : isSignUp 
                ? "Create an admin account to get started" 
                : "Enter your credentials to access the admin dashboard"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter admin email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
                required
              />
            </div>
            {!isForgotPassword && (
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12"
                  required
                />
              </div>
            )}
            <Button type="submit" className="w-full h-12">
              {isForgotPassword ? "Send Reset Link" : isSignUp ? "Sign Up" : "Login"}
            </Button>
          </form>
          <div className="mt-4 text-center space-y-2">
            {!isForgotPassword && (
              <Button
                type="button"
                variant="link"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm block w-full"
              >
                {isSignUp 
                  ? "Already have an account? Login" 
                  : "Don't have an account? Sign Up"}
              </Button>
            )}
            <Button
              type="button"
              variant="link"
              onClick={() => {
                setIsForgotPassword(!isForgotPassword);
                setIsSignUp(false);
              }}
              className="text-sm block w-full"
            >
              {isForgotPassword 
                ? "Back to Login" 
                : "Forgot Password?"}
            </Button>
          </div>
        </CardContent>
      </Card>
      </div>
    </>
  );
};

export default AdminLogin;
