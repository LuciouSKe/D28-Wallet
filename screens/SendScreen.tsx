// screens/SendScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { ethers } from 'ethers';
import { getOrCreateWallet } from '../utils/wallet';

const SendScreen = () => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [sending, setSending] = useState(false);

  const sendETH = async () => {
    if (!recipient || !amount) {
      Alert.alert('Missing Fields', 'Please enter both recipient and amount.');
      return;
    }

    try {
      setSending(true);
      const walletData = await getOrCreateWallet();
      const wallet = new ethers.Wallet(walletData.privateKey);
      const provider = new ethers.providers.JsonRpcProvider('https://rpc.sepolia.org');
      const connectedWallet = wallet.connect(provider);

      const tx = await connectedWallet.sendTransaction({
        to: recipient,
        value: ethers.utils.parseEther(amount),
      });

      Alert.alert('Success!', `Transaction sent!\nHash: ${tx.hash}`);
      setRecipient('');
      setAmount('');
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Something went wrong');
    } finally {
      setSending(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <Text style={styles.title}>Send ETH</Text>

      <View style={styles.inputBox}>
        <Text style={styles.label}>Recipient Address</Text>
        <TextInput
          style={styles.input}
          placeholder="0xABC123..."
          placeholderTextColor="#777"
          value={recipient}
          onChangeText={setRecipient}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputBox}>
        <Text style={styles.label}>Amount (ETH)</Text>
        <TextInput
          style={styles.input}
          placeholder="0.01"
          placeholderTextColor="#777"
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
        />
      </View>

      <Pressable style={styles.button} onPress={sendETH} disabled={sending}>
        {sending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Send</Text>
        )}
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default SendScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  title: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 40,
    textAlign: 'center',
  },
  inputBox: {
    marginBottom: 24,
  },
  label: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    borderColor: '#333',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#00bcd4',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#00bcd4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
