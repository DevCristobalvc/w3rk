import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AgentType = 'profile' | 'match' | 'reputation' | 'analytics';
export type AgentStatus = 'idle' | 'active' | 'processing' | 'error';

export interface Agent {
  id: string;
  type: AgentType;
  name: string;
  status: AgentStatus;
  tasksCompleted: number;
  lastActivity: number;
  description: string;
  icon: string;
}

export interface MeTTaNode {
  id: string;
  type: 'skill' | 'project' | 'dao' | 'connection' | 'experience';
  data: any;
  confidence: number;
  lastUpdated: number;
  position?: { x: number; y: number };
}

export interface MeTTaEdge {
  id: string;
  source: string;
  target: string;
  type: string;
  label?: string;
}

export interface IPFSRecord {
  cid: string;
  url: string;
  timestamp: number;
  wallet: string;
  data: any;
}

export interface UserProfile {
  name: string;
  title: string;
  bio: string;
  skills: string[];
  wallet?: string;
  avatar?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  agentSource?: AgentType;
}

interface W3rkStore {
  // User Data
  profile: UserProfile;
  updateProfile: (profile: Partial<UserProfile>) => void;

  // Agents
  agents: Agent[];
  updateAgentStatus: (agentId: string, status: AgentStatus) => void;
  incrementAgentTasks: (agentId: string) => void;

  // Knowledge Graph
  knowledgeGraph: {
    nodes: MeTTaNode[];
    edges: MeTTaEdge[];
  };
  addNode: (node: MeTTaNode) => void;
  addEdge: (edge: MeTTaEdge) => void;
  updateNode: (nodeId: string, data: Partial<MeTTaNode>) => void;

  // IPFS
  ipfsPublications: IPFSRecord[];
  addIPFSRecord: (record: IPFSRecord) => void;

  // Chat
  chatMode: 'gemini' | 'asi';
  setChatMode: (mode: 'gemini' | 'asi') => void;
  messages: ChatMessage[];
  addMessage: (message: ChatMessage) => void;

  // Theme
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const initialAgents: Agent[] = [
  {
    id: 'profile-agent',
    type: 'profile',
    name: 'ProfileAgent',
    status: 'idle',
    tasksCompleted: 0,
    lastActivity: Date.now(),
    description: 'Actualiza perfil y extrae skills del chat',
    icon: '🧠',
  },
  {
    id: 'match-agent',
    type: 'match',
    name: 'MatchAgent',
    status: 'idle',
    tasksCompleted: 0,
    lastActivity: Date.now(),
    description: 'Sugiere oportunidades y DAOs compatibles',
    icon: '🔗',
  },
  {
    id: 'reputation-agent',
    type: 'reputation',
    name: 'ReputationAgent',
    status: 'idle',
    tasksCompleted: 0,
    lastActivity: Date.now(),
    description: 'Construye scoring basado en actividad',
    icon: '⭐',
  },
  {
    id: 'analytics-agent',
    type: 'analytics',
    name: 'AnalyticsAgent',
    status: 'idle',
    tasksCompleted: 0,
    lastActivity: Date.now(),
    description: 'Genera insights y métricas del perfil',
    icon: '📊',
  },
];

export const useW3rkStore = create<W3rkStore>()(
  persist(
    (set) => ({
      // User Data
      profile: {
        name: 'John Doe',
        title: 'Web3 Developer & Blockchain Architect',
        bio: 'Building the decentralized future',
        skills: ['Solidity', 'React', 'Smart Contracts'],
      },
      updateProfile: (profile) =>
        set((state) => ({
          profile: { ...state.profile, ...profile },
        })),

      // Agents
      agents: initialAgents,
      updateAgentStatus: (agentId, status) =>
        set((state) => ({
          agents: state.agents.map((agent) =>
            agent.id === agentId
              ? { ...agent, status, lastActivity: Date.now() }
              : agent
          ),
        })),
      incrementAgentTasks: (agentId) =>
        set((state) => ({
          agents: state.agents.map((agent) =>
            agent.id === agentId
              ? {
                  ...agent,
                  tasksCompleted: agent.tasksCompleted + 1,
                  lastActivity: Date.now(),
                }
              : agent
          ),
        })),

      // Knowledge Graph
      knowledgeGraph: {
        nodes: [],
        edges: [],
      },
      addNode: (node) =>
        set((state) => ({
          knowledgeGraph: {
            ...state.knowledgeGraph,
            nodes: [...state.knowledgeGraph.nodes, node],
          },
        })),
      addEdge: (edge) =>
        set((state) => ({
          knowledgeGraph: {
            ...state.knowledgeGraph,
            edges: [...state.knowledgeGraph.edges, edge],
          },
        })),
      updateNode: (nodeId, data) =>
        set((state) => ({
          knowledgeGraph: {
            ...state.knowledgeGraph,
            nodes: state.knowledgeGraph.nodes.map((node) =>
              node.id === nodeId ? { ...node, ...data } : node
            ),
          },
        })),

      // IPFS
      ipfsPublications: [],
      addIPFSRecord: (record) =>
        set((state) => ({
          ipfsPublications: [...state.ipfsPublications, record],
        })),

      // Chat
      chatMode: 'gemini',
      setChatMode: (mode) => set({ chatMode: mode }),
      messages: [],
      addMessage: (message) =>
        set((state) => ({
          messages: [...state.messages, message],
        })),

      // Theme
      theme: 'light',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'w3rk-storage',
      version: 1,
    }
  )
);
