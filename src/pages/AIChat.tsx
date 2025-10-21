import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Wallet, Paperclip, ArrowLeft, X, File, Image, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import asiLogo from "@/assets/asi-logo.png";

type Message = {
  role: "user" | "assistant";
  content: string;
  files?: File[];
};

type AttachedFile = {
  file: File;
  id: string;
  preview?: string;
};

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const connectWallet = () => {
    setIsWalletConnected(true);
    toast({
      title: "Wallet Connected",
      description: "You can now chat with your AI assistant",
    });
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    if (files.length === 0) return;

    // Validar tipos de archivo permitidos
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'application/pdf', 'text/plain', 'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    const validFiles = files.filter(file => {
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: `${file.name} is not a supported file type`,
          variant: "destructive",
        });
        return false;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File Too Large",
          description: `${file.name} is larger than 10MB`,
          variant: "destructive",
        });
        return false;
      }
      return true;
    });

    const newAttachedFiles: AttachedFile[] = validFiles.map(file => {
      const id = Math.random().toString(36).substr(2, 9);
      let preview: string | undefined;

      if (file.type.startsWith('image/')) {
        preview = URL.createObjectURL(file);
      }

      return { file, id, preview };
    });

    setAttachedFiles(prev => [...prev, ...newAttachedFiles]);
    
    if (validFiles.length > 0) {
      toast({
        title: "Files Attached",
        description: `${validFiles.length} file(s) attached successfully`,
      });
    }
  };

  const removeFile = (fileId: string) => {
    setAttachedFiles(prev => {
      const fileToRemove = prev.find(f => f.id === fileId);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter(f => f.id !== fileId);
    });
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return Image;
    if (file.type === 'application/pdf') return FileText;
    return File;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  };

  const sendMessage = async () => {
    if ((!input.trim() && attachedFiles.length === 0) || !isWalletConnected) return;

    const userMessage: Message = { 
      role: "user", 
      content: input,
      files: attachedFiles.map(af => af.file)
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setAttachedFiles([]);
    setIsLoading(true);

    try {
      // Preparar archivos para envío
      const filesToSend = await Promise.all(attachedFiles.map(async (af) => ({
        name: af.file.name,
        type: af.file.type,
        size: af.file.size,
        data: await convertFileToBase64(af.file)
      })));

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ 
          messages: [...messages, userMessage],
          files: filesToSend
        }),
      });

      if (!response.ok || !response.body) throw new Error("Failed to get response");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                assistantMessage += content;
                setMessages((prev) => {
                  const newMessages = [...prev];
                  if (newMessages[newMessages.length - 1]?.role === "assistant") {
                    newMessages[newMessages.length - 1].content = assistantMessage;
                  } else {
                    newMessages.push({ role: "assistant", content: assistantMessage });
                  }
                  return newMessages;
                });
              }
            } catch (e) {
              console.error("Parse error:", e);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <nav className="border-b border-border bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <img src={asiLogo} alt="ASI Alliance" className="h-8" />
          </div>
          {!isWalletConnected ? (
            <Button variant="default" size="sm" onClick={connectWallet} className="gap-2">
              <Wallet className="h-4 w-4" />
              Connect Wallet
            </Button>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              <span className="text-sm font-medium">Connected</span>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-6 py-8 max-w-4xl">
        {!isWalletConnected ? (
          <div className="h-full flex items-center justify-center">
            <Card className="p-12 text-center max-w-md">
              <Wallet className="h-16 w-16 mx-auto mb-6 text-primary" />
              <h2 className="text-2xl font-semibold mb-4">Connect Your Wallet</h2>
              <p className="text-muted-foreground mb-6">
                Connect your wallet to start chatting with your AI assistant and build your Web3 profile.
              </p>
              <Button variant="hero" size="lg" onClick={connectWallet} className="gap-2">
                <Wallet className="h-5 w-5" />
                Connect Wallet
              </Button>
            </Card>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-6 mb-6">
              {messages.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">Start a Conversation</h3>
                  <p className="text-muted-foreground">
                    Ask me anything about Web3 careers, credentials, or opportunities.
                  </p>
                </div>
              )}
              {messages.map((message, idx) => (
                <div
                  key={idx}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-6 py-4 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground"
                    }`}
                  >
                    {message.files && message.files.length > 0 && (
                      <div className="mb-3 space-y-2">
                        <p className="text-sm opacity-80 mb-2">📎 Attached files:</p>
                        <div className="flex flex-wrap gap-2">
                          {message.files.map((file, fileIdx) => {
                            const FileIcon = getFileIcon(file);
                            return (
                              <div
                                key={fileIdx}
                                className="flex items-center gap-2 bg-black/20 rounded-lg p-2 max-w-xs"
                              >
                                <FileIcon className="h-4 w-4" />
                                <span className="text-sm truncate">{file.name}</span>
                                <span className="text-xs opacity-60">
                                  ({formatFileSize(file.size)})
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Attached Files Preview */}
            {attachedFiles.length > 0 && (
              <div className="mb-4 p-4 bg-secondary/50 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Paperclip className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {attachedFiles.length} file(s) attached
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {attachedFiles.map((attachedFile) => {
                    const FileIcon = getFileIcon(attachedFile.file);
                    return (
                      <div
                        key={attachedFile.id}
                        className="flex items-center gap-2 bg-background border rounded-lg p-2 max-w-xs"
                      >
                        {attachedFile.preview ? (
                          <img
                            src={attachedFile.preview}
                            alt={attachedFile.file.name}
                            className="h-8 w-8 object-cover rounded"
                          />
                        ) : (
                          <FileIcon className="h-8 w-8 text-muted-foreground" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {attachedFile.file.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(attachedFile.file.size)}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFile(attachedFile.id)}
                          className="h-6 w-6"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Input */}
            <Card className="p-4 border bg-card">
              <div className="flex gap-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,.pdf,.txt,.doc,.docx"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => fileInputRef.current?.click()}
                  className="shrink-0"
                >
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                  placeholder="Ask about your Web3 career or attach files..."
                  className="flex-1 border-0 focus-visible:ring-0"
                  disabled={isLoading}
                />
                <Button
                  variant="default"
                  size="icon"
                  onClick={sendMessage}
                  disabled={isLoading || (!input.trim() && attachedFiles.length === 0)}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIChat;
