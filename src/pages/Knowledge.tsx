import { useCallback, useEffect } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Node,
  Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useW3rkStore } from '@/stores/w3rkStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const nodeColors = {
  skill: '#96EA8C',
  project: '#60A5FA',
  dao: '#F472B6',
  connection: '#FBBF24',
  experience: '#A78BFA',
};

export default function Knowledge() {
  const knowledgeGraph = useW3rkStore((state) => state.knowledgeGraph);
  const addNode = useW3rkStore((state) => state.addNode);
  const addEdgeToStore = useW3rkStore((state) => state.addEdge);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Convertir nodos del store a formato ReactFlow
  useEffect(() => {
    const flowNodes: Node[] = knowledgeGraph.nodes.map((node) => ({
      id: node.id,
      data: {
        label: (
          <div className="px-3 py-2">
            <div className="font-semibold text-sm">{node.data.label}</div>
            <div className="text-xs opacity-75">
              {Math.round(node.confidence * 100)}% confidence
            </div>
          </div>
        ),
      },
      position: node.position || { x: Math.random() * 500, y: Math.random() * 500 },
      style: {
        background: nodeColors[node.type],
        color: 'white',
        border: '2px solid white',
        borderRadius: '8px',
        fontSize: '12px',
      },
    }));

    const flowEdges: Edge[] = knowledgeGraph.edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      label: edge.label,
      animated: true,
      style: { stroke: '#96EA8C' },
    }));

    setNodes(flowNodes);
    setEdges(flowEdges);
  }, [knowledgeGraph, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge(params, eds));
      if (params.source && params.target) {
        addEdgeToStore({
          id: `${params.source}-${params.target}`,
          source: params.source,
          target: params.target,
          type: 'default',
        });
      }
    },
    [setEdges, addEdgeToStore]
  );

  const addSampleNode = () => {
    const newNode = {
      id: `node-${Date.now()}`,
      type: 'skill' as const,
      data: {
        label: 'Nueva Skill',
      },
      confidence: 0.9,
      lastUpdated: Date.now(),
      position: { x: Math.random() * 500, y: Math.random() * 500 },
    };
    addNode(newNode);
  };

  const exportGraph = () => {
    const graphData = {
      nodes: knowledgeGraph.nodes,
      edges: knowledgeGraph.edges,
      exported: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(graphData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `metta-graph-${Date.now()}.json`;
    a.click();
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="p-6 border-b">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">MeTTa Knowledge Graph</h1>
              <p className="text-muted-foreground">
                Grafo de conocimiento dinámico construido con MeTTa reasoning
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={addSampleNode} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Agregar Nodo
              </Button>
              <Button onClick={exportGraph} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export JSON
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {Object.entries(nodeColors).map(([type, color]) => (
              <div key={type} className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: color }}
                />
                <span className="text-sm capitalize">{type}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="flex-1 relative">
        {nodes.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Card className="max-w-md">
              <CardHeader>
                <CardTitle>Grafo vacío</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  El grafo de conocimiento se construye automáticamente a partir
                  de tus conversaciones en el chat con modo ASI Alliance activado.
                </p>
                <Button onClick={addSampleNode} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Nodo de Ejemplo
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
          >
            <Controls />
            <Background />
          </ReactFlow>
        )}
      </div>

      <div className="p-4 border-t bg-muted/30">
        <div className="flex items-center justify-between text-sm">
          <div className="flex gap-6">
            <span>
              <strong>{nodes.length}</strong> Nodos
            </span>
            <span>
              <strong>{edges.length}</strong> Conexiones
            </span>
          </div>
          <div className="text-muted-foreground">
            Powered by MeTTa Reasoning Engine
          </div>
        </div>
      </div>
    </div>
  );
}
