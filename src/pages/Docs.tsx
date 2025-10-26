import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { 
  Book, 
  Code, 
  ExternalLink, 
  FileText, 
  Github,
  Terminal,
  Zap,
  Users
} from 'lucide-react';

const Docs = () => {
  const documentationSections = [
    {
      title: 'Getting Started',
      description: 'Quick setup guide and basic concepts',
      icon: Zap,
      links: [
        { name: 'Installation', href: '#installation' },
        { name: 'Configuration', href: '#configuration' },
        { name: 'First Steps', href: '#first-steps' }
      ]
    },
    {
      title: 'API Reference', 
      description: 'Complete API documentation and examples',
      icon: Code,
      links: [
        { name: 'Authentication', href: '#auth' },
        { name: 'Wallet Integration', href: '#wallet' },
        { name: 'IPFS Methods', href: '#ipfs' }
      ]
    },
    {
      title: 'Tutorials',
      description: 'Step-by-step guides and tutorials',
      icon: Book,
      links: [
        { name: 'Building AI Agents', href: '#agents' },
        { name: 'CV Creation', href: '#cv' },
        { name: 'Social Features', href: '#social' }
      ]
    },
    {
      title: 'Community',
      description: 'Community resources and support',
      icon: Users,
      links: [
        { name: 'GitHub Repository', href: 'https://github.com' },
        { name: 'Discord Server', href: '#discord' },
        { name: 'Examples', href: '#examples' }
      ]
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
              Documentation
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Complete documentation for the W3rk platform. Learn how to integrate, 
              build, and deploy on the ASI Alliance ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-[#96EA8C] hover:bg-[#7BD474] text-black px-8 py-3 text-lg">
                <Book className="mr-2 h-5 w-5" />
                Quick Start
              </Button>
              <Button variant="outline" className="border-gray-300 px-8 py-3 text-lg">
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Documentation Sections */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Documentation Sections
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-16">
              {documentationSections.map((section, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <section.icon className="h-8 w-8 text-[#96EA8C]" />
                      <div>
                        <CardTitle className="text-xl">{section.title}</CardTitle>
                        <p className="text-gray-600 text-sm">{section.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {section.links.map((link, linkIndex) => (
                        <a
                          key={linkIndex}
                          href={link.href}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-gray-700">{link.name}</span>
                          <ExternalLink className="h-4 w-4 text-gray-400" />
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quick Reference */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Quick Reference
            </h2>
            
            <div className="space-y-6">
              {/* Installation */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Terminal className="h-5 w-5 text-[#96EA8C]" />
                    Installation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 rounded-lg p-4 mb-4">
                    <code className="text-green-400 text-sm">
                      npm install @w3rk/sdk
                    </code>
                  </div>
                  <p className="text-gray-600">
                    Install the W3rk SDK to start building with the ASI Alliance ecosystem.
                  </p>
                </CardContent>
              </Card>

              {/* Basic Usage */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-[#96EA8C]" />
                    Basic Usage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 rounded-lg p-4 mb-4">
                    <code className="text-green-400 text-sm block">
                      import {'{ W3rk }'} from '@w3rk/sdk';<br/>
                      <br/>
                      const w3rk = new W3rk();<br/>
                      await w3rk.connect();
                    </code>
                  </div>
                  <p className="text-gray-600">
                    Initialize and connect to the W3rk platform with just a few lines of code.
                  </p>
                </CardContent>
              </Card>

              {/* Key Features */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-[#96EA8C]" />
                    Key Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Badge className="bg-[#96EA8C]/10 text-[#96EA8C] border-[#96EA8C]/20">
                        Wallet Integration
                      </Badge>
                      <Badge className="bg-[#96EA8C]/10 text-[#96EA8C] border-[#96EA8C]/20">
                        IPFS Storage
                      </Badge>
                      <Badge className="bg-[#96EA8C]/10 text-[#96EA8C] border-[#96EA8C]/20">
                        AI Agents
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <Badge className="bg-[#96EA8C]/10 text-[#96EA8C] border-[#96EA8C]/20">
                        Social Network
                      </Badge>
                      <Badge className="bg-[#96EA8C]/10 text-[#96EA8C] border-[#96EA8C]/20">
                        CV Builder
                      </Badge>
                      <Badge className="bg-[#96EA8C]/10 text-[#96EA8C] border-[#96EA8C]/20">
                        ASI Alliance
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Support Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Need Help?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Get support from our community or reach out to our team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-[#96EA8C] hover:bg-[#7BD474] text-black px-8 py-3 text-lg">
                <Users className="mr-2 h-5 w-5" />
                Join Discord
              </Button>
              <Button variant="outline" className="border-gray-300 px-8 py-3 text-lg">
                <Github className="mr-2 h-5 w-5" />
                Report Issue
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Docs;
