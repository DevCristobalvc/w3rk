import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Star,
  CheckCircle,
  Activity,
  MessageCircle,
  Heart,
  Share2,
  Search,
  User,
  TrendingUp,
  Globe,
  Plus,
  Code,
  Trophy,
  Calendar,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useWallet } from "@/hooks/useWallet";
import { toast } from "@/hooks/use-toast";

// Session storage keys
const WALL_SESSION_KEY = 'w3rk_wall_session';
const PROFILE_SESSION_KEY = 'w3rk_profile_session';

interface WallPost {
  id: string;
  content: string;
  timestamp: number;
  author: string;
  wallet: string;
  likes: number;
  comments: number;
  profilePicture: string;
  skills?: string[];
  projectMentioned?: boolean;
  isOwnPost?: boolean;
}

interface UserProfile {
  lastUpdated: number;
  walletAddress: string;
  walletName: string;
  updates: Array<{
    content: string;
    timestamp: number;
  }>;
  totalSkills?: number;
  totalProjects?: number;
  profileCompleteness?: number;
}

const Dashboard = () => {
  const { isConnected, walletName, getShortAddress } = useWallet();
  
  const [posts, setPosts] = useState<WallPost[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [newPost, setNewPost] = useState('');
  const [activeTab, setActiveTab] = useState("wall");
  const [searchTerm, setSearchTerm] = useState('');

  // Load session data
  useEffect(() => {
    const savedPosts = sessionStorage.getItem(WALL_SESSION_KEY);
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      // Initialize with demo posts
      const demoPosts: WallPost[] = [
        {
          id: "demo-1",
          content: "Just completed a fascinating AI chat session discussing DeFi protocols! The conversation helped me refine my understanding of automated market makers. 🚀 #DeFi #Web3Learning",
          timestamp: Date.now() - 3600000,
          author: "DeFi Enthusiast",
          wallet: "0x742d...7A9f",
          likes: 12,
          comments: 3,
          profilePicture: "DE",
          skills: ["DeFi", "Smart Contracts", "Solana"],
          projectMentioned: true,
          isOwnPost: false
        },
        {
          id: "demo-2",
          content: "Amazing conversation with the AI about blockchain scalability solutions. Generated some incredible insights for my Layer 2 project! The future is bright. ⚡",
          timestamp: Date.now() - 7200000,
          author: "Layer2 Builder",
          wallet: "0x1a2b...3C4d",
          likes: 8,
          comments: 5,
          profilePicture: "LB",
          skills: ["Ethereum", "Layer 2", "React"],
          projectMentioned: false,
          isOwnPost: false
        }
      ];
      setPosts(demoPosts);
      sessionStorage.setItem(WALL_SESSION_KEY, JSON.stringify(demoPosts));
    }

    const savedProfile = sessionStorage.getItem(PROFILE_SESSION_KEY);
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
  }, []);

  // Save to session storage when posts change
  useEffect(() => {
    if (posts.length > 0) {
      sessionStorage.setItem(WALL_SESSION_KEY, JSON.stringify(posts));
    }
  }, [posts]);

  const createPost = () => {
    if (!isConnected) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to post",
        variant: "destructive"
      });
      return;
    }

    if (!newPost.trim()) return;

    const post: WallPost = {
      id: `post-${Date.now()}`,
      content: newPost,
      timestamp: Date.now(),
      author: walletName || "Anonymous",
      wallet: getShortAddress() || "",
      likes: 0,
      comments: 0,
      profilePicture: walletName?.slice(0, 2).toUpperCase() || "AN",
      isOwnPost: true
    };

    setPosts(prev => [post, ...prev]);
    setNewPost('');

    // Update user profile
    const profileUpdate = {
      lastUpdated: Date.now(),
      walletAddress: getShortAddress() || "",
      walletName: walletName || "",
      updates: [{
        content: `Posted: "${newPost.slice(0, 50)}${newPost.length > 50 ? '...' : ''}"`,
        timestamp: Date.now()
      }]
    };

    setUserProfile(prev => ({
      ...prev,
      ...profileUpdate,
      updates: prev ? [profileUpdate.updates[0], ...prev.updates.slice(0, 4)] : profileUpdate.updates
    }));

    toast({
      title: "Post Created",
      description: "Your professional update has been shared to the network"
    });
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <Users className="mx-auto h-12 w-12 text-[#96EA8C] mb-4" />
            <CardTitle className="text-2xl">W3rk Social Wall</CardTitle>
            <CardDescription>
              Connect your wallet to access the professional network and share updates
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => window.location.href = '/'} className="w-full">
              Connect Wallet to Continue
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">W3rk Social Wall</h1>
              <p className="text-gray-600 mt-1">Professional network for Web3 builders</p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Activity className="h-3 w-3 mr-1" />
                {posts.length} Active Posts
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Globe className="h-3 w-3 mr-1" />
                Connected: {walletName}
              </Badge>
            </div>
          </div>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white shadow-sm border">
            <TabsTrigger value="wall" className="flex items-center space-x-2">
              <MessageCircle className="h-4 w-4" />
              <span>Social Wall</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Profile Analysis</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="wall" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback className="bg-green-100 text-[#96EA8C]">
                      {walletName?.slice(0, 2).toUpperCase() || "W3"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">Share Professional Update</CardTitle>
                    <CardDescription>Connected as {walletName}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Share your Web3 journey, project updates, or insights..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="min-h-[100px] resize-none"
                />
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    {newPost.length}/500 characters
                  </p>
                  <Button 
                    onClick={createPost}
                    disabled={!newPost.trim() || newPost.length > 500}
                    className="bg-[#96EA8C] hover:bg-[#7BD474]"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Post Update
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <AnimatePresence>
                {posts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-start space-x-4">
                          <Avatar>
                            <AvatarFallback className={`${post.isOwnPost ? 'bg-green-100 text-[#96EA8C]' : 'bg-gray-100 text-gray-600'}`}>
                              {post.profilePicture}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold text-gray-900">{post.author}</h3>
                              {post.isOwnPost && (
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  You
                                </Badge>
                              )}
                              <span className="text-sm text-gray-500">•</span>
                              <span className="text-sm text-gray-500">{post.wallet}</span>
                            </div>
                            
                            <p className="text-gray-700 mb-3 leading-relaxed">{post.content}</p>
                            
                            {post.skills && post.skills.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-3">
                                {post.skills.map((skill, i) => (
                                  <Badge key={i} variant="secondary" className="bg-gray-100">
                                    <Code className="h-3 w-3 mr-1" />
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            )}
                            
                            <div className="flex items-center space-x-6 pt-3 border-t">
                              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-600">
                                <Heart className="h-4 w-4 mr-2" />
                                {post.likes}
                              </Button>
                              
                              <Button variant="ghost" size="sm" className="text-gray-500">
                                <MessageCircle className="h-4 w-4 mr-2" />
                                {post.comments}
                              </Button>
                              
                              <Button variant="ghost" size="sm" className="text-gray-500">
                                <Share2 className="h-4 w-4 mr-2" />
                                Share
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-[#96EA8C]" />
                    <span>Profile Analysis</span>
                  </CardTitle>
                  <CardDescription>
                    Insights generated from your activity and interactions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {userProfile ? (
                    <>
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-[#96EA8C]" />
                          <div>
                            <p className="font-medium">Wallet Connected</p>
                            <p className="text-sm text-gray-600">{userProfile.walletAddress}</p>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-700">Active</Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold">Recent Activity</h4>
                        {userProfile.updates.map((update, index) => (
                          <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                            <Activity className="h-4 w-4 text-gray-500 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-sm">{update.content}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {Math.floor((Date.now() - update.timestamp) / 60000)}m ago
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-6">
                      <User className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                      <p className="text-gray-600">No profile data yet</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Interact with the platform to build your profile
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-600" />
                    <span>Network Insights</span>
                  </CardTitle>
                  <CardDescription>
                    Your position in the W3rk professional network
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <Trophy className="mx-auto h-6 w-6 text-yellow-600 mb-2" />
                        <p className="text-2xl font-bold text-yellow-700">{posts.filter(p => p.isOwnPost).length}</p>
                        <p className="text-sm text-yellow-600">Posts Shared</p>
                      </div>
                      
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <Heart className="mx-auto h-6 w-6 text-green-600 mb-2" />
                        <p className="text-2xl font-bold text-green-700">
                          {posts.filter(p => p.isOwnPost).reduce((sum, p) => sum + p.likes, 0)}
                        </p>
                        <p className="text-sm text-green-600">Total Likes</p>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Eye className="h-4 w-4 text-[#96EA8C]" />
                        <span className="font-medium text-green-900">Network Reach</span>
                      </div>
                      <p className="text-sm text-green-700">
                        Your posts have been seen by {posts.length * 15}+ professionals
                      </p>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Calendar className="h-4 w-4 text-purple-600" />
                        <span className="font-medium text-purple-900">Member Since</span>
                      </div>
                      <p className="text-sm text-purple-700">
                        Session started: {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
