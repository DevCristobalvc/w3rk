import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { 
  Bot, 
  Brain, 
  Zap, 
  Users, 
  TrendingUp, 
  Star,
  ExternalLink,
  MessageSquare,
  Shield,
  Cpu
} from 'lucide-react';

const Agents = () => {
  const featuredAgents = [
    {
      name: 'ASI SuperAgent',
      description: 'Multi-purpose AI agent with advanced capabilities',
      rating: 5.0,
      users: '25.7K',
      tags: ['Featured', 'Most Popular', 'ASI Alliance'],
      image: '🤖'
    },
    {
      name: 'DeFi Navigator',
      description: 'Expert DeFi strategy and yield optimization',
      rating: 4.8,
      users: '18.4K',
      tags: ['DeFi', 'Yield Farming', 'Strategy'],
      image: '💎'
    },
    {
      name: 'NFT Curator',
      description: 'AI-powered NFT analysis and collection management',
      rating: 4.6,
      users: '11.9K',
      tags: ['NFTs', 'Art', 'Collections'],
      image: '🎨'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#96EA8C]/10 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              ASI Agent Network
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover and deploy powerful AI agents from the ASI Alliance ecosystem. 
              Automate trading, research, security audits, and more with cutting-edge artificial intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-[#96EA8C] hover:bg-[#7BD474] text-black px-8 py-3 text-lg">
                <Bot className="mr-2 h-5 w-5" />
                Browse Agents
              </Button>
              <Button variant="outline" className="border-[#96EA8C] text-[#96EA8C] hover:bg-[#96EA8C] hover:text-black px-8 py-3 text-lg">
                <Cpu className="mr-2 h-5 w-5" />
                Deploy Your Agent
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Featured Agents Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Featured Agents
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {featuredAgents.map((agent, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-[#96EA8C]">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="text-4xl mb-2">{agent.image}</div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{agent.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl">{agent.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{agent.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {agent.tags.map((tag, tagIndex) => (
                        <Badge 
                          key={tagIndex} 
                          className="bg-[#96EA8C]/10 text-[#96EA8C] border-[#96EA8C]/20"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Users className="h-4 w-4" />
                        <span>{agent.users} users</span>
                      </div>
                      <Button size="sm" className="bg-[#96EA8C] hover:bg-[#7BD474] text-black">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Deploy
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Deploy Your Own Agent?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join the ASI Alliance ecosystem and create powerful AI agents that serve the community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-[#96EA8C] hover:bg-[#7BD474] text-black px-8 py-3 text-lg">
                <Zap className="mr-2 h-5 w-5" />
                Create Agent
              </Button>
              <Button variant="outline" className="border-gray-300 px-8 py-3 text-lg">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Agents;
