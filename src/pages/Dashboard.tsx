import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Brain, 
  Briefcase, 
  Users, 
  Award, 
  Sparkles, 
  TrendingUp, 
  Zap, 
  Globe, 
  Star,
  ArrowUpRight,
  MapPin,
  DollarSign,
  CheckCircle,
  Activity,
  Target,
  MessageCircle,
  Heart,
  Share2,
  Filter,
  Search,
  Bell,
  Settings,
  TrendingDown,
  Home,
  User,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data - In a real app, this would come from your backend/API
  const userProfile = {
    name: "Alex Rodriguez",
    title: "Senior Web3 Developer & DeFi Architect",
    location: "Buenos Aires, Argentina",
    avatar: "AR",
    connections: 1247,
    projects: 23,
    achievements: 156,
    reputation: 98.5,
    skills: ["Solidity", "React", "TypeScript", "Ethereum", "DeFi", "Smart Contracts", "Web3", "Node.js"],
    bio: "Passionate Web3 developer with 5+ years building decentralized applications. Expert in DeFi protocols, smart contract security, and blockchain architecture.",
    verified: true
  };

  const opportunities = [
    {
      id: 1,
      title: "Senior Smart Contract Developer",
      company: "Uniswap Labs",
      location: "Remote",
      salary: "$180k - $250k",
      match: 98,
      type: "Full-time",
      posted: "2 hours ago",
      description: "Lead development of next-generation DeFi protocols",
      skills: ["Solidity", "Ethereum", "DeFi", "Security"],
      applicants: 23,
      urgent: true
    },
    {
      id: 2,
      title: "Web3 Frontend Lead",
      company: "OpenSea",
      location: "San Francisco, CA",
      salary: "$160k - $220k",
      match: 92,
      type: "Full-time",
      posted: "1 day ago",
      description: "Build the future of NFT marketplaces",
      skills: ["React", "TypeScript", "Web3", "NFT"],
      applicants: 45,
      urgent: false
    },
    {
      id: 3,
      title: "Blockchain Architect",
      company: "ConsenSys",
      location: "Remote",
      salary: "$200k - $300k",
      match: 89,
      type: "Full-time",
      posted: "3 days ago",
      description: "Design enterprise blockchain solutions",
      skills: ["Architecture", "Ethereum", "Enterprise", "Security"],
      applicants: 12,
      urgent: false
    }
  ];

  const achievements = [
    {
      id: 1,
      name: "ETHGlobal Hackathon Winner",
      type: "Hackathon",
      date: "1 week ago",
      description: "Won first place with DeFi protocol innovation",
      points: 500,
      verified: true
    },
    {
      id: 2,
      name: "1000+ GitHub Contributions",
      type: "Milestone",
      date: "2 weeks ago",
      description: "Reached 1000 contributions this year",
      points: 250,
      verified: true
    },
    {
      id: 3,
      name: "Top 1% Developer",
      type: "Recognition",
      date: "1 month ago",
      description: "Ranked in top 1% of Web3 developers",
      points: 1000,
      verified: true
    }
  ];

  const networkActivity = [
    {
      id: 1,
      user: "Sarah Chen",
      action: "endorsed your skills",
      skills: ["Solidity", "Smart Contracts"],
      time: "2 hours ago",
      avatar: "SC"
    },
    {
      id: 2,
      user: "Mike Johnson",
      action: "shared a new opportunity",
      opportunity: "Senior DeFi Developer at Aave",
      time: "4 hours ago",
      avatar: "MJ"
    },
    {
      id: 3,
      user: "Elena Rodriguez",
      action: "commented on your project",
      project: "DeFi Yield Farming Protocol",
      time: "6 hours ago",
      avatar: "ER"
    }
  ];

  const recentProjects = [
    {
      id: 1,
      name: "DeFi Yield Optimizer",
      description: "AI-powered yield farming protocol",
      status: "Active",
      progress: 85,
      team: 4,
      deadline: "2 weeks",
      tech: ["Solidity", "React", "AI"]
    },
    {
      id: 2,
      name: "NFT Marketplace",
      description: "Decentralized NFT trading platform",
      status: "Completed",
      progress: 100,
      team: 6,
      deadline: "Completed",
      tech: ["Web3", "IPFS", "React"]
    }
  ];

  const notifications = [
    {
      id: 1,
      type: "opportunity",
      title: "New High-Match Opportunity",
      message: "Senior DeFi Developer at Aave - 96% match",
      time: "5 minutes ago",
      urgent: true,
      icon: Briefcase
    },
    {
      id: 2,
      type: "achievement",
      title: "Achievement Unlocked",
      message: "You've earned the 'Smart Contract Master' badge",
      time: "1 hour ago",
      urgent: false,
      icon: Award
    },
    {
      id: 3,
      type: "network",
      title: "New Connection",
      message: "Sarah Chen wants to connect with you",
      time: "2 hours ago",
      urgent: false,
      icon: Users
    }
  ];

  const quickStats = [
    { label: "Profile Views", value: "2.4k", change: "+12%", trend: "up" },
    { label: "Applications", value: "8", change: "+3", trend: "up" },
    { label: "Messages", value: "23", change: "+5", trend: "up" },
    { label: "Skills Endorsed", value: "47", change: "+8", trend: "up" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/3 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>
      {/* Enhanced Navigation */}
      <nav className="glass sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Web3 Network
              </span>
              <p className="text-xs text-muted-foreground">Powered by ASI Alliance</p>
            </div>
          </Link>
          
          <div className="flex items-center gap-2">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <Home className="h-4 w-4" />
                Home
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="gap-2 relative">
              <Bell className="h-4 w-4" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </Button>
            <Link to="/ai-chat">
              <Button variant="ghost" size="sm" className="gap-2">
                <Brain className="h-4 w-4" />
                AI Chat
              </Button>
            </Link>
            <Link to="/cv-builder">
              <Button variant="ghost" size="sm" className="gap-2">
                <User className="h-4 w-4" />
                CV Builder
              </Button>
            </Link>
            <Button variant="accent" size="sm" className="gap-2 glow-accent hover:scale-105 transition-transform duration-200">
              <Zap className="h-4 w-4" />
              Connect Wallet
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8 relative z-10">
        {/* Welcome Message */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {userProfile.name.split(' ')[0]}! 👋</h1>
          <p className="text-muted-foreground">Here's what's happening in your Web3 professional network today.</p>
        </div>

        {/* Enhanced Profile Header */}
        <Card className="glass border-white/10 p-8 mb-8 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5"></div>
          <div className="relative">
            <div className="flex items-start gap-8">
              <div className="relative">
                <div className="h-32 w-32 rounded-2xl bg-gradient-to-br from-primary to-accent p-1">
                  <div className="h-full w-full rounded-xl bg-card flex items-center justify-center text-4xl font-bold text-primary">
                    {userProfile.avatar}
                  </div>
                </div>
                {userProfile.verified && (
                  <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-4xl font-bold mb-2">{userProfile.name}</h1>
                    <p className="text-xl text-muted-foreground mb-2">{userProfile.title}</p>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{userProfile.location}</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="gap-2 hover:bg-primary/10">
                      <MessageCircle className="h-4 w-4" />
                      Message
                    </Button>
                    <Link to="/cv-builder">
                      <Button variant="hero" size="sm" className="gap-2 glow-primary hover:scale-105 transition-transform">
                        <Brain className="h-4 w-4" />
                        Generate AI CV
                      </Button>
                    </Link>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4 max-w-2xl">{userProfile.bio}</p>
                
                <div className="flex gap-2 flex-wrap mb-4">
                  {userProfile.skills.map((skill, i) => (
                    <Badge key={i} variant="secondary" className="px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{userProfile.connections.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Connections</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-accent">{userProfile.projects}</p>
                    <p className="text-sm text-muted-foreground">Projects</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{userProfile.achievements}</p>
                    <p className="text-sm text-muted-foreground">Achievements</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-accent">{userProfile.reputation}%</p>
                    <p className="text-sm text-muted-foreground">Reputation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass border-white/10 p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <div>
                <p className="text-3xl font-bold">{userProfile.connections.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Professional Network</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-500">+12% this month</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="glass border-white/10 p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center">
                <Briefcase className="h-7 w-7 text-accent" />
              </div>
              <div>
                <p className="text-3xl font-bold">{userProfile.projects}</p>
                <p className="text-sm text-muted-foreground">Active Projects</p>
                <div className="flex items-center gap-1 mt-1">
                  <Activity className="h-3 w-3 text-blue-500" />
                  <span className="text-xs text-blue-500">3 new this week</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="glass border-white/10 p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <Award className="h-7 w-7 text-primary" />
              </div>
              <div>
                <p className="text-3xl font-bold">{userProfile.achievements}</p>
                <p className="text-sm text-muted-foreground">Achievements</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-3 w-3 text-yellow-500" />
                  <span className="text-xs text-yellow-500">Top 1% developer</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="glass border-white/10 p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center">
                <Brain className="h-7 w-7 text-accent" />
              </div>
              <div>
                <p className="text-3xl font-bold">AI</p>
                <p className="text-sm text-muted-foreground">Assistant Active</p>
                <div className="flex items-center gap-1 mt-1">
                  <Zap className="h-3 w-3 text-purple-500" />
                  <span className="text-xs text-purple-500">98% accuracy</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Enhanced Main Content with Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="glass border-white/10 p-1 w-full justify-start">
            <TabsTrigger value="overview" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="opportunities" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Briefcase className="h-4 w-4" />
              Opportunities
            </TabsTrigger>
            <TabsTrigger value="network" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Users className="h-4 w-4" />
              Network
            </TabsTrigger>
            <TabsTrigger value="projects" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Target className="h-4 w-4" />
              Projects
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {quickStats.map((stat, i) => (
                <Card key={i} className="glass border-white/10 p-4 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {stat.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                      <span className={`text-xs font-semibold ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* AI-Matched Opportunities */}
              <Card className="glass border-white/10 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-accent" />
                    AI-Matched Opportunities
                  </h2>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </div>
                <div className="space-y-4">
                  {opportunities.slice(0, 3).map((job) => (
                    <div key={job.id} className="p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all duration-300 cursor-pointer group border border-transparent hover:border-primary/20">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold group-hover:text-primary transition-colors">{job.title}</h3>
                            {job.urgent && (
                              <Badge variant="destructive" className="text-xs">Urgent</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{job.company} • {job.location}</p>
                          <p className="text-xs text-muted-foreground">{job.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-semibold text-accent">{job.match}% Match</span>
                            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <DollarSign className="h-3 w-3" />
                            <span>{job.salary}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          {job.skills.slice(0, 3).map((skill, i) => (
                            <Badge key={i} variant="outline" className="text-xs px-2 py-1">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{job.applicants} applicants</span>
                          <span>{job.posted}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Recent Achievements */}
              <Card className="glass border-white/10 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Recent Achievements
                  </h2>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>
                <div className="space-y-4">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className="p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all duration-300 cursor-pointer group">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                          <Award className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold group-hover:text-primary transition-colors">{achievement.name}</h3>
                            {achievement.verified && (
                              <CheckCircle className="h-4 w-4 text-primary" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{achievement.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{achievement.type}</span>
                            <span>{achievement.date}</span>
                            <span className="text-primary font-semibold">+{achievement.points} pts</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="opportunities" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">All Opportunities</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Search className="h-4 w-4" />
                  Search
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {opportunities.map((job) => (
                <Card key={job.id} className="glass border-white/10 p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold">{job.title}</h3>
                        {job.urgent && (
                          <Badge variant="destructive">Urgent</Badge>
                        )}
                        <Badge variant="secondary">{job.type}</Badge>
                      </div>
                      <p className="text-muted-foreground mb-2">{job.company} • {job.location}</p>
                      <p className="text-sm text-muted-foreground mb-3">{job.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg font-bold text-accent">{job.match}% Match</span>
                        <Progress value={job.match} className="w-20" />
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <DollarSign className="h-4 w-4" />
                        <span>{job.salary}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {job.skills.map((skill, i) => (
                        <Badge key={i} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">{job.applicants} applicants</span>
                      <span className="text-sm text-muted-foreground">{job.posted}</span>
                      <Button 
                        variant="hero" 
                        size="sm" 
                        className="gap-2 hover:scale-105 transition-transform"
                        onClick={() => alert(`Applying to ${job.title} at ${job.company}`)}
                      >
                        Apply Now
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="network" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Network Activity</h2>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {networkActivity.map((activity) => (
                <Card key={activity.id} className="glass border-white/10 p-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>{activity.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-semibold">{activity.user}</span> {activity.action}
                        {activity.skills && (
                          <span className="text-accent"> {activity.skills.join(", ")}</span>
                        )}
                        {activity.opportunity && (
                          <span className="text-primary"> {activity.opportunity}</span>
                        )}
                        {activity.project && (
                          <span className="text-primary"> {activity.project}</span>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => alert(`Liked ${activity.user}'s activity`)}
                        className="hover:bg-red-50 hover:text-red-500"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => alert(`Shared ${activity.user}'s activity`)}
                        className="hover:bg-blue-50 hover:text-blue-500"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">My Projects</h2>
              <Button 
                variant="hero" 
                size="sm" 
                className="gap-2 hover:scale-105 transition-transform"
                onClick={() => alert('Creating new project...')}
              >
                <Target className="h-4 w-4" />
                New Project
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentProjects.map((project) => (
                <Card key={project.id} className="glass border-white/10 p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                      <p className="text-muted-foreground mb-3">{project.description}</p>
                    </div>
                    <Badge variant={project.status === "Active" ? "default" : "secondary"}>
                      {project.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm text-muted-foreground">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{project.team} team members</span>
                      <span>{project.deadline}</span>
                    </div>
                    
                    <div className="flex gap-2">
                      {project.tech.map((tech, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
