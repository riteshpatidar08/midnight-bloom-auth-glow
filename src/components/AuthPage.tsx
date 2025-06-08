
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coffee, Moon, Star, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive"
      });
      return;
    }

    const action = isLogin ? "signed in" : "registered";
    toast({
      title: `Successfully ${action}!`,
      description: `Welcome to Midnight Cafe Bloom, ${formData.name || formData.email}!`,
    });
    
    console.log(`${action} with:`, formData);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-primary/20 to-cafe-gold/20 blur-3xl animate-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-gradient-to-r from-cafe-gold/20 to-primary/20 blur-2xl animate-glow" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Coffee className="w-96 h-96 text-primary/5 animate-float" />
        </div>
      </div>

      {/* Floating decorative icons */}
      <div className="absolute top-20 left-20 animate-float">
        <Star className="w-6 h-6 text-cafe-gold/40" />
      </div>
      <div className="absolute top-32 right-32 animate-float" style={{ animationDelay: "2s" }}>
        <Sparkles className="w-4 h-4 text-primary/40" />
      </div>
      <div className="absolute bottom-32 left-32 animate-float" style={{ animationDelay: "4s" }}>
        <Moon className="w-5 h-5 text-cafe-gold/40" />
      </div>

      <Card className="w-full max-w-md glass border-primary/20 shadow-2xl relative z-10">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="relative">
              <Coffee className="w-10 h-10 text-primary animate-pulse" />
              <Sparkles className="w-4 h-4 text-cafe-gold absolute -top-1 -right-1 animate-bounce" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-cafe-gold bg-clip-text text-transparent">
                Midnight Cafe
              </h1>
              <p className="text-sm text-cafe-gold/80 font-medium">Bloom</p>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            {isLogin ? "Welcome Back" : "Join Our Cafe"}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {isLogin 
              ? "Sign in to your account to continue your coffee journey" 
              : "Create an account to start your midnight cafe experience"
            }
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground font-medium">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required={!isLogin}
                  className="bg-input/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-medium">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="bg-input/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-medium">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="bg-input/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
              />
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-foreground font-medium">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required={!isLogin}
                  className="bg-input/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
                />
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-primary to-cafe-gold hover:from-primary/80 hover:to-cafe-gold/80 text-primary-foreground font-semibold py-3 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={toggleMode}
                className="text-primary hover:text-cafe-gold transition-colors duration-300 font-medium"
              >
                {isLogin 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"
                }
              </button>
            </div>

            {isLogin && (
              <div className="text-center">
                <button
                  type="button"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  Forgot your password?
                </button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
