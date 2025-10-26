import { useState, useEffect } from 'react';

export interface CVData {
  id: string;
  name: string;
  title: string;
  summary: string;
  skills: string[];
  experience: {
    company: string;
    position: string;
    period: string;
    description: string;
  }[];
  education: {
    institution: string;
    degree: string;
    period: string;
  }[];
  walletAddress: string;
  createdAt: number;
  ipfsCID?: string;
}

export interface IPFSRecord {
  cid: string;
  url: string;
  timestamp: number;
  walletAddress: string;
  cvData: CVData;
}

const CV_SESSION_KEY = 'w3rk_cvs_session';
const IPFS_SESSION_KEY = 'w3rk_ipfs_session';

// Simulate IPFS CID generation
const generateMockCID = (): string => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = 'Qm';
  for (let i = 0; i < 44; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Simulate IPFS upload delay
const mockIPFSUpload = async (data: CVData): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return generateMockCID();
};

export function useCV() {
  const [cvs, setCVs] = useState<CVData[]>([]);
  const [ipfsRecords, setIPFSRecords] = useState<IPFSRecord[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Load from session storage on mount
  useEffect(() => {
    const savedCVs = sessionStorage.getItem(CV_SESSION_KEY);
    const savedIPFS = sessionStorage.getItem(IPFS_SESSION_KEY);
    
    if (savedCVs) {
      try {
        setCVs(JSON.parse(savedCVs));
      } catch (e) {
        console.warn('Failed to parse saved CVs');
      }
    }
    
    if (savedIPFS) {
      try {
        setIPFSRecords(JSON.parse(savedIPFS));
      } catch (e) {
        console.warn('Failed to parse saved IPFS records');
      }
    }
  }, []);

  // Save to session storage whenever data changes
  useEffect(() => {
    sessionStorage.setItem(CV_SESSION_KEY, JSON.stringify(cvs));
  }, [cvs]);

  useEffect(() => {
    sessionStorage.setItem(IPFS_SESSION_KEY, JSON.stringify(ipfsRecords));
  }, [ipfsRecords]);

  const createCV = (cvData: Omit<CVData, 'id' | 'createdAt'>) => {
    const newCV: CVData = {
      ...cvData,
      id: Date.now().toString(),
      createdAt: Date.now(),
    };
    
    setCVs(prev => [...prev, newCV]);
    return newCV;
  };

  const updateCV = (id: string, updates: Partial<CVData>) => {
    setCVs(prev => prev.map(cv => 
      cv.id === id ? { ...cv, ...updates } : cv
    ));
  };

  const deleteCV = (id: string) => {
    setCVs(prev => prev.filter(cv => cv.id !== id));
  };

  const publishToIPFS = async (cvId: string): Promise<IPFSRecord | null> => {
    const cv = cvs.find(c => c.id === cvId);
    if (!cv) return null;

    setIsUploading(true);
    
    try {
      const cid = await mockIPFSUpload(cv);
      const ipfsUrl = `https://ipfs.io/ipfs/${cid}`;
      
      const ipfsRecord: IPFSRecord = {
        cid,
        url: ipfsUrl,
        timestamp: Date.now(),
        walletAddress: cv.walletAddress,
        cvData: { ...cv, ipfsCID: cid }
      };

      // Update CV with IPFS CID
      updateCV(cvId, { ipfsCID: cid });
      
      // Add to IPFS records
      setIPFSRecords(prev => [ipfsRecord, ...prev]);
      
      setIsUploading(false);
      return ipfsRecord;
    } catch (error) {
      setIsUploading(false);
      throw error;
    }
  };

  const getCVsByWallet = (walletAddress: string) => {
    return cvs.filter(cv => cv.walletAddress === walletAddress);
  };

  const getIPFSRecordsByWallet = (walletAddress: string) => {
    return ipfsRecords.filter(record => record.walletAddress === walletAddress);
  };

  return {
    cvs,
    ipfsRecords,
    isUploading,
    createCV,
    updateCV,
    deleteCV,
    publishToIPFS,
    getCVsByWallet,
    getIPFSRecordsByWallet,
  };
}