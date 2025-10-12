import { Brain, Briefcase, Users, Award, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="glass sticky top-0 z-50 border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-accent" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Web3 Network
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">Dashboard</Button>
            <Button variant="ghost" size="sm">Opportunities</Button>
            <Button variant="ghost" size="sm">AI Assistant</Button>
            <Button variant="accent" size="sm">Connect Wallet</Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="glass border-white/10 p-6 mb-6">
          <div className="flex items-start gap-6">
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary to-accent p-1">
              <div className="h-full w-full rounded-full bg-card flex items-center justify-center text-3xl font-bold">
                JD
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">John Doe</h1>
              <p className="text-muted-foreground mb-4">Web3 Developer & Blockchain Architect</p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary-foreground text-sm">Solidity</span>
                <span className="px-3 py-1 rounded-full bg-accent/20 text-accent-foreground text-sm">React</span>
                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary-foreground text-sm">Smart Contracts</span>
              </div>
            </div>
            <Button variant="hero">Generate AI CV</Button>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="glass border-white/10 p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">342</p>
                <p className="text-sm text-muted-foreground">Connections</p>
              </div>
            </div>
          </Card>

          <Card className="glass border-white/10 p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Active Projects</p>
              </div>
            </div>
          </Card>

          <Card className="glass border-white/10 p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">28</p>
                <p className="text-sm text-muted-foreground">POAPs Earned</p>
              </div>
            </div>
          </Card>

          <Card className="glass border-white/10 p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <Brain className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">AI</p>
                <p className="text-sm text-muted-foreground">Assistant Active</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Activity & Opportunities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glass border-white/10 p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" />
              AI-Matched Opportunities
            </h2>
            <div className="space-y-4">
              {[
                { title: "Senior Smart Contract Developer", company: "DeFi Protocol", match: "95%" },
                { title: "Web3 Frontend Lead", company: "NFT Marketplace", match: "88%" },
                { title: "Blockchain Architect", company: "DAO Platform", match: "82%" },
              ].map((job, i) => (
                <div key={i} className="p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold">{job.title}</h3>
                      <p className="text-sm text-muted-foreground">{job.company}</p>
                    </div>
                    <span className="px-2 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold">
                      {job.match} Match
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="glass border-white/10 p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Recent Achievements
            </h2>
            <div className="space-y-4">
              {[
                { name: "ETHGlobal Hackathon 2025", type: "POAP", date: "2 days ago" },
                { name: "100 Contributions", type: "NFT Badge", date: "1 week ago" },
                { name: "Top Developer", type: "Soulbound", date: "2 weeks ago" },
              ].map((achievement, i) => (
                <div key={i} className="p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <Award className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{achievement.name}</h3>
                      <p className="text-sm text-muted-foreground">{achievement.type}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{achievement.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
