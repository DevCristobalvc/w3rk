import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

interface WalletState {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  walletName: string | null;
  balance: string | null;
  chainId: string | null;
}

// Session storage for wallet data (will be lost on page reload/tab close)
const WALLET_SESSION_KEY = 'w3rk_wallet_session';

export function useWallet() {
  const [wallet, setWallet] = useState<WalletState>(() => {
    // Try to get from session storage first
    if (typeof window !== 'undefined') {
      const sessionData = sessionStorage.getItem(WALLET_SESSION_KEY);
      if (sessionData) {
        try {
          return JSON.parse(sessionData);
        } catch (e) {
          console.warn('Failed to parse wallet session data');
        }
      }
    }
    
    return {
      address: null,
      isConnected: false,
      isConnecting: false,
      walletName: null,
      balance: null,
      chainId: null,
    };
  });

  // Save to session storage whenever wallet state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(WALLET_SESSION_KEY, JSON.stringify(wallet));
    }
  }, [wallet]);

  // Check if wallet is available
  const isWalletAvailable = useCallback(() => {
    if (typeof window === 'undefined') return false;
    return !!(window as any).ethereum || !!(window as any).solana;
  }, []);

  // Connect to MetaMask/Ethereum wallet
  const connectEthereumWallet = useCallback(async () => {
    if (typeof window === 'undefined' || !(window as any).ethereum) {
      toast({
        title: 'Wallet Not Found',
        description: 'Please install MetaMask or another Ethereum wallet',
        variant: 'destructive',
      });
      return false;
    }

    try {
      setWallet(prev => ({ ...prev, isConnecting: true }));
      
      const ethereum = (window as any).ethereum;
      
      // Request account access
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      
      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      // Get chain ID
      const chainId = await ethereum.request({ method: 'eth_chainId' });
      
      // Get balance
      const balance = await ethereum.request({
        method: 'eth_getBalance',
        params: [accounts[0], 'latest'],
      });

      // Convert balance from wei to ETH
      const balanceInEth = (parseInt(balance, 16) / Math.pow(10, 18)).toFixed(4);

      setWallet({
        address: accounts[0],
        isConnected: true,
        isConnecting: false,
        walletName: 'MetaMask',
        balance: `${balanceInEth} ETH`,
        chainId,
      });

      toast({
        title: 'Wallet Connected',
        description: `Connected to ${accounts[0].substring(0, 6)}...${accounts[0].substring(-4)}`,
      });

      return true;
    } catch (error: any) {
      console.error('Wallet connection error:', error);
      setWallet(prev => ({ ...prev, isConnecting: false }));
      
      toast({
        title: 'Connection Failed',
        description: error.message || 'Failed to connect wallet',
        variant: 'destructive',
      });
      
      return false;
    }
  }, []);

  // Connect to ASI/Solana wallet
  const connectASIWallet = useCallback(async () => {
    if (typeof window === 'undefined' || !(window as any).solana?.isASI) {
      toast({
        title: 'ASI Wallet Not Found',
        description: 'Please install ASI Wallet for ASI Alliance network',
        variant: 'destructive',
      });
      return false;
    }

    try {
      setWallet(prev => ({ ...prev, isConnecting: true }));
      
      const asiWallet = (window as any).solana;
      const response = await asiWallet.connect();
      
      if (!response.publicKey) {
        throw new Error('No public key received');
      }

      const address = response.publicKey.toString();
      
      // Get balance (this would require a Solana RPC call in real implementation)
      // For demo purposes, we'll simulate a balance
      const balance = '0.0000 SOL';

      setWallet({
        address,
        isConnected: true,
        isConnecting: false,
        walletName: 'ASI Wallet',
        balance,
        chainId: 'solana-mainnet',
      });

      toast({
        title: 'Wallet Connected',
        description: `Connected to ${address.substring(0, 6)}...${address.substring(-4)}`,
      });

      return true;
    } catch (error: any) {
      console.error('ASI wallet connection error:', error);
      setWallet(prev => ({ ...prev, isConnecting: false }));
      
      toast({
        title: 'Connection Failed',
        description: error.message || 'Failed to connect ASI Wallet',
        variant: 'destructive',
      });
      
      return false;
    }
  }, []);

  // Generic connect function that tries different wallets
  const connectWallet = useCallback(async (preferredType?: 'ethereum' | 'asi') => {
    if (preferredType === 'asi') {
      return await connectASIWallet();
    } else if (preferredType === 'ethereum') {
      return await connectEthereumWallet();
    } else {
      // Try Ethereum first, then ASI
      const ethResult = await connectEthereumWallet();
      if (!ethResult) {
        return await connectASIWallet();
      }
      return ethResult;
    }
  }, [connectEthereumWallet, connectASIWallet]);

  // Disconnect wallet
  const disconnectWallet = useCallback(() => {
    setWallet({
      address: null,
      isConnected: false,
      isConnecting: false,
      walletName: null,
      balance: null,
      chainId: null,
    });

    // Clear session storage
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(WALLET_SESSION_KEY);
    }

    toast({
      title: 'Wallet Disconnected',
      description: 'Your wallet has been disconnected',
    });
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else if (wallet.isConnected && accounts[0] !== wallet.address) {
        // Account changed, reconnect
        connectWallet();
      }
    };

    const handleChainChanged = (chainId: string) => {
      if (wallet.isConnected) {
        setWallet(prev => ({ ...prev, chainId }));
      }
    };

    // Ethereum event listeners
    if ((window as any).ethereum) {
      (window as any).ethereum.on('accountsChanged', handleAccountsChanged);
      (window as any).ethereum.on('chainChanged', handleChainChanged);
    }

    // ASI Wallet event listeners
    if ((window as any).solana?.isASI) {
      (window as any).solana.on('accountChanged', (publicKey: any) => {
        if (publicKey) {
          const newAddress = publicKey.toString();
          if (wallet.isConnected && newAddress !== wallet.address) {
            setWallet(prev => ({ ...prev, address: newAddress }));
          }
        } else {
          disconnectWallet();
        }
      });
    }

    return () => {
      // Clean up event listeners
      if ((window as any).ethereum) {
        (window as any).ethereum.removeListener('accountsChanged', handleAccountsChanged);
        (window as any).ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, [wallet.isConnected, wallet.address, connectWallet, disconnectWallet]);

  return {
    ...wallet,
    connectWallet,
    disconnectWallet,
    isWalletAvailable: isWalletAvailable(),
    // Helper functions
    getShortAddress: () => {
      if (!wallet.address) return null;
      return `${wallet.address.substring(0, 6)}...${wallet.address.substring(-4)}`;
    },
    getWalletInfo: () => ({
      address: wallet.address,
      shortAddress: wallet.address ? `${wallet.address.substring(0, 6)}...${wallet.address.substring(-4)}` : null,
      walletName: wallet.walletName,
      balance: wallet.balance,
      chainId: wallet.chainId,
    }),
  };
}