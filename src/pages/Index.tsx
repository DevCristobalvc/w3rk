import { Link, useNavigate } from "react-router-dom";
import { Brain, Shield, Users, ArrowRight, Wallet, BarChart3, Network, Database, Book, MessageCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import asiLogo from "@/assets/asi-logo.png";
import { motion } from "framer-motion";
import { useWallet } from "@/hooks/useWallet";
import { useState } from "react";

const Index = () => {
  const navigate = useNavigate();
  const { connectWallet, isConnected, isConnecting, walletName, getShortAddress, isWalletAvailable } = useWallet();
  const [showWalletOptions, setShowWalletOptions] = useState(false);

  const handleConnect = async () => {
    if (!isWalletAvailable) {
      setShowWalletOptions(true);
      return;
    }
    
    const connected = await connectWallet();
    if (connected) {
      navigate('/ai-chat');
    }
  };

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Networking",
      description: "Advanced AI agents help you connect with the right professionals and opportunities in Web3",
      color: "blue"
    },
    {
      icon: MessageCircle,
      title: "Smart Conversations",
      description: "Chat with AI assistants that understand your career goals and build your professional profile",
      color: "green"
    },
    {
      icon: Users,
      title: "Professional Community",
      description: "Join a decentralized network of verified Web3 professionals and industry leaders",
      color: "purple"
    },
    {
      icon: FileText,
      title: "Dynamic CV Builder",
      description: "Your conversations automatically build and update your professional CV with latest skills",
      color: "orange"
    }
  ];

  const techFeatures = [
    {
      icon: Network,
      title: "ASI Agent Network",
      description: "Powered by ASI Alliance multi-agent system",
      link: "/agents"
    },
    {
      icon: Database,
      title: "MeTTa Knowledge Graphs",
      description: "Dynamic knowledge representation for careers",
      link: "/knowledge"
    },
    {
      icon: Shield,
      title: "IPFS Storage",
      description: "Decentralized and immutable data storage",
      link: "/ipfs"
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Track your professional growth and network",
      link: "/dashboard"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 mb-6">
                <img src={asiLogo} alt="ASI Alliance" className="h-4 w-4" />
                <span className="text-sm font-medium text-[#96EA8C]">Powered by ASI Alliance</span>
              </div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              >
                Professional Network<br />
                <span className="text-[#96EA8C]">Powered by AI</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed"
              >
                Connect your wallet to join a decentralized professional network where AI agents help you build your career, find opportunities, and showcase your skills.
              </motion.p>

              {/* Wallet Connection */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                {!isConnected ? (
                  <>
                    <Button 
                      onClick={handleConnect}
                      disabled={isConnecting}
                      size="lg" 
                      className="bg-[#96EA8C] hover:bg-[#7BD474] text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                      <Wallet className="mr-2 h-5 w-5" />
                      {isConnecting ? 'Connecting...' : 'Connect Wallet to Start'}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    
                    {!isWalletAvailable && (
                      <p className="text-sm text-gray-500 mt-2">
                        Install MetaMask or ASI Wallet to get started
                      </p>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-3 px-6 py-3 bg-green-50 border border-green-200 rounded-xl">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-green-700 font-medium">
                        Connected: {walletName} ({getShortAddress()})
                      </span>
                    </div>
                    
                    <Button 
                      onClick={() => navigate('/ai-chat')}
                      size="lg"
                      className="bg-[#96EA8C] hover:bg-[#7BD474] text-white px-8 py-3 rounded-xl"
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Start AI Chat
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose W3rk?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of professional networking with AI-powered career development
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-green-100 group">
                    <CardHeader className="pb-4">
                      <div className={`w-12 h-12 rounded-lg bg-${feature.color}-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className={`h-6 w-6 text-${feature.color}-600`} />
                      </div>
                      <CardTitle className="text-lg font-semibold text-gray-900">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ASI Alliance Technology */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">ASI Alliance Technology Stack</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Leveraging cutting-edge decentralized AI infrastructure for professional networking
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={feature.link}>
                    <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:border-green-200 cursor-pointer group h-full">
                      <Icon className="h-10 w-10 text-[#96EA8C] mb-4 group-hover:scale-110 transition-transform" />
                      <h3 className="text-lg font-semibold mb-2 text-gray-900">{feature.title}</h3>
                      <p className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{feature.description}</p>
                      <ArrowRight className="h-4 w-4 text-[#96EA8C] mt-3 group-hover:translate-x-1 transition-transform" />
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Wallet Options Modal */}
      {showWalletOptions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Wallet Required</h3>
            <p className="text-gray-600 mb-6">
              To use W3rk, you need a Web3 wallet. Please install one of the following:
            </p>
            
            <div className="space-y-3 mb-6">
              <a 
                href="https://metamask.io/download/"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 border border-gray-200 rounded-lg hover:border-green-300 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Wallet className="h-6 w-6 text-orange-500" />
                  <div>
                    <div className="font-semibold">MetaMask</div>
                    <div className="text-sm text-gray-500">For Ethereum and EVM chains</div>
                  </div>
                </div>
              </a>
              
              <a 
                href="https://superintelligence.io/products/asi-wallet/"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 border border-gray-200 rounded-lg hover:border-green-300 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Wallet className="h-6 w-6 text-[#96EA8C]" />
                  <div>
                    <div className="font-semibold">ASI Wallet</div>
                    <div className="text-sm text-gray-500">For ASI Alliance network</div>
                  </div>
                </div>
              </a>
            </div>
            
            <Button 
              onClick={() => setShowWalletOptions(false)}
              variant="outline"
              className="w-full"
            >
              Close
            </Button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src={asiLogo} alt="ASI Alliance" className="h-6" />
            <span className="font-semibold text-gray-900">W3rk</span>
          </div>
          <p className="text-sm text-gray-500">
            Built with ASI Alliance Technology • Professional Networking for the Decentralized Future
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
