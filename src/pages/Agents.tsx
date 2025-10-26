import { useW3rkStore } from '@/stores/w3rkStore';
import { AgentStatus } from '@/components/agents/AgentStatus';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Agents() {
  const agents = useW3rkStore((state) => state.agents);
  const [logs, setLogs] = useState<
    { id: string; message: string; timestamp: number; agentId: string }[]
  >([]);

  useEffect(() => {
    // Simular logs de actividad
    const interval = setInterval(() => {
      const activeAgent = agents.find((a) => a.status === 'active');
      if (activeAgent) {
        setLogs((prev) => [
          {
            id: Math.random().toString(),
            message: `${activeAgent.icon} ${activeAgent.name} completó tarea de análisis`,
            timestamp: Date.now(),
            agentId: activeAgent.id,
          },
          ...prev.slice(0, 49),
        ]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [agents]);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Red de Agentes ASI</h1>
          <p className="text-muted-foreground">
            Sistema descentralizado de agentes especializados para gestión de
            perfil Web3
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <AgentStatus agent={agent} />
            </motion.div>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Activity Logs - Tiempo Real</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-2">
                {logs.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    Esperando actividad de agentes...
                  </p>
                ) : (
                  logs.map((log) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(log.timestamp).toLocaleTimeString('es-ES')}
                      </div>
                      <div className="flex-1 text-sm">{log.message}</div>
                    </motion.div>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-[#96EA8C]/10 to-[#96EA8C]/5 border border-[#96EA8C]/20">
          <h3 className="font-semibold mb-2">
            ⚡ Powered by ASI Alliance Technology
          </h3>
          <p className="text-sm text-muted-foreground">
            Esta red de agentes utiliza uAgents framework para comunicación
            descentralizada entre agentes especializados. Cada agente opera de
            manera autónoma mientras mantiene coherencia con el sistema general.
          </p>
        </div>
      </div>
    </div>
  );
}
