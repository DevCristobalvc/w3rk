import { useState } from "react";
import { Brain, Send, Sparkles, User, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const AIChat = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm your AI Career Assistant powered by ASI Alliance. I can help you find opportunities, build your CV, or provide career guidance. What would you like to explore today?",
    },
  ]);
  const [input, setInput] = useState("");

  const aiPersonalities = [
    { name: "Recruiter AI", icon: "💼", active: true },
    { name: "Mentor AI", icon: "🧠", active: false },
    { name: "Strategist AI", icon: "📊", active: false },
    { name: "Developer AI", icon: "⚡", active: false },
  ];

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "I've analyzed your profile and found 3 perfect opportunities matching your Web3 expertise. Would you like me to walk you through them?",
      }]);
    }, 1000);
  };

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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* AI Personalities Sidebar */}
          <Card className="glass border-white/10 p-6 h-fit">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Brain className="h-5 w-5 text-accent" />
              AI Assistants
            </h2>
            <div className="space-y-2">
              {aiPersonalities.map((ai, i) => (
                <button
                  key={i}
                  className={`w-full p-3 rounded-lg text-left transition-all ${
                    ai.active
                      ? "bg-primary/20 border border-primary/50 glow-primary"
                      : "bg-secondary/50 hover:bg-secondary"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{ai.icon}</span>
                    <span className="font-medium text-sm">{ai.name}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-lg bg-accent/10 border border-accent/20">
              <p className="text-xs text-muted-foreground mb-2">Powered by</p>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent" />
                <span className="text-sm font-semibold">ASI Alliance</span>
              </div>
            </div>
          </Card>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="glass border-white/10 h-[calc(100vh-200px)] flex flex-col">
              {/* Chat Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                    <Bot className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Recruiter AI</h2>
                    <p className="text-sm text-muted-foreground">Your AI Career Assistant</p>
                  </div>
                  <div className="ml-auto">
                    <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-accent animate-pulse"></span>
                      Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message, i) => (
                  <div
                    key={i}
                    className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${
                      message.role === "user"
                        ? "bg-primary/20"
                        : "bg-gradient-to-br from-accent to-primary"
                    }`}>
                      {message.role === "user" ? (
                        <User className="h-5 w-5" />
                      ) : (
                        <Bot className="h-5 w-5" />
                      )}
                    </div>
                    <div className={`max-w-[70%] p-4 rounded-lg ${
                      message.role === "user"
                        ? "bg-primary/20"
                        : "bg-secondary/50"
                    }`}>
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="p-6 border-t border-white/10">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Ask me anything about your career..."
                    className="flex-1 bg-secondary/50 border-white/10"
                  />
                  <Button variant="hero" onClick={handleSend} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Powered by ASI Alliance • MeTTa reasoning engine
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
