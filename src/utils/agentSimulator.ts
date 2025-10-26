import { AgentType } from '@/stores/w3rkStore';

export const mockDelay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const generateAgentId = () =>
  `agent_${Math.random().toString(36).substr(2, 9)}`;

export const generateMockCID = () =>
  `Qm${Math.random().toString(36).substr(2, 44)}`;

export const registerAgent = async (agentType: AgentType) => {
  await mockDelay(2000);
  return {
    agentId: generateAgentId(),
    status: 'registered',
    endpoint: `wss://agentverse.ai/agents/${generateAgentId()}`,
  };
};

export const processWithAgent = async (
  agentType: AgentType,
  input: string
): Promise<string> => {
  await mockDelay(1500);

  const responses: Record<AgentType, string[]> = {
    profile: [
      'He actualizado tus skills basándome en la conversación',
      'Perfil actualizado con nueva experiencia en Web3',
      'Agregué competencias de blockchain a tu perfil',
    ],
    match: [
      'Encontré 3 DAOs compatibles con tu perfil',
      'Hay 5 oportunidades que coinciden con tus habilidades',
      'Te recomiendo revisar estos proyectos DeFi',
    ],
    reputation: [
      '+15 puntos por nueva certificación',
      'Tu score de reputación aumentó a 850/1000',
      'Contribución reconocida: +20 puntos',
    ],
    analytics: [
      'Tu perfil tiene un 85% de completitud',
      'Has aumentado tu visibilidad en un 30% esta semana',
      'Tus skills más demandadas son: React, Solidity, Web3',
    ],
  };

  const agentResponses = responses[agentType];
  return agentResponses[Math.floor(Math.random() * agentResponses.length)];
};

export const simulateAgentNetwork = async (
  userMessage: string
): Promise<{ agent: AgentType; response: string }[]> => {
  // Determinar qué agentes deben responder basado en el mensaje
  const activeAgents: AgentType[] = [];

  if (
    userMessage.toLowerCase().includes('skill') ||
    userMessage.toLowerCase().includes('perfil')
  ) {
    activeAgents.push('profile');
  }
  if (
    userMessage.toLowerCase().includes('dao') ||
    userMessage.toLowerCase().includes('oportunidad')
  ) {
    activeAgents.push('match');
  }
  if (
    userMessage.toLowerCase().includes('reputación') ||
    userMessage.toLowerCase().includes('score')
  ) {
    activeAgents.push('reputation');
  }
  if (
    userMessage.toLowerCase().includes('métrica') ||
    userMessage.toLowerCase().includes('analytics')
  ) {
    activeAgents.push('analytics');
  }

  // Si no hay agentes específicos, usar ProfileAgent por defecto
  if (activeAgents.length === 0) {
    activeAgents.push('profile');
  }

  // Obtener respuestas de cada agente
  const responses = await Promise.all(
    activeAgents.map(async (agent) => ({
      agent,
      response: await processWithAgent(agent, userMessage),
    }))
  );

  return responses;
};
