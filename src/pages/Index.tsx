import { Link } from "react-router-dom";
import { Brain, Shield, Users, ArrowRight, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import asiLogo from "@/assets/asi-logo.png";
import ButtonDark from "@/components/ButtonDarkMode"

const Index = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-darkBg">
      {/* Navigation */}
      <nav className="border-b border-border bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={asiLogo} alt="ASI Alliance" className="h-8" />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">Features</Button>
            <Button variant="ghost" size="sm">About</Button>
            <Button variant="ghost" size="sm">
              <ButtonDark />
            </Button>
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
      <section className="relative isolate overflow-hidden py-20 md:py-32">
        <div aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#30b167] to-[#4dba78] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
          />
        </div>

        {/* Contenido del hero */}
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <span className="text-gray-900 dark:text-white text-sm font-medium text-foreground">
                Powered by ASI Alliance
              </span>
            </div>

            <h1 className="text-gray-900 dark:text-white text-5xl md:text-7xl font-semibold mb-6 text-foreground tracking-tight">
              Decentralized AI for<br />Professional Networks
            </h1>

            <p className="text-gray-500 dark:text-gray-400 text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Connect with Web3 professionals through AI-powered matching, verified credentials,
              and decentralized reputation on the blockchain.
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/ai-chat">
                <Button
                  variant="hero"
                  size="lg"
                  className="gap-2 hover:transition-transform transition-shadow ease-in-out duration-300 hover:delay-150 hover:-translate-y-1 hover:scale-[1.05] hover:shadow-lg"
                >
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/dashboard" className="inline-block">
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 hover:transition-transform transition-shadow ease-in-out duration-300 hover:delay-150 hover:-translate-y-1 hover:scale-[1.05] hover:shadow-lg"
                >
                  View Dashboard
                </Button>
              </Link>
            </div>

            <div className="py-5 mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div>
                <p className="text-gray-500 dark:text-white sm:text-xl md:text-xl lg:text-5xl font-semibold">
                  10K+
                </p>
                <p className="text-gray-500 dark:text-white text-sm text-muted-foreground mt-1">
                  Professionals
                </p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-white sm:text-xl md:text-xl lg:text-5xl font-semibold">
                  500+
                </p>
                <p className="text-gray-500 dark:text-white text-sm text-muted-foreground mt-1">
                  Active Projects
                </p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-white sm:text-xl md:text-xl lg:text-5xl font-semibold">
                  50+
                </p>
                <p className="text-gray-500 dark:text-white text-sm text-muted-foreground mt-1">
                  DAOs
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Blob inferior */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 bg-gradient-to-tr from-[#30b167] to-[#4dba78] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72rem]"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="relative isolate overflow-hidden py-24 bg-[#a6eeb7] dark:bg-gradient-to-b dark:from-[#005B41] dark:to-[#003F2E] transition-colors duration-500">
        <div aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#30b167] to-[#4dba78] opacity-25 dark:opacity-40 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-gray-800 dark:text-white text-5xl font-semibold mb-4">
              Built for Web3
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              Next-generation professional networking powered by decentralized AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
              <Card
                key={i}
                className="p-8 border bg-white/80 dark:bg-[#013D2C]/70 backdrop-blur-sm hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
              >
                <div className="h-12 w-12 rounded-lg bg-[#30b167]/20 dark:bg-[#4dba78]/30 flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-[#30b167] dark:text-[#4dba78]" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        <div aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 bg-gradient-to-tr from-[#30b167] to-[#4dba78] opacity-25 dark:opacity-40 sm:left-[calc(50%+36rem)] sm:w-[72rem]"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative isolate overflow-hidden py-24 bg-white dark:bg-gradient-to-b dark:from-[#5b9b77] dark:to-[#005B41] transition-colors duration-500">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#30b167] to-[#4dba78] opacity-30 dark:opacity-40 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <Card className="p-12 text-center max-w-3xl mx-auto border bg-white dark:bg-[#005B41]/60 backdrop-blur-sm shadow-md transition-all duration-300 hover:shadow-xl">
            <h2 className="text-4xl font-semibold mb-4 text-gray-900 dark:text-white">
              Ready to Get Started?
            </h2>
            <p className="text-gray-600 dark:text-gray-200 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Join the decentralized professional network powered by ASI Alliance.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/ai-chat">
                <Button
                  variant="hero"
                  size="lg"
                  className="gap-2 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-[1.05] hover:shadow-lg bg-[#30b167] hover:bg-[#4dba78] text-white"
                >
                  <Wallet className="h-5 w-5" />
                  Connect Wallet
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 bg-gradient-to-tr from-[#30b167] to-[#4dba78] opacity-30 dark:opacity-40 sm:left-[calc(50%+36rem)] sm:w-[72rem]"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-[#f9fdfb] dark:bg-gradient-to-b dark:from-[#005B41] dark:to-[#003F2E] transition-colors duration-500">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <img src={asiLogo} alt="ASI Alliance" className="h-8 mb-4" />
              <p className="text-gray-600 dark:text-gray-200 text-sm">
                Decentralized AI professional network
              </p>
            </div>
            <div>
              <h4 className="text-gray-800 dark:text-white font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li><a href="#" className="hover:text-[#30b167] transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-[#30b167] transition-colors">AI Agents</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-800 dark:text-white font-semibold mb-3">Technology</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>
                  <a
                    href="https://superintelligence.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#30b167] transition-colors"
                  >
                    ASI Alliance
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-800 dark:text-white font-semibold mb-3">Team</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">ETHGlobal 2025</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs">
                María • Juan José • Cristóbal • Juan
              </p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-gray-600 dark:text-gray-300">
            <p>
              Built for <span className="text-[#30b167] font-medium">ETHGlobal 2025</span> • Powered by{" "}
              <span className="text-[#30b167] font-medium">ASI Alliance</span>
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Index;
