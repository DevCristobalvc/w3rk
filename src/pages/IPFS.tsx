import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, ExternalLink, Copy, FileText, User, Globe, Clock, Wallet as WalletIcon } from 'lucide-react';
import { useCV } from '@/hooks/useCV';
import { useWallet } from '@/hooks/useWallet';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function IPFS() {
  const { isConnected, address, walletName } = useWallet();
  const { ipfsRecords, getIPFSRecordsByWallet } = useCV();
  const { toast } = useToast();

  const userIPFSRecords = address ? getIPFSRecordsByWallet(address) : [];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: 'CID copied to clipboard',
    });
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const IPFSCard = ({ record }: { record: any }) => {
    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-[#96EA8C]" />
              <div>
                <h3 className="font-semibold text-gray-900">{record.fileName || 'CV Document'}</h3>
                <p className="text-sm text-gray-500">Published to IPFS</p>
              </div>
            </div>
            <Badge className="bg-green-50 text-green-700 border-green-200">
              Published
            </Badge>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-mono text-gray-600 truncate">
                  {record.cid}
                </span>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(record.cid)}
                className="h-8 w-8 p-0"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{formatDate(record.timestamp)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span className="truncate max-w-[120px]">{record.wallet}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button size="sm" className="bg-[#96EA8C] hover:bg-[#7BD474] text-black">
                  Download
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              IPFS Network
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Decentralized file storage powered by the InterPlanetary File System. 
              Store and access your documents securely across the distributed network.
            </p>
          </div>

          {/* Wallet Status */}
          <div className="mb-8">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <WalletIcon className="h-5 w-5 text-[#96EA8C]" />
                    Wallet Status
                  </CardTitle>
                  {isConnected && (
                    <Badge className="bg-green-50 text-green-700 border-green-200">
                      Connected
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {isConnected ? (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Wallet:</span> {walletName}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Address:</span> {address}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-600">
                    Connect your wallet to view your IPFS publications and publish new content.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Upload Section */}
          <div className="mb-12">
            <Card>
              <CardHeader>
                <CardTitle>Publish to IPFS</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Publish your CV or documents to the decentralized IPFS network. 
                  Create a permanent, immutable record of your professional credentials.
                </p>
                <Link to="/create-cv">
                  <Button className="bg-[#96EA8C] hover:bg-[#7BD474] text-black">
                    <Upload className="mr-2 h-5 w-5" />
                    Create & Publish CV
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* IPFS Records */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your IPFS Publications</h2>
            
            {userIPFSRecords.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Globe className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No IPFS Records Yet</h3>
                  <p className="text-gray-600 mb-6">
                    Start by creating and publishing your first CV to the IPFS network. 
                    Your documents will be stored permanently and accessible worldwide.
                  </p>
                  <Link to="/create-cv">
                    <Button className="bg-[#96EA8C] hover:bg-[#7BD474] text-black">
                      Create Your First CV
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {userIPFSRecords
                  .sort((a, b) => b.timestamp - a.timestamp)
                  .map((record, index) => (
                    <IPFSCard key={record.cid} record={record} />
                  ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
