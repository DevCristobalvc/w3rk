import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/hooks/use-toast';
import { Send, Loader2, ArrowLeft, Paperclip, X, File, Image, Brain, Network, User, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useWallet } from '@/hooks/useWallet';
import asiLogo from '@/assets/asi-logo.png';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  files?: AttachedFile[];
  agentSource?: string;
  metadata?: {
    skillsExtracted?: string[];
    profileUpdates?: string[];
    wallPosts?: string[];
  };
}

interface AttachedFile {
  file: File;
  id: string;
  preview?: string;
  type: 'image' | 'document' | 'other';
}

// Session storage for messages (lost on page reload)
const CHAT_SESSION_KEY = 'w3rk_chat_session';
const PROFILE_SESSION_KEY = 'w3rk_profile_session';
const WALL_SESSION_KEY = 'w3rk_wall_session';

export default function AIChat() {
  const { isConnected, walletName, getShortAddress } = useWallet();
  
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== 'undefined') {
      const sessionData = sessionStorage.getItem(CHAT_SESSION_KEY);
      if (sessionData) {
        try {
          return JSON.parse(sessionData);
        } catch (e) {
          console.warn('Failed to parse chat session data');
        }
      }
    }
    
    return [
      {
        id: '1',
        role: 'system',
        content: `Welcome to W3rk! I'm your AI assistant powered by ASI Alliance technology. I'll help you build your professional profile through our conversation. ${isConnected ? `I can see you're connected with ${walletName}.` : 'Please connect your wallet to get started.'}`,
        timestamp: Date.now(),
        agentSource: 'ASI Career Agent'
      }
    ];
  });
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const [asiAgentStatus, setAsiAgentStatus] = useState({
    connected: true,
    activeAgents: 4,
    knowledgeNodes: 15,
    lastUpdate: Date.now()
  });
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Save messages to session storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(CHAT_SESSION_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Update ASI agent status periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setAsiAgentStatus(prev => ({
        ...prev,
        lastUpdate: Date.now(),
        knowledgeNodes: prev.knowledgeNodes + Math.floor(Math.random() * 3)
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    files.forEach((file) => {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: 'File too large',
          description: `${file.name} is larger than 10MB`,
          variant: 'destructive'
        });
        return;
      }

      const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
      const attachedFile: AttachedFile = {
        file,
        id,
        type: file.type.startsWith('image/') ? 'image' : 
              file.type.includes('pdf') || file.type.includes('doc') ? 'document' : 'other'
      };

      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          attachedFile.preview = e.target?.result as string;
          setAttachedFiles(prev => [...prev, attachedFile]);
        };
        reader.readAsDataURL(file);
      } else {
        setAttachedFiles(prev => [...prev, attachedFile]);
      }
    });
  };

  const removeFile = (id: string) => {
    setAttachedFiles(prev => prev.filter(f => f.id !== id));
  };

  const simulateAIResponse = async (userMessage: string, files: AttachedFile[]): Promise<Message> => {
    // Simulate ASI Alliance agent processing
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const lowerMessage = userMessage.toLowerCase();
    let response = '';
    let agentSource = 'ASI Career Agent';
    let skillsExtracted: string[] = [];
    let profileUpdates: string[] = [];
    let wallPosts: string[] = [];

    // Extract skills from message - comprehensive Web3 skills
    const skillPattern = /\b(react|javascript|typescript|python|solidity|web3|defi|blockchain|node\.?js|vue|angular|rust|go|docker|kubernetes|aws|gcp|azure|graphql|mongodb|postgresql|mysql|redis|ethereum|bitcoin|smart contracts|nft|dao|dapp|metamask|asi wallet|hardhat|truffle|openzeppelin|chainlink|ipfs|filecoin|polygon|arbitrum|optimism|avalanche|binance smart chain|cardano|polkadot|cosmos|uniswap|sushiswap|pancakeswap|yearn|curve|maker|synthetix|the graph|ens|aragon|gnosis|balancer|1inch|kyber|0x|loopring|nextjs|gatsby|nuxt|svelte|tailwind|bootstrap|material ui|sass|less|webpack|vite|rollup|babel|eslint|prettier|github|gitlab|jenkins|vercel|netlify|heroku)\b/gi;
    const extractedSkills = userMessage.match(skillPattern) || [];
    skillsExtracted = [...new Set(extractedSkills.map(s => s.toLowerCase()))];

    // File analysis
    let fileAnalysis = '';
    if (files.length > 0) {
      fileAnalysis = files.map(f => {
        if (f.type === 'image') {
          return `I can see you've shared an image (${f.file.name}). `;
        } else if (f.type === 'document') {
          return `I've received your document (${f.file.name}). `;
        }
        return `I've received your file (${f.file.name}). `;
      }).join('');
    }

    // Generate contextual responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      response = `Hello! Welcome to W3rk! I'm your AI assistant powered by ASI Alliance technology. I'm here to help you build your professional Web3 profile. Tell me about your experience with blockchain, DeFi, or any Web3 projects you've worked on.`;
      agentSource = 'ASI Onboarding Agent';
    }
    else if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('job')) {
      response = `That's valuable experience! ${fileAnalysis}I'm analyzing your background through our ASI Alliance knowledge graphs. `;
      if (skillsExtracted.length > 0) {
        response += `I've identified these key skills: ${skillsExtracted.slice(0, 5).join(', ')}. `;
        profileUpdates.push(`Added professional skills: ${skillsExtracted.slice(0, 5).join(', ')}`);
      }
      response += `This information is being processed by our multi-agent system to create your comprehensive Web3 professional profile.`;
      wallPosts.push(`🚀 Just shared my professional experience with W3rk's AI assistant. Building my decentralized career profile! #Web3Career`);
      agentSource = 'ASI Career Analyzer';
    }
    else if (lowerMessage.includes('project') || lowerMessage.includes('built') || lowerMessage.includes('developed')) {
      response = `Impressive project work! ${fileAnalysis}Our MeTTa knowledge graphs are processing your project details through the ASI Alliance network. `;
      if (skillsExtracted.length > 0) {
        response += `I can see you've worked with: ${skillsExtracted.slice(0, 4).join(', ')}. `;
        profileUpdates.push(`Added project experience with: ${skillsExtracted.slice(0, 4).join(', ')}`);
      }
      response += `These projects showcase valuable Web3 development expertise. Your profile is being enhanced with this technical experience.`;
      wallPosts.push(`💻 Just documented my latest Web3 projects on W3rk! Always building in this exciting space. #Web3Dev #Blockchain #DeFi`);
      agentSource = 'ASI Project Analyzer';
    }
    else if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('framework')) {
      response = `Excellent technical capabilities! ${fileAnalysis}`;
      if (skillsExtracted.length > 0) {
        response += `I've cataloged these technologies in your professional profile: ${skillsExtracted.join(', ')}. `;
        profileUpdates.push(`Enhanced skill portfolio: ${skillsExtracted.join(', ')}`);
      }
      response += `Your expertise in these areas makes you highly valuable for DeFi protocols, NFT platforms, and Web3 infrastructure projects. The ASI Alliance network is connecting you with relevant opportunities.`;
      wallPosts.push(`�️ Updated my tech stack on W3rk! Passionate about working with cutting-edge Web3 technologies and decentralized systems.`);
      agentSource = 'ASI Skills Agent';
    }
    else if (lowerMessage.includes('dao') || lowerMessage.includes('defi') || lowerMessage.includes('nft') || lowerMessage.includes('web3')) {
      response = `Your Web3 expertise is impressive! ${fileAnalysis}The ASI Alliance agent network is actively connecting you with professionals and opportunities in similar Web3 domains. `;
      if (skillsExtracted.length > 0) {
        response += `Your specialized skills in ${skillsExtracted.slice(0, 3).join(', ')} are highly sought after in the current market. `;
        profileUpdates.push(`Strengthened Web3 specialization: ${skillsExtracted.slice(0, 3).join(', ')}`);
      }
      response += `I'm building strategic connections for you with DAOs, DeFi protocols, NFT projects, and Web3 companies actively seeking talent with your background.`;
      wallPosts.push(`🌐 Diving deeper into the Web3 ecosystem through W3rk! Excited about the future of decentralized technologies and their impact. #Web3 #DeFi #DAO`);
      agentSource = 'ASI Web3 Connector';
    }
    else if (lowerMessage.includes('learn') || lowerMessage.includes('course') || lowerMessage.includes('certification') || lowerMessage.includes('education')) {
      response = `Outstanding commitment to continuous learning! ${fileAnalysis}I'm adding these educational achievements to your professional profile. The Web3 space highly values continuous learning and adaptation, and your commitment to staying current with rapidly evolving technology demonstrates strong professional growth mindset.`;
      profileUpdates.push('Added educational achievements, courses, and professional certifications');
      wallPosts.push(`📚 Always learning and growing! Just completed another course to stay ahead in the Web3 space. Knowledge and adaptation are key! #ContinuousLearning #Web3Education`);
      agentSource = 'ASI Learning Agent';
    }
    else {
      response = `I'm processing your message through the ASI Alliance multi-agent network. ${fileAnalysis}Multiple specialized agents are analyzing your input to extract relevant professional information and update your comprehensive career profile. Your data is being intelligently mapped to our MeTTa knowledge graphs for enhanced career matching and opportunity discovery.`;
      if (skillsExtracted.length > 0) {
        response += ` I've identified these relevant technical elements: ${skillsExtracted.slice(0, 3).join(', ')}.`;
        profileUpdates.push(`Profile enhancement with identified skills: ${skillsExtracted.slice(0, 3).join(', ')}`);
      }
      agentSource = 'ASI General Agent';
    }

    // Update profile and wall in session storage
    if (profileUpdates.length > 0) {
      updateUserProfile(profileUpdates);
    }
    
    if (wallPosts.length > 0) {
      updateSocialWall(wallPosts);
    }

    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: response,
      timestamp: Date.now(),
      agentSource,
      metadata: {
        skillsExtracted: skillsExtracted.length > 0 ? skillsExtracted : undefined,
        profileUpdates: profileUpdates.length > 0 ? profileUpdates : undefined,
        wallPosts: wallPosts.length > 0 ? wallPosts : undefined
      }
    };
  };

  const updateUserProfile = (updates: string[]) => {
    const currentProfile = JSON.parse(sessionStorage.getItem(PROFILE_SESSION_KEY) || '{}');
    const newProfile = {
      ...currentProfile,
      lastUpdated: Date.now(),
      walletAddress: getShortAddress(),
      walletName: walletName,
      updates: [...(currentProfile.updates || []), ...updates.map(update => ({
        content: update,
        timestamp: Date.now()
      }))]
    };
    sessionStorage.setItem(PROFILE_SESSION_KEY, JSON.stringify(newProfile));
  };

  const updateSocialWall = (posts: string[]) => {
    const currentWall = JSON.parse(sessionStorage.getItem(WALL_SESSION_KEY) || '[]');
    const newPosts = posts.map(post => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      content: post,
      timestamp: Date.now(),
      author: getShortAddress() || 'Anonymous',
      wallet: walletName || 'Unknown',
      likes: Math.floor(Math.random() * 25) + 3,
      comments: Math.floor(Math.random() * 8) + 1,
      profilePicture: `https://api.dicebear.com/7.x/identicon/svg?seed=${getShortAddress()}`
    }));
    const updatedWall = [...newPosts, ...currentWall].slice(0, 100); // Keep latest 100 posts
    sessionStorage.setItem(WALL_SESSION_KEY, JSON.stringify(updatedWall));
  };

  const handleSend = async () => {
    if ((!input.trim() && attachedFiles.length === 0) || isLoading) return;

    if (!isConnected) {
      toast({
        title: 'Wallet Required',
        description: 'Please connect your wallet to use the AI chat.',
        variant: 'destructive'
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
      files: attachedFiles.length > 0 ? attachedFiles : undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setAttachedFiles([]);
    setIsLoading(true);

    try {
      const aiResponse = await simulateAIResponse(userMessage.content, attachedFiles);
      setMessages(prev => [...prev, aiResponse]);
      
      // Simulate additional agent network activity
      setTimeout(() => {
        setAsiAgentStatus(prev => ({
          ...prev,
          knowledgeNodes: prev.knowledgeNodes + Math.floor(Math.random() * 5) + 1
        }));
      }, 2000);

    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: 'Error',
        description: 'Failed to get AI response. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (!isConnected) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <Card className="p-8 max-w-md w-full mx-4">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center gap-2 justify-center">
              <Bot className="h-6 w-6 text-[#96EA8C]" />
              AI Chat Assistant
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">
              Connect your wallet to start chatting with our AI assistant powered by ASI Alliance technology.
            </p>
            <Link to="/">
              <Button className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back to Connect Wallet
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            
            <div>
              <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Bot className="h-5 w-5 text-[#96EA8C]" />
                AI Career Assistant
              </h1>
              <p className="text-sm text-gray-500">Powered by ASI Alliance Technology</p>
            </div>
          </div>

          {/* ASI Status */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-700 font-medium">ASI Alliance Connected</span>
              </div>
              <div className="text-xs text-gray-500">
                {asiAgentStatus.activeAgents} agents • {asiAgentStatus.knowledgeNodes} knowledge nodes
              </div>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
              <User className="h-4 w-4 text-[#96EA8C]" />
              <span className="text-sm font-medium text-green-700">
                {walletName}: {getShortAddress()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-6 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div className={`max-w-2xl ${
                    message.role === 'user' ? 'ml-12' : 'mr-12'
                  }`}>
                    <div className={`rounded-2xl px-4 py-3 ${
                      message.role === 'user' 
                        ? 'bg-[#96EA8C] text-white' 
                        : message.role === 'system'
                        ? 'bg-purple-50 border border-purple-200 text-purple-900'
                        : 'bg-white border border-gray-200 text-gray-900'
                    }`}>
                      {/* Message Header for AI responses */}
                      {(message.role === 'assistant' || message.role === 'system') && (
                        <div className="flex items-center gap-2 mb-2">
                          {message.role === 'system' ? (
                            <Network className="h-4 w-4 text-purple-600" />
                          ) : (
                            <Brain className="h-4 w-4 text-[#96EA8C]" />
                          )}
                          <span className="text-xs font-medium text-gray-500">
                            {message.agentSource || 'AI Assistant'}
                          </span>
                          <span className="text-xs text-gray-400">
                            {formatTimestamp(message.timestamp)}
                          </span>
                        </div>
                      )}

                      {/* File attachments */}
                      {message.files && message.files.length > 0 && (
                        <div className="mb-3 space-y-2">
                          {message.files.map((file) => (
                            <div key={file.id} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                              {file.type === 'image' ? (
                                <>
                                  <Image className="h-4 w-4 text-[#96EA8C]" />
                                  {file.preview && (
                                    <img 
                                      src={file.preview} 
                                      alt={file.file.name}
                                      className="w-16 h-16 object-cover rounded border"
                                    />
                                  )}
                                </>
                              ) : (
                                <File className="h-4 w-4 text-[#96EA8C]" />
                              )}
                              <span className="text-sm text-green-700">{file.file.name}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Message content */}
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>

                      {/* Metadata for AI responses */}
                      {message.metadata && (
                        <div className="mt-2 pt-2 border-t border-gray-100">
                          {message.metadata.skillsExtracted && (
                            <div className="flex flex-wrap gap-1 mb-1">
                              {message.metadata.skillsExtracted.slice(0, 5).map((skill) => (
                                <Badge key={skill} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          )}
                          {message.metadata.profileUpdates && (
                            <div className="text-xs text-green-600 font-medium">
                              ✓ Profile updated
                            </div>
                          )}
                          {message.metadata.wallPosts && (
                            <div className="text-xs text-purple-600 font-medium">
                              ✓ Social wall updated
                            </div>
                          )}
                        </div>
                      )}

                      {/* Timestamp for user messages */}
                      {message.role === 'user' && (
                        <div className="text-xs opacity-75 mt-2">
                          {formatTimestamp(message.timestamp)}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="max-w-2xl mr-12">
                  <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4 text-[#96EA8C]" />
                      <span className="text-xs font-medium text-gray-500">ASI Agent Processing...</span>
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-6">
        {/* File Attachments */}
        {attachedFiles.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {attachedFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2"
                >
                  {file.type === 'image' ? (
                    <>
                      <Image className="h-4 w-4 text-gray-500" />
                      {file.preview && (
                        <img 
                          src={file.preview} 
                          alt={file.file.name}
                          className="w-8 h-8 object-cover rounded border"
                        />
                      )}
                    </>
                  ) : (
                    <File className="h-4 w-4 text-gray-500" />
                  )}
                  <span className="text-sm text-gray-700 max-w-32 truncate">
                    {file.file.name}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(file.id)}
                    className="h-6 w-6 p-0 hover:bg-red-100"
                  >
                    <X className="h-3 w-3 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <div className="relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tell me about your Web3 experience, skills, or projects..."
                className="pr-12 py-3 text-sm resize-none"
                disabled={isLoading}
              />
              
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  multiple
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
                  className="hidden"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="h-8 w-8 p-0"
                  disabled={isLoading}
                >
                  <Paperclip className="h-4 w-4 text-gray-500" />
                </Button>
              </div>
            </div>
          </div>
          
          <Button
            onClick={handleSend}
            disabled={isLoading || (!input.trim() && attachedFiles.length === 0)}
            className="bg-[#96EA8C] hover:bg-[#7BD474] text-white px-6 py-3"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>

        <p className="text-xs text-gray-500 mt-2">
          Your conversation builds your professional profile automatically • Powered by ASI Alliance
        </p>
      </div>
    </div>
  );
}
