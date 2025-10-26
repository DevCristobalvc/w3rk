import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useW3rkStore } from '@/stores/w3rkStore';
import { supabase } from '@/integrations/supabase/client';
import { simulateAgentNetwork } from '@/utils/agentSimulator';
import { Send, Loader2, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import asiLogo from '@/assets/asi-logo.png';

export default function AIChat() {
  const chatMode = useW3rkStore((state) => state.chatMode);
  const setChatMode = useW3rkStore((state) => state.setChatMode);
  const messages = useW3rkStore((state) => state.messages);
  const addMessage = useW3rkStore((state) => state.addMessage);
  const updateAgentStatus = useW3rkStore((state) => state.updateAgentStatus);
  const incrementAgentTasks = useW3rkStore((state) => state.incrementAgentTasks);
  const addNode = useW3rkStore((state) => state.addNode);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: input,
      timestamp: Date.now(),
    };

    addMessage(userMessage);
    setInput('');
    setIsLoading(true);

    try {
      if (chatMode === 'asi') {
        // Modo ASI Alliance - Simular respuestas de múltiples agentes
        const agentResponses = await simulateAgentNetwork(input);

        for (const { agent, response } of agentResponses) {
          updateAgentStatus(`${agent}-agent`, 'processing');

          const agentMessage = {
            id: `${Date.now()}-${agent}`,
            role: 'assistant' as const,
            content: response,
            timestamp: Date.now(),
            agentSource: agent,
          };

          addMessage(agentMessage);
          updateAgentStatus(`${agent}-agent`, 'active');
          incrementAgentTasks(`${agent}-agent`);

          // Agregar nodo al grafo si es relevante
          if (input.toLowerCase().includes('skill')) {
            addNode({
              id: `node-${Date.now()}`,
              type: 'skill',
              data: { label: input.substring(0, 20) },
              confidence: 0.85,
              lastUpdated: Date.now(),
            });
          }

          await new Promise((resolve) => setTimeout(resolve, 500));
        }

        setTimeout(() => {
          agentResponses.forEach(({ agent }) => {
            updateAgentStatus(`${agent}-agent`, 'idle');
          });
        }, 3000);
      } else {
        // Modo Gemini Direct
        const { data, error } = await supabase.functions.invoke('ai-chat', {
          body: { message: input },
        });

        if (error) throw error;

        const assistantMessage = {
          id: Date.now().toString(),
          role: 'assistant' as const,
          content: data.response,
          timestamp: Date.now(),
        };

        addMessage(assistantMessage);
      }
    } catch (error) {
      console.error('Error:', error);
      addMessage({
        id: Date.now().toString(),
        role: 'assistant' as const,
        content: 'Error al procesar mensaje. Por favor intenta de nuevo.',
        timestamp: Date.now(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const agentIcons: Record<string, string> = {
    profile: '🧠',
    match: '🔗',
    reputation: '⭐',
    analytics: '📊',
  };

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-background">
      <nav className="border-b p-4 bg-white/80 dark:bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <img src={asiLogo} alt="ASI Alliance" className="h-8" />
            <div>
              <h1 className="text-xl font-bold">AI Chat</h1>
              <p className="text-xs text-muted-foreground">
                Asistente inteligente Web3
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Label htmlFor="mode-toggle" className="text-sm">
              {chatMode === 'gemini' ? 'Gemini Direct' : 'ASI Alliance'}
            </Label>
            <Switch
              id="mode-toggle"
              checked={chatMode === 'asi'}
              onCheckedChange={(checked) =>
                setChatMode(checked ? 'asi' : 'gemini')
              }
            />
          </div>
        </div>
        {chatMode === 'asi' && (
          <div className="max-w-4xl mx-auto mt-2">
            <Badge className="bg-[#96EA8C] text-black">
              🤖 Red de Agentes ASI Activa
            </Badge>
          </div>
        )}
      </nav>

      <ScrollArea ref={scrollRef} className="flex-1 p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">
                Inicia una Conversación
              </h3>
              <p className="text-muted-foreground">
                {chatMode === 'asi'
                  ? 'La red de agentes ASI está lista para ayudarte'
                  : 'Pregunta sobre Web3, skills, DAOs y más'}
              </p>
            </div>
          )}

          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <Card
                  className={`max-w-[80%] ${
                    message.role === 'user'
                      ? 'bg-[#96EA8C]/20 border-[#96EA8C]/30'
                      : 'bg-muted'
                  }`}
                >
                  <div className="p-4">
                    {message.agentSource && (
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">
                          {agentIcons[message.agentSource]}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {message.agentSource}Agent
                        </Badge>
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(message.timestamp).toLocaleTimeString('es-ES')}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <Card className="bg-muted">
                <div className="p-4 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">
                    {chatMode === 'asi'
                      ? 'Red de agentes procesando...'
                      : 'Pensando...'}
                  </span>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t p-4 bg-white dark:bg-background">
        <div className="max-w-4xl mx-auto flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={
              chatMode === 'asi'
                ? 'Pregunta a la red de agentes ASI...'
                : 'Envía un mensaje...'
            }
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            size="icon"
            className="bg-[#96EA8C] hover:bg-[#96EA8C]/90 text-black"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
