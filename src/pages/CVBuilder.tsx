import { FileText, Download, Sparkles, Award, Code, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const CVBuilder = () => {
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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent mb-4">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-semibold">AI-Powered CV Generator</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Your Web3 Portfolio</h1>
            <p className="text-muted-foreground">
              Automatically generated from your on-chain credentials and achievements
            </p>
          </div>

          {/* CV Preview */}
          <Card className="glass border-white/10 p-8 mb-6">
            {/* Profile Section */}
            <div className="mb-8 pb-8 border-b border-white/10">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold mb-2">John Doe</h2>
                  <p className="text-xl text-muted-foreground mb-4">
                    Web3 Developer & Blockchain Architect
                  </p>
                  <div className="flex gap-4 text-sm">
                    <span>📍 Remote</span>
                    <span>🔗 0x1234...5678</span>
                    <span>📧 john@web3.dev</span>
                  </div>
                </div>
                <Button variant="hero" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export PDF
                </Button>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Passionate Web3 developer with 5+ years building decentralized applications.
                Specialized in Solidity smart contracts, DeFi protocols, and full-stack dApp development.
                Active contributor to multiple DAOs and open-source blockchain projects.
              </p>
            </div>

            {/* Skills Section */}
            <div className="mb-8 pb-8 border-b border-white/10">
              <div className="flex items-center gap-2 mb-4">
                <Code className="h-5 w-5 text-accent" />
                <h3 className="text-xl font-bold">Technical Skills</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Solidity", "React", "TypeScript", "Hardhat", "Ethers.js",
                  "The Graph", "IPFS", "Web3.js", "Next.js", "Node.js"
                ].map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-2 rounded-lg bg-primary/20 text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience Section */}
            <div className="mb-8 pb-8 border-b border-white/10">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="h-5 w-5 text-accent" />
                <h3 className="text-xl font-bold">Experience</h3>
              </div>
              <div className="space-y-6">
                {[
                  {
                    title: "Senior Smart Contract Developer",
                    company: "DeFi Protocol DAO",
                    period: "2023 - Present",
                    achievements: [
                      "Led development of $50M+ TVL lending protocol",
                      "Implemented cross-chain bridge using LayerZero",
                      "Conducted security audits preventing potential vulnerabilities"
                    ]
                  },
                  {
                    title: "Blockchain Developer",
                    company: "NFT Marketplace",
                    period: "2021 - 2023",
                    achievements: [
                      "Built ERC-721 and ERC-1155 marketplace contracts",
                      "Integrated IPFS for decentralized metadata storage",
                      "Optimized gas costs by 40% through contract improvements"
                    ]
                  }
                ].map((job, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold">{job.title}</h4>
                        <p className="text-muted-foreground">{job.company}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">{job.period}</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {job.achievements.map((achievement, j) => (
                        <li key={j}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Award className="h-5 w-5 text-accent" />
                <h3 className="text-xl font-bold">On-Chain Achievements</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "ETHGlobal Winner", type: "POAP", date: "2025" },
                  { name: "100+ Contributions", type: "NFT Badge", date: "2024" },
                  { name: "DAO Top Contributor", type: "Soulbound", date: "2024" },
                  { name: "Security Researcher", type: "Credential", date: "2023" }
                ].map((achievement, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-lg bg-secondary/50 flex items-center gap-3"
                  >
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                      <Award className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{achievement.name}</h4>
                      <p className="text-xs text-muted-foreground">{achievement.type} • {achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Button variant="glass" size="lg" className="gap-2">
              <FileText className="h-4 w-4" />
              View on IPFS
            </Button>
            <Button variant="hero" size="lg" className="gap-2">
              <Sparkles className="h-4 w-4" />
              Regenerate with AI
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVBuilder;
