import { Link } from "react-router-dom";
import { Brain, Shield, Users, ArrowRight, Wallet, BarChart3, Network, Database, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import asiLogo from "@/assets/asi-logo.png";
import { motion } from "framer-motion";

const Index = () => {
  const asiFeatures = [
    {
      icon: Network,
      title: "Red de Agentes ASI",
      description: "Sistema descentralizado de agentes especializados",
      link: "/agents"
    },
    {
      icon: Brain,
      title: "MeTTa Knowledge Graph",
      description: "Grafo de conocimiento dinámico y visual",
      link: "/knowledge"
    },
    {
      icon: Database,
      title: "IPFS Publications",
      description: "Almacenamiento descentralizado inmutable",
      link: "/ipfs"
    },
    {
      icon: Book,
      title: "Documentación",
      description: "Arquitectura y tech stack completo",
      link: "/docs"
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative isolate overflow-hidden py-20 md:py-32">
        <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#96EA8C] to-[#4dba78] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72rem]" />
        </div>

        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#96EA8C]/10 border border-[#96EA8C]/20 mb-8">
              <span className="text-sm font-medium">Powered by ASI Alliance</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-semibold mb-6 tracking-tight">
              Decentralized AI for<br />Professional Networks
            </h1>

            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Connect with Web3 professionals through AI-powered matching, verified credentials, and decentralized reputation.
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/ai-chat">
                <Button variant="hero" size="lg" className="gap-2 bg-[#96EA8C] hover:bg-[#96EA8C]/90 text-black">
                  Get Started <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/agents">
                <Button variant="outline" size="lg" className="gap-2">
                  <Network className="h-5 w-5" />
                  Explore Agents
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ASI Alliance Integration */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powered by ASI Alliance</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Integración completa del ecosistema de inteligencia artificial descentralizada
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {asiFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 }}>
                  <Link to={feature.link}>
                    <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:border-[#96EA8C]/50 cursor-pointer group">
                      <Icon className="h-10 w-10 text-[#96EA8C] mb-4 group-hover:scale-110 transition-transform" />
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold mb-4">Built for Web3</h2>
            <p className="text-lg max-w-2xl mx-auto text-muted-foreground">
              Next-generation professional networking
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Brain, title: "AI Career Assistant", description: "ASI Alliance agents analyze your profile" },
              { icon: Shield, title: "On-Chain Verification", description: "All credentials verified on blockchain" },
              { icon: Users, title: "Decentralized Network", description: "Connect with DAOs and Web3 projects" }
            ].map((f, i) => (
              <Card key={i} className="p-8 hover:shadow-xl transition-all">
                <f.icon className="h-12 w-12 text-[#96EA8C] mb-4" />
                <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
                <p className="text-muted-foreground">{f.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t py-12">
        <div className="container mx-auto px-6 text-center">
          <img src={asiLogo} alt="ASI Alliance" className="h-8 mb-4 mx-auto" />
          <p className="text-sm text-muted-foreground">
            Built for <span className="text-[#96EA8C] font-medium">ETHGlobal 2025</span> • Powered by ASI Alliance
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
