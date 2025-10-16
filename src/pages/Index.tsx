import { Link } from "react-router-dom";
import { Brain, Shield, Users, ArrowRight, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import asiLogo from "@/assets/asi-logo.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-border bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={asiLogo} alt="ASI Alliance" className="h-8" />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">Features</Button>
            <Button variant="ghost" size="sm">About</Button>
            <Link to="/ai-chat">
              <Button variant="default" size="sm" className="gap-2">
                <Wallet className="h-4 w-4" />
                Connect Wallet
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <span className="text-sm font-medium text-foreground">Powered by ASI Alliance</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-semibold mb-6 text-foreground tracking-tight">
              Decentralized AI for<br />Professional Networks
            </h1>

            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Connect with Web3 professionals through AI-powered matching, verified credentials, 
              and decentralized reputation on the blockchain.
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/ai-chat">
                <Button variant="hero" size="lg" className="gap-2">
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" size="lg" className="gap-2">
                  View Dashboard
                </Button>
              </Link>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div>
                <p className="text-3xl font-semibold text-foreground">10K+</p>
                <p className="text-sm text-muted-foreground mt-1">Professionals</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-foreground">500+</p>
                <p className="text-sm text-muted-foreground mt-1">Active Projects</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-foreground">50+</p>
                <p className="text-sm text-muted-foreground mt-1">DAOs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold mb-4 text-foreground">Built for Web3</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Next-generation professional networking powered by decentralized AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Brain,
                title: "AI Career Assistant",
                description: "ASI Alliance agents analyze your profile and match you with opportunities.",
              },
              {
                icon: Shield,
                title: "On-Chain Verification",
                description: "All credentials verified on blockchain with complete transparency.",
              },
              {
                icon: Users,
                title: "Decentralized Network",
                description: "Connect with DAOs and Web3 projects in a trustless environment.",
              },
            ].map((feature, i) => (
              <Card key={i} className="p-8 border bg-card hover:shadow-lg transition-all duration-200">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <Card className="p-12 text-center max-w-3xl mx-auto border bg-card">
            <h2 className="text-4xl font-semibold mb-4 text-foreground">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Join the decentralized professional network powered by ASI Alliance.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/ai-chat">
                <Button variant="hero" size="lg" className="gap-2">
                  <Wallet className="h-5 w-5" />
                  Connect Wallet
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-secondary/20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <img src={asiLogo} alt="ASI Alliance" className="h-8 mb-4" />
              <p className="text-sm text-muted-foreground">
                Decentralized AI professional network
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-foreground">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">AI Agents</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-foreground">Technology</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="https://superintelligence.io/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">ASI Alliance</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-foreground">Team</h4>
              <p className="text-sm text-muted-foreground mb-2">ETHGlobal 2025</p>
              <p className="text-xs text-muted-foreground">
                María • Juan José • Cristóbal • Juan
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>Built for ETHGlobal 2025 • Powered by ASI Alliance</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
