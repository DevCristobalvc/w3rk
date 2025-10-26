import { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, ChevronRight, Check, Wallet, FileText, Upload, Save, Globe } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";
import { useCV, CVData } from "@/hooks/useCV";
import { useToast } from "@/hooks/use-toast";
import CVForm from "@/components/CV/CVForm";
import TemplatePicker from "@/components/CV/TemplatePicker";

type SourceMode = "upload" | "scratch";

const TEMPLATES = [
  {
    id: "neo",
    name: "Neo Minimal",
    tags: ["Clean", "One-column"],
    previewBg:
      "bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700",
  },
  {
    id: "grid",
    name: "Grid Pro",
    tags: ["2-column", "Sections"],
    previewBg:
      "bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/40 dark:to-indigo-800/30",
  },
  {
    id: "folio",
    name: "Folio Bold",
    tags: ["Creative", "Headlines"],
    previewBg:
      "bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/40 dark:to-emerald-800/30",
  },
];

export default function CreateCV() {
  const navigate = useNavigate();
  const { isConnected, address, walletName } = useWallet();
  const { createCV, publishToIPFS, isUploading } = useCV();
  const { toast } = useToast();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [mode, setMode] = useState<SourceMode>("scratch");
  const [file, setFile] = useState<File | null>(null);
  const [fullName, setFullName] = useState("");
  const [headline, setHeadline] = useState("");
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [currentCV, setCurrentCV] = useState<CVData | null>(null);
  const [selectedTpl, setSelectedTpl] = useState("neo");
  const [aiPrompt, setAiPrompt] = useState("");

  const canContinueStep1 = useMemo(() => {
    if (mode === "upload") return !!file;
    return fullName.trim().length > 1 && summary.trim().length > 10;
  }, [mode, file, fullName, summary]);

  const canContinueStep2 = useMemo(() => {
    return skills.length > 0;
  }, [skills]);

  const goNext = () => setStep((prev) => Math.min(prev + 1, 3) as 1 | 2 | 3);
  const goBack = () => setStep((prev) => Math.max(prev - 1, 1) as 1 | 2 | 3);

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills(prev => [...prev, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(prev => prev.filter(s => s !== skill));
  };

  const handleCreateCV = async () => {
    if (!address) return;

    const cvData = {
      name: fullName,
      title: headline,
      summary,
      skills,
      experience: [], // Could be expanded
      education: [], // Could be expanded
      walletAddress: address,
    };

    const cv = createCV(cvData);
    setCurrentCV(cv);
    goNext();
  };

  const handlePublishIPFS = async () => {
    if (!currentCV) return;

    try {
      const ipfsRecord = await publishToIPFS(currentCV.id);
      if (ipfsRecord) {
        toast({
          title: "✅ CV Published to IPFS",
          description: `CID: ${ipfsRecord.cid.substring(0, 20)}...`,
        });
        navigate('/dashboard');
      }
    } catch (error) {
      toast({
        title: "❌ Upload Failed",
        description: "Failed to publish CV to IPFS",
        variant: "destructive",
      });
    }
  };

  // Check wallet connection
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Card className="p-8 max-w-md w-full mx-4">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center gap-2 justify-center">
              <FileText className="h-6 w-6 text-[#96EA8C]" />
              CV Builder
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">
              Connect your wallet to create and store your professional CV on IPFS.
            </p>
            <Link to="/">
              <Button className="w-full bg-[#96EA8C] hover:bg-[#7BD474]">
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Create Professional CV
            </h1>
            <p className="text-sm text-gray-600">
              Build your Web3 CV with AI assistance - stored securely on IPFS
            </p>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-green-700">
                Connected: {walletName} ({address?.slice(0, 6)}...{address?.slice(-4)})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {step > 1 && (
              <Button variant="ghost" className="rounded-xl" onClick={goBack}>
                <ChevronLeft className="h-4 w-4 mr-1" /> Back
              </Button>
            )}

            {step === 1 && (
              <Button
                className="rounded-xl bg-[#96EA8C] hover:bg-[#7BD474]"
                onClick={goNext}
                disabled={!canContinueStep1}
              >
                Continue <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            )}

            {step === 2 && (
              <Button
                className="rounded-xl bg-[#96EA8C] hover:bg-[#7BD474]"
                onClick={handleCreateCV}
                disabled={!canContinueStep2}
              >
                Create CV <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            )}

            {step === 3 && (
              <Button
                className="rounded-xl bg-[#96EA8C] hover:bg-[#7BD474]"
                onClick={handlePublishIPFS}
                disabled={isUploading}
              >
                {isUploading ? (
                  <>Uploading to IPFS...</>
                ) : (
                  <>
                    <Globe className="h-4 w-4 mr-1" />
                    Publish to IPFS
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Stepper visual */}
        <div className="mb-6 flex items-center gap-4">
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${
              step >= 1
                ? "border-[#96EA8C] text-[#96EA8C]"
                : "border-gray-300 text-gray-500"
            }`}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-current" />
            <span className="text-sm">1. Basic Info</span>
          </div>
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${
              step >= 2
                ? "border-[#96EA8C] text-[#96EA8C]"
                : "border-gray-300 text-gray-500"
            }`}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-current" />
            <span className="text-sm">2. Skills</span>
          </div>
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${
              step >= 3
                ? "border-[#96EA8C] text-[#96EA8C]"
                : "border-gray-300 text-gray-500"
            }`}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-current" />
            <span className="text-sm">3. Publish</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main card */}
          <Card className="lg:col-span-2 bg-white">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                {step === 1 && (
                  <>
                    <FileText className="h-5 w-5 text-[#96EA8C]" />
                    Basic Information
                  </>
                )}
                {step === 2 && (
                  <>
                    <Check className="h-5 w-5 text-[#96EA8C]" />
                    Skills & Expertise
                  </>
                )}
                {step === 3 && (
                  <>
                    <Globe className="h-5 w-5 text-[#96EA8C]" />
                    Publish to IPFS
                  </>
                )}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                    <Input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Professional Title</label>
                    <Input
                      value={headline}
                      onChange={(e) => setHeadline(e.target.value)}
                      placeholder="e.g., Senior Web3 Developer"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Professional Summary *</label>
                    <Textarea
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      placeholder="Describe your professional background, expertise, and goals..."
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Add Skills *</label>
                    <div className="flex gap-2">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Type a skill and press Enter"
                        onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                      />
                      <Button onClick={addSkill} variant="outline">
                        Add
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Skills</label>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 rounded-lg"
                        >
                          <span className="text-sm text-green-700">{skill}</span>
                          <button
                            onClick={() => removeSkill(skill)}
                            className="text-green-500 hover:text-green-700"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && currentCV && (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">CV Preview</h3>
                    <p><strong>Name:</strong> {currentCV.name}</p>
                    <p><strong>Title:</strong> {currentCV.title}</p>
                    <p><strong>Summary:</strong> {currentCV.summary}</p>
                    <p><strong>Skills:</strong> {currentCV.skills.join(', ')}</p>
                    <p><strong>Wallet:</strong> {currentCV.walletAddress.slice(0, 6)}...{currentCV.walletAddress.slice(-4)}</p>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">🌐 IPFS Publication</h4>
                    <p className="text-sm text-blue-700 mb-2">
                      Your CV will be stored on IPFS (InterPlanetary File System) for decentralized, 
                      permanent access. This creates a tamper-proof record linked to your wallet address.
                    </p>
                    <p className="text-xs text-blue-600">
                      Note: This is a simulation for the hackathon. In production, this would connect to real IPFS nodes.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Side info */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#96EA8C]" />
                Web3 CV Builder
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600 space-y-3">
              {step === 1 && (
                <>
                  <p>
                    • Fill in your basic information to get started
                  </p>
                  <p>
                    • Your professional summary should highlight your Web3 experience
                  </p>
                  <p>
                    • This information will be linked to your wallet address
                  </p>
                </>
              )}
              {step === 2 && (
                <>
                  <p>
                    • Add relevant technical skills and expertise
                  </p>
                  <p>
                    • Include blockchain platforms you work with
                  </p>
                  <p>
                    • Programming languages and frameworks are important
                  </p>
                </>
              )}
              {step === 3 && (
                <>
                  <p>
                    • Your CV will be stored permanently on IPFS
                  </p>
                  <p>
                    • You'll receive a unique content hash (CID)
                  </p>
                  <p>
                    • Anyone can verify your credentials using your wallet
                  </p>
                </>
              )}
              
              <div className="bg-green-50 p-3 rounded-lg border border-green-200 mt-4">
                <h4 className="font-medium text-green-800 mb-1">✨ ASI Alliance Powered</h4>
                <p className="text-xs text-green-700">
                  This CV builder uses ASI Alliance technology for decentralized professional verification.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
