import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

export default function Docs() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Documentación Técnica</h1>
          <p className="text-muted-foreground">
            Arquitectura e integración ASI Alliance
          </p>
        </motion.div>

        <Tabs defaultValue="architecture" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="architecture">Arquitectura</TabsTrigger>
            <TabsTrigger value="agents">Agentes</TabsTrigger>
            <TabsTrigger value="metta">MeTTa Graph</TabsTrigger>
            <TabsTrigger value="tech">Tech Stack</TabsTrigger>
          </TabsList>

          <TabsContent value="architecture">
            <Card>
              <CardHeader>
                <CardTitle>Arquitectura del Sistema</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                <h3>Componentes Principales</h3>
                <ul>
                  <li>
                    <strong>Frontend React:</strong> Interfaz de usuario construida
                    con React 18 + TypeScript + Vite
                  </li>
                  <li>
                    <strong>Zustand Store:</strong> Estado global persistente con
                    localStorage
                  </li>
                  <li>
                    <strong>Red de Agentes ASI:</strong> Sistema descentralizado de
                    4 agentes especializados
                  </li>
                  <li>
                    <strong>MeTTa Graph:</strong> Knowledge graph dinámico con
                    React Flow
                  </li>
                  <li>
                    <strong>IPFS Mock:</strong> Simulación de almacenamiento
                    descentralizado
                  </li>
                </ul>

                <h3>Flujo de Datos</h3>
                <pre className="bg-muted p-4 rounded-lg overflow-auto">
                  {`Usuario → Chat Interface
   ↓
ASI Agent Network (simulado)
   ↓
Zustand Store (persistido)
   ↓
MeTTa Knowledge Graph
   ↓
IPFS Publication (mock)`}
                </pre>

                <h3>Persistencia</h3>
                <p>
                  Todos los datos se almacenan en localStorage bajo la clave
                  'w3rk-storage' con versionado automático. Soporta sync entre
                  tabs y export/import completo.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="agents">
            <Card>
              <CardHeader>
                <CardTitle>Red de Agentes ASI</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                <h3>Agentes Especializados</h3>

                <h4>🧠 ProfileAgent</h4>
                <ul>
                  <li>Actualiza perfil basado en conversaciones</li>
                  <li>Extrae skills y experiencia automáticamente</li>
                  <li>Mantiene coherencia de datos profesionales</li>
                </ul>

                <h4>🔗 MatchAgent</h4>
                <ul>
                  <li>Sugiere oportunidades laborales Web3</li>
                  <li>Encuentra DAOs compatibles con perfil</li>
                  <li>Analiza compatibilidad skill-proyecto</li>
                </ul>

                <h4>⭐ ReputationAgent</h4>
                <ul>
                  <li>Construye scoring de reputación</li>
                  <li>Trackea contribuciones y logros</li>
                  <li>Genera métricas de confiabilidad</li>
                </ul>

                <h4>📊 AnalyticsAgent</h4>
                <ul>
                  <li>Genera insights del perfil</li>
                  <li>Analiza tendencias y métricas</li>
                  <li>Sugiere optimizaciones de visibilidad</li>
                </ul>

                <h3>Comunicación Inter-Agentes</h3>
                <pre className="bg-muted p-4 rounded-lg overflow-auto">
                  {`// Simulación de registro en Agentverse
const registerAgent = async (agentType) => {
  await mockDelay(2000);
  return {
    agentId: generateAgentId(),
    status: 'registered',
    endpoint: \`wss://agentverse.ai/agents/\${agentId}\`
  };
};`}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metta">
            <Card>
              <CardHeader>
                <CardTitle>MeTTa Knowledge Graph</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                <h3>Estructura del Grafo</h3>

                <h4>Tipos de Nodos</h4>
                <ul>
                  <li>
                    <strong style={{ color: '#96EA8C' }}>Skill:</strong> Habilidades
                    técnicas
                  </li>
                  <li>
                    <strong style={{ color: '#60A5FA' }}>Project:</strong>{' '}
                    Proyectos realizados
                  </li>
                  <li>
                    <strong style={{ color: '#F472B6' }}>DAO:</strong>{' '}
                    Organizaciones participadas
                  </li>
                  <li>
                    <strong style={{ color: '#FBBF24' }}>Connection:</strong>{' '}
                    Conexiones profesionales
                  </li>
                  <li>
                    <strong style={{ color: '#A78BFA' }}>Experience:</strong>{' '}
                    Experiencia laboral
                  </li>
                </ul>

                <h3>Modelo de Datos</h3>
                <pre className="bg-muted p-4 rounded-lg overflow-auto">
                  {`interface MeTTaNode {
  id: string;
  type: 'skill' | 'project' | 'dao' | 'connection' | 'experience';
  data: any;
  confidence: number; // 0-1
  lastUpdated: number;
  position?: { x: number; y: number };
}

interface MeTTaEdge {
  id: string;
  source: string;
  target: string;
  type: string;
  label?: string;
}`}
                </pre>

                <h3>Actualización Dinámica</h3>
                <p>
                  El grafo se actualiza automáticamente en modo ASI Alliance
                  conforme los agentes procesan conversaciones y detectan nuevas
                  relaciones conceptuales.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tech">
            <Card>
              <CardHeader>
                <CardTitle>Stack Tecnológico</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                <h3>Core</h3>
                <ul>
                  <li>React 18 + TypeScript</li>
                  <li>Vite (build tool)</li>
                  <li>Zustand (state management)</li>
                </ul>

                <h3>UI</h3>
                <ul>
                  <li>TailwindCSS + Shadcn/ui</li>
                  <li>Framer Motion (animations)</li>
                  <li>Lucide React (icons)</li>
                </ul>

                <h3>Visualization</h3>
                <ul>
                  <li>React Flow (@xyflow/react)</li>
                  <li>Recharts (analytics)</li>
                </ul>

                <h3>Web3</h3>
                <ul>
                  <li>Wagmi + Viem (wallet connection)</li>
                  <li>Mock IPFS integration</li>
                </ul>

                <h3>AI</h3>
                <ul>
                  <li>Supabase Edge Functions</li>
                  <li>Google Gemini via Lovable AI Gateway</li>
                </ul>

                <h3>ASI Alliance (Simulado)</h3>
                <ul>
                  <li>uAgents framework concepts</li>
                  <li>MeTTa reasoning simulation</li>
                  <li>ASI:One network mock</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-[#96EA8C]/10 to-[#96EA8C]/5 border border-[#96EA8C]/20">
          <h3 className="font-semibold mb-2">🚀 Demo Hackathon-Ready</h3>
          <p className="text-sm text-muted-foreground">
            Esta implementación demuestra integración completa del ecosistema ASI
            Alliance de forma visual y funcional, sin requerir infraestructura
            backend propia. Todas las funcionalidades core están operativas y
            listas para presentación.
          </p>
        </div>
      </div>
    </div>
  );
}
