import { Link } from "react-router-dom";
import { Sparkles, Brain, Shield, Zap, Award, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img 
            src={heroBg} 
            alt="Web3 Network Background" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background"></div>
        </div>

        {/* Navigation */}
        <nav className="relative glass border-b border-white/10">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-accent" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Web3 Network
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">Features</Button>
              <Button variant="ghost" size="sm">About</Button>
              <Button variant="accent" size="sm">Connect Wallet</Button>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/20 mb-6 animate-fade-in">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm font-semibold">Powered by ASI Alliance & Hedera</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
              The Future of Web3 Professional Networking
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Connect, collaborate, and grow your career in the decentralized ecosystem. 
              AI-powered matching, on-chain credentials, and verified reputation—all in one platform.
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/dashboard">
                <Button variant="hero" size="lg" className="gap-2">
                  Launch Dashboard
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/ai-chat">
                <Button variant="glass" size="lg" className="gap-2">
                  <Brain className="h-5 w-5" />
                  Try AI Assistant
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex justify-center gap-8 text-sm">
              <div>
                <p className="text-2xl font-bold text-accent">10,000+</p>
                <p className="text-muted-foreground">Web3 Professionals</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">500+</p>
                <p className="text-muted-foreground">Active Projects</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent">50+</p>
                <p className="text-muted-foreground">DAOs Connected</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Built for the Web3 Era</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Experience the next generation of professional networking with AI intelligence 
              and blockchain verification
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                title: "AI Career Assistant",
                description: "Personalized AI agents powered by ASI Alliance help you find opportunities, build CVs, and strategize your career path.",
                color: "accent"
              },
              {
                icon: Shield,
                title: "On-Chain Verification",
                description: "All credentials, achievements, and reputation verified on Hedera and Base blockchain with full Blockscout transparency.",
                color: "primary"
              },
              {
                icon: Zap,
                title: "Instant Matching",
                description: "Smart algorithms match you with relevant opportunities, projects, and collaborators in real-time.",
                color: "accent"
              },
              {
                icon: Award,
                title: "Soulbound Credentials",
                description: "Earn verifiable NFTs and POAPs for your contributions, creating an immutable professional record.",
                color: "primary"
              },
              {
                icon: Users,
                title: "DAO Integration",
                description: "Seamlessly connect with DAOs, contribute to projects, and showcase your decentralized work experience.",
                color: "accent"
              },
              {
                icon: Sparkles,
                title: "Auto CV Builder",
                description: "AI generates stunning Web3 portfolios from your on-chain data, stored on IPFS for permanent access.",
                color: "primary"
              },
            ].map((feature, i) => (
              <Card key={i} className="glass border-white/10 p-6 hover:scale-105 transition-all duration-300">
                <div className={`h-12 w-12 rounded-lg bg-${feature.color}/20 flex items-center justify-center mb-4`}>
                  <feature.icon className={`h-6 w-6 text-${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Personalities Section */}
      <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Meet Your AI Assistants</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose from specialized AI personalities, each designed to help you succeed in Web3
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { emoji: "💼", name: "Recruiter AI", desc: "Find perfect job matches" },
              { emoji: "🧠", name: "Mentor AI", desc: "Career guidance & growth" },
              { emoji: "📊", name: "Strategist AI", desc: "Plan your Web3 journey" },
              { emoji: "⚡", name: "Developer AI", desc: "Technical insights & tips" },
            ].map((ai, i) => (
              <Card key={i} className="glass border-white/10 p-6 text-center hover:glow-accent transition-all duration-300 cursor-pointer">
                <div className="text-6xl mb-4">{ai.emoji}</div>
                <h3 className="text-lg font-bold mb-2">{ai.name}</h3>
                <p className="text-sm text-muted-foreground">{ai.desc}</p>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/ai-chat">
              <Button variant="hero" size="lg">
                Start Chatting with AI
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <Card className="glass border-white/10 p-12 text-center max-w-4xl mx-auto glow-primary">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Transform Your Web3 Career?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of professionals building their future in the decentralized world.
              Connect your wallet and start building your on-chain reputation today.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button variant="hero" size="lg" className="gap-2">
                <Sparkles className="h-5 w-5" />
                Connect Wallet & Start
              </Button>
              <Link to="/cv-builder">
                <Button variant="glass" size="lg">
                  Generate AI CV
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-6 w-6 text-accent" />
                <span className="text-xl font-bold">Web3 Network</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The decentralized professional network for the Web3 era.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">AI Assistants</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Technology</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition-colors">ASI Alliance</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Hedera</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Blockscout</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Team</h4>
              <p className="text-sm text-muted-foreground mb-2">ETHGlobal 2025</p>
              <p className="text-xs text-muted-foreground">
                María • Juan José • Cristóbal • Juan
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-muted-foreground">
            <p>Built for ETHGlobal 2025 • Powered by ASI Alliance, Hedera & Base</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
