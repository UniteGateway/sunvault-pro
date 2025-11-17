import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, MapPin, FileText, BarChart3, Sun, Zap, TrendingUp, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import heroImage from "@/assets/hero-banner.jpg";
import satelliteThumb from "@/assets/satellite-thumb.jpg";
import proposalThumb from "@/assets/proposal-thumb.jpg";
import leadsThumb from "@/assets/leads-thumb.jpg";
import trackingThumb from "@/assets/tracking-thumb.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[600px] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl space-y-8">
            <div className="flex items-center gap-3 mb-4">
              <Sun className="h-16 w-16 text-primary animate-pulse" />
              <h1 className="text-7xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Unite Solar
              </h1>
            </div>
            <p className="text-2xl text-foreground font-semibold">
              India's Smartest Solar Lead Identification & Proposal Engine
            </p>
            <p className="text-xl text-muted-foreground">
              Satellite-powered roof analysis • Automated proposals • Lead generation
            </p>
            <div className="flex gap-4">
              <Link to="/auth">
                <Button size="lg" className="shadow-solar">
                  <Zap className="mr-2 h-5 w-5" />
                  Get Started
                </Button>
              </Link>
              <Link to="/satellite">
                <Button size="lg" variant="outline">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features with Thumbnails */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Complete Solar Solution Platform</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need from lead discovery to project completion
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Link to="/satellite">
            <Card className="border-2 hover:border-primary transition-all hover:shadow-solar overflow-hidden group cursor-pointer">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={satelliteThumb} 
                  alt="Satellite Analysis" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="h-8 w-8 text-primary" />
                  <CardTitle className="text-2xl">Satellite Analysis</CardTitle>
                </div>
                <CardDescription className="text-base">
                  AI-powered roof detection with precise solar potential mapping using satellite imagery
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/proposals">
            <Card className="border-2 hover:border-primary transition-all hover:shadow-solar overflow-hidden group cursor-pointer">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={proposalThumb} 
                  alt="Proposals" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="h-8 w-8 text-primary" />
                  <CardTitle className="text-2xl">Auto Proposals</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Generate professional technical and financial proposals with detailed ROI analysis
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/leads">
            <Card className="border-2 hover:border-primary transition-all hover:shadow-solar overflow-hidden group cursor-pointer">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={leadsThumb} 
                  alt="Lead Generation" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Building2 className="h-8 w-8 text-primary" />
                  <CardTitle className="text-2xl">Lead Generation</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Discover high-potential commercial leads across industries, hospitals, and institutions
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/project-status">
            <Card className="border-2 hover:border-primary transition-all hover:shadow-solar overflow-hidden group cursor-pointer">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={trackingThumb} 
                  alt="Project Tracking" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <BarChart3 className="h-8 w-8 text-primary" />
                  <CardTitle className="text-2xl">Project Tracking</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Multi-role dashboard for sales, engineering, and admin with real-time status updates
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
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
