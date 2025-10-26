import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Brain, 
  Search, 
  FileText, 
  Video, 
  Download,
  ExternalLink,
  Star,
  Clock,
  User
} from 'lucide-react';

const Knowledge = () => {
  const knowledgeCategories = [
    {
      name: 'ASI Alliance Fundamentals',
      description: 'Core concepts and principles of the ASI Alliance ecosystem',
      icon: Brain,
      articles: 15,
      color: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      name: 'AI Agent Development',
      description: 'Guides for building and deploying AI agents',
      icon: BookOpen,
      articles: 28,
      color: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      name: 'Blockchain Integration',
      description: 'Smart contracts and decentralized applications',
      icon: FileText,
      articles: 22,
      color: 'bg-green-50 text-green-700 border-green-200'
    }
  ];

  const featuredResources = [
    {
      title: 'Getting Started with ASI Alliance',
      type: 'Guide',
      duration: '15 min read',
      author: 'ASI Team',
      rating: 4.9,
      tags: ['Beginner', 'Overview', 'Getting Started'],
      description: 'A comprehensive introduction to the ASI Alliance ecosystem and its capabilities.'
    },
    {
      title: 'Building Your First AI Agent',
      type: 'Tutorial',
      duration: '45 min read',
      author: 'Dev Community',
      rating: 4.8,
      tags: ['Tutorial', 'Development', 'Hands-on'],
      description: 'Step-by-step guide to creating and deploying your first AI agent.'
    },
    {
      title: 'Advanced Trading Strategies',
      type: 'Video',
      duration: '32 min watch',
      author: 'Expert Trader',
      rating: 4.7,
      tags: ['Advanced', 'Trading', 'Strategy'],
      description: 'Advanced techniques for automated trading with AI agents.'
    }
  ];

  const recentUpdates = [
    {
      title: 'New API Documentation Released',
      date: '2 days ago',
      type: 'Documentation'
    },
    {
      title: 'Security Best Practices Updated',
      date: '1 week ago',
      type: 'Guide'
    },
    {
      title: 'Community Showcase: Top Agents',
      date: '2 weeks ago',
      type: 'Article'
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
              Knowledge Base
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Explore comprehensive documentation, tutorials, and resources to master 
              the ASI Alliance ecosystem and build powerful AI applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="relative max-w-md mx-auto sm:mx-0">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search knowledge base..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#96EA8C] focus:border-transparent"
                />
              </div>
              <Button className="bg-[#96EA8C] hover:bg-[#7BD474] text-black px-8 py-3">
                Search
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Knowledge Categories */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Browse by Category
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {knowledgeCategories.map((category, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <category.icon className="h-8 w-8 text-[#96EA8C]" />
                      <Badge className={category.color}>
                        {category.articles} articles
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <Button 
                      variant="outline" 
                      className="w-full border-[#96EA8C] text-[#96EA8C] hover:bg-[#96EA8C] hover:text-black"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Explore Category
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Featured Resources */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Featured Resources
            </h2>
            <div className="grid gap-6 mb-16">
              {featuredResources.map((resource, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline" className="text-[#96EA8C] border-[#96EA8C]">
                            {resource.type}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Clock className="h-4 w-4" />
                            <span>{resource.duration}</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {resource.title}
                        </h3>
                        <p className="text-gray-600 mb-3">{resource.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{resource.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{resource.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-wrap gap-2">
                          {resource.tags.map((tag, tagIndex) => (
                            <Badge 
                              key={tagIndex}
                              className="bg-[#96EA8C]/10 text-[#96EA8C] border-[#96EA8C]/20"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-1" />
                            Save
                          </Button>
                          <Button size="sm" className="bg-[#96EA8C] hover:bg-[#7BD474] text-black">
                            {resource.type === 'Video' ? 'Watch' : 'Read'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Recent Updates */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Recent Updates
            </h2>
            <div className="space-y-4">
              {recentUpdates.map((update, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{update.title}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <FileText className="h-4 w-4" />
                          <span>{update.type}</span>
                          <span>•</span>
                          <span>{update.date}</span>
                        </div>
                      </div>
                      <ExternalLink className="h-5 w-5 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Knowledge;
