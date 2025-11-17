import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, MapPin, FileText, BarChart3, Sun, Zap, TrendingUp, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sun className="h-12 w-12 text-primary animate-pulse" />
              <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Unite Solar
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              India's Smartest Solar Lead Identification & Proposal Engine
            </p>
            <p className="text-lg text-muted-foreground">
              Satellite-powered roof analysis • Automated proposals • Lead generation
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="shadow-solar">
                <Zap className="mr-2 h-5 w-5" />
                Get Started
              </Button>
              <Button size="lg" variant="outline">
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Powerful Solar Analytics</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools to identify, analyze, and convert solar leads with precision
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-2 hover:border-primary transition-all hover:shadow-solar">
            <CardHeader>
              <MapPin className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Satellite Analysis</CardTitle>
              <CardDescription>
                AI-powered roof detection and solar potential mapping
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary transition-all hover:shadow-solar">
            <CardHeader>
              <Building2 className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Lead Generation</CardTitle>
              <CardDescription>
                Scan industries, hospitals, colleges, and commercial buildings
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary transition-all hover:shadow-solar">
            <CardHeader>
              <FileText className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Auto Proposals</CardTitle>
              <CardDescription>
                Generate technical and financial proposals instantly
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary transition-all hover:shadow-solar">
            <CardHeader>
              <BarChart3 className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Project Dashboard</CardTitle>
              <CardDescription>
                Multi-role tracking for sales, engineering, and admin
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Unite Solar?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-2">
                <TrendingUp className="h-12 w-12 text-primary mx-auto" />
                <h3 className="text-xl font-semibold">Faster Sales</h3>
                <p className="text-muted-foreground">
                  Reduce proposal time from days to minutes
                </p>
              </div>
              <div className="text-center space-y-2">
                <Shield className="h-12 w-12 text-primary mx-auto" />
                <h3 className="text-xl font-semibold">Accurate Analysis</h3>
                <p className="text-muted-foreground">
                  Satellite-verified solar potential calculations
                </p>
              </div>
              <div className="text-center space-y-2">
                <Zap className="h-12 w-12 text-primary mx-auto" />
                <h3 className="text-xl font-semibold">All-in-One Platform</h3>
                <p className="text-muted-foreground">
                  From lead to installation in one system
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="border-2 border-primary bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardHeader className="text-center space-y-4 pb-8">
            <CardTitle className="text-3xl">Ready to Transform Your Solar Business?</CardTitle>
            <CardDescription className="text-lg">
              Join leading solar companies using Unite Solar to accelerate their growth
            </CardDescription>
            <div className="flex gap-4 justify-center pt-4">
              <Link to="/auth">
                <Button size="lg" className="shadow-solar">
                  Start Free Trial
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                Schedule Demo
              </Button>
            </div>
          </CardHeader>
        </Card>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
