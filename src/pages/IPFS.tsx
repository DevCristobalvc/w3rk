import { useW3rkStore } from '@/stores/w3rkStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, ExternalLink, Copy } from 'lucide-react';
import { generateMockCID, mockDelay } from '@/utils/agentSimulator';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

export default function IPFS() {
  const profile = useW3rkStore((state) => state.profile);
  const ipfsPublications = useW3rkStore((state) => state.ipfsPublications);
  const addIPFSRecord = useW3rkStore((state) => state.addIPFSRecord);
  const [publishing, setPublishing] = useState(false);
  const { toast } = useToast();

  const publishProfile = async () => {
    setPublishing(true);
    await mockDelay(2500);

    const mockCID = generateMockCID();
    const ipfsUrl = `https://ipfs.io/ipfs/${mockCID}`;

    const record = {
      cid: mockCID,
      url: ipfsUrl,
      timestamp: Date.now(),
      wallet: profile.wallet || 'Not connected',
      data: profile,
    };

    addIPFSRecord(record);
    setPublishing(false);

    toast({
      title: '✅ Perfil Publicado',
      description: `CID: ${mockCID.substring(0, 20)}...`,
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copiado',
      description: 'CID copiado al portapapeles',
    });
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">IPFS Publications</h1>
          <p className="text-muted-foreground">
            Historial de publicaciones descentralizadas de tu perfil
          </p>
        </motion.div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Publicar Perfil Actual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium mb-1">{profile.name}</p>
                <p className="text-sm text-muted-foreground">{profile.title}</p>
                <div className="flex gap-2 mt-2">
                  {profile.skills.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button
                onClick={publishProfile}
                disabled={publishing}
                size="lg"
                className="bg-[#96EA8C] hover:bg-[#96EA8C]/90 text-black"
              >
                {publishing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent mr-2" />
                    Publicando...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Publish to IPFS
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Historial de Publicaciones</h2>

          {ipfsPublications.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <div className="text-6xl mb-4">📦</div>
                <p className="text-muted-foreground mb-4">
                  Aún no hay publicaciones en IPFS
                </p>
                <Button onClick={publishProfile}>
                  Publicar Primer Perfil
                </Button>
              </CardContent>
            </Card>
          ) : (
            ipfsPublications
              .sort((a, b) => b.timestamp - a.timestamp)
              .map((record, index) => (
                <motion.div
                  key={record.cid}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-[#96EA8C] text-black">
                              Published
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {new Date(record.timestamp).toLocaleString('es-ES')}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <code className="text-sm bg-muted px-2 py-1 rounded">
                              {record.cid}
                            </code>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(record.cid)}
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Wallet: {record.wallet}
                          </p>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={record.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Ver en IPFS
                          </a>
                        </Button>
                      </div>

                      <div className="border-t pt-4">
                        <p className="font-medium mb-2">Datos Publicados:</p>
                        <pre className="text-xs bg-muted p-3 rounded overflow-auto">
                          {JSON.stringify(record.data, null, 2)}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
          )}
        </div>

        <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-[#96EA8C]/10 to-[#96EA8C]/5 border border-[#96EA8C]/20">
          <h3 className="font-semibold mb-2">
            🌐 Almacenamiento Descentralizado
          </h3>
          <p className="text-sm text-muted-foreground">
            Tu perfil se almacena de forma permanente e inmutable en IPFS. Cada
            publicación genera un Content Identifier (CID) único que garantiza la
            integridad de tus datos.
          </p>
        </div>
      </div>
    </div>
  );
}
