import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers, JsonRpcProvider, Wallet, formatEther, parseEther } from 'ethers';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface WalletContextType {
  address: string;
  balance: string;
  isLoading: boolean;
  error: string | null;
  createWallet: () => Promise<void>;
  importWallet: (privateKey: string) => Promise<void>;
  sendTransaction: (to: string, amount: string) => Promise<void>;
  getTransactions: () => Promise<Transaction[]>;
  getNetworks: () => Network[];
  switchNetwork: (networkId: string) => Promise<void>;
  currentNetwork: Network;
}

interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: number;
  status: 'pending' | 'confirmed' | 'failed';
}

interface Network {
  id: string;
  name: string;
  rpcUrl: string;
  chainId: number;
  symbol: string;
  explorerUrl: string;
}

const DEFAULT_NETWORKS: Network[] = [
  {
    id: 'ethereum',
    name: 'Ethereum Mainnet',
    rpcUrl: 'https://mainnet.infura.io/v3/YOUR_INFURA_KEY',
    chainId: 1,
    symbol: 'ETH',
    explorerUrl: 'https://etherscan.io',
  },
  {
    id: 'goerli',
    name: 'Goerli Testnet',
    rpcUrl: 'https://goerli.infura.io/v3/YOUR_INFURA_KEY',
    chainId: 5,
    symbol: 'ETH',
    explorerUrl: 'https://goerli.etherscan.io',
  },
  {
    id: 'polygon',
    name: 'Polygon Mainnet',
    rpcUrl: 'https://polygon-rpc.com',
    chainId: 137,
    symbol: 'MATIC',
    explorerUrl: 'https://polygonscan.com',
  },
];

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState<any>(null);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('0');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentNetwork, setCurrentNetwork] = useState<Network>(DEFAULT_NETWORKS[0]);
  const [provider, setProvider] = useState<JsonRpcProvider>(new JsonRpcProvider(DEFAULT_NETWORKS[0].rpcUrl));

  useEffect(() => {
    loadWallet();
  }, []);

  const loadWallet = async () => {
    try {
      const storedWallet = await AsyncStorage.getItem('wallet');
      const storedNetwork = await AsyncStorage.getItem('currentNetwork');
      
      if (storedNetwork) {
        const network = JSON.parse(storedNetwork);
        setCurrentNetwork(network);
        setProvider(new JsonRpcProvider(network.rpcUrl));
      }
      
      if (storedWallet) {
        const privateKey = JSON.parse(storedWallet).privateKey;
        const loadedWallet = new Wallet(privateKey, provider);
        setWallet(loadedWallet);
        setAddress(loadedWallet.address);
        updateBalance(loadedWallet.address);
      }
    } catch (err) {
      setError('Failed to load wallet');
    } finally {
      setIsLoading(false);
    }
  };

  const updateBalance = async (address: string) => {
    try {
      const balance = await provider.getBalance(address);
      setBalance(formatEther(balance));
    } catch (err) {
      setError('Failed to fetch balance');
    }
  };

  const createWallet = async () => {
    try {
      const newWallet = Wallet.createRandom().connect(provider);
      await AsyncStorage.setItem('wallet', JSON.stringify({
        privateKey: newWallet.privateKey,
      }));
      setWallet(newWallet);
      setAddress(newWallet.address);
      updateBalance(newWallet.address);
    } catch (err) {
      setError('Failed to create wallet');
    }
  };

  const importWallet = async (privateKey: string) => {
    try {
      const importedWallet = new Wallet(privateKey, provider);
      await AsyncStorage.setItem('wallet', JSON.stringify({
        privateKey: importedWallet.privateKey,
      }));
      setWallet(importedWallet);
      setAddress(importedWallet.address);
      updateBalance(importedWallet.address);
    } catch (err) {
      setError('Failed to import wallet');
    }
  };

  const sendTransaction = async (to: string, amount: string) => {
    if (!wallet) {
      setError('No wallet found');
      return;
    }

    try {
      const tx = await wallet.sendTransaction({
        to,
        value: parseEther(amount),
      });
      await tx.wait();
      updateBalance(wallet.address);
    } catch (err) {
      setError('Failed to send transaction');
    }
  };

  const getTransactions = async (): Promise<Transaction[]> => {
    // This is a simplified version - in a real app, you would use an API like Etherscan
    // to fetch transaction history
    return [];
  };

  const getNetworks = (): Network[] => {
    return DEFAULT_NETWORKS;
  };

  const switchNetwork = async (networkId: string) => {
    try {
      const network = DEFAULT_NETWORKS.find(n => n.id === networkId);
      if (!network) {
        throw new Error('Network not found');
      }
      
      const newProvider = new JsonRpcProvider(network.rpcUrl);
      setProvider(newProvider);
      setCurrentNetwork(network);
      
      if (wallet) {
        const connectedWallet = wallet.connect(newProvider);
        setWallet(connectedWallet);
        updateBalance(connectedWallet.address);
      }
      
      await AsyncStorage.setItem('currentNetwork', JSON.stringify(network));
    } catch (err) {
      setError('Failed to switch network');
    }
  };

  return (
    <WalletContext.Provider
      value={{
        address,
        balance,
        isLoading,
        error,
        createWallet,
        importWallet,
        sendTransaction,
        getTransactions,
        getNetworks,
        switchNetwork,
        currentNetwork,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}; 