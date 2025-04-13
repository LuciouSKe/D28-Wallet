// utils/wallet.ts
import { ethers } from 'ethers';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WALLET_KEY = 'D28_WALLET';

export const createWallet = () => {
  const wallet = ethers.Wallet.createRandom();
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
    mnemonic: wallet.mnemonic.phrase,
  };
};

export const saveWallet = async (wallet: { privateKey: string }) => {
  await AsyncStorage.setItem(WALLET_KEY, JSON.stringify(wallet));
};

export const loadWallet = async () => {
  const stored = await AsyncStorage.getItem(WALLET_KEY);
  if (!stored) return null;
  return JSON.parse(stored);
};

export const getOrCreateWallet = async () => {
  let wallet = await loadWallet();
  if (!wallet) {
    wallet = createWallet();
    await saveWallet(wallet);
  }
  return wallet;
};

export const getBalance = async (address: string) => {
  const provider = new ethers.providers.JsonRpcProvider('https://rpc.sepolia.org');
  const balance = await provider.getBalance(address);
  return ethers.utils.formatEther(balance);
};
