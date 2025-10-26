import { Agent } from '@/stores/w3rkStore';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface AgentStatusProps {
  agent: Agent;
}

export const AgentStatus = ({ agent }: AgentStatusProps) => {
  const statusColors = {
    idle: 'bg-gray-400',
    active: 'bg-[#96EA8C]',
    processing: 'bg-yellow-400',
    error: 'bg-red-400',
  };

  const statusLabels = {
    idle: 'Inactivo',
    active: 'Activo',
    processing: 'Procesando',
    error: 'Error',
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-4xl">{agent.icon}</div>
          <div>
            <h3 className="font-semibold text-lg">{agent.name}</h3>
            <p className="text-sm text-muted-foreground">{agent.description}</p>
          </div>
        </div>
        <div className="relative">
          <Badge variant="secondary" className="gap-2">
            <motion.div
              className={`w-2 h-2 rounded-full ${statusColors[agent.status]}`}
              animate={
                agent.status === 'active' || agent.status === 'processing'
                  ? { scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }
                  : {}
              }
              transition={{ repeat: Infinity, duration: 2 }}
            />
            {statusLabels[agent.status]}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <p className="text-xs text-muted-foreground">Tareas Completadas</p>
          <p className="text-2xl font-bold text-[#96EA8C]">
            {agent.tasksCompleted}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Última Actividad</p>
          <p className="text-sm">
            {new Date(agent.lastActivity).toLocaleTimeString('es-ES')}
          </p>
        </div>
      </div>
    </Card>
  );
};
