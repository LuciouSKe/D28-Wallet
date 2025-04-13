import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { useWallet } from '../contexts/WalletContext';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { theme } from '../utils/theme';

export const OnboardingScreen = () => {
  const { createWallet, importWallet } = useWallet();
  const [privateKey, setPrivateKey] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateWallet = async () => {
    setIsLoading(true);
    try {
      await createWallet();
    } catch (error) {
      Alert.alert('Error', 'Failed to create wallet');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImportWallet = async () => {
    if (!privateKey) {
      Alert.alert('Error', 'Please enter your private key');
      return;
    }

    setIsLoading(true);
    try {
      await importWallet(privateKey);
      setPrivateKey('');
    } catch (error) {
      Alert.alert('Error', 'Invalid private key');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <Card variant="elevated" style={styles.headerCard}>
          <Text style={styles.title}>Welcome to D28Wallet</Text>
          <Text style={styles.subtitle}>
            Create a new wallet or import an existing one
          </Text>
        </Card>

        <Card style={styles.actionCard}>
          {!isImporting ? (
            <>
              <Text style={styles.description}>
                Create a new Ethereum wallet to start managing your crypto assets.
                Your private key will be securely stored on your device.
              </Text>
              <Button
                title="Create New Wallet"
                onPress={handleCreateWallet}
                loading={isLoading}
                size="large"
              />
            </>
          ) : (
            <>
              <Text style={styles.description}>
                Import your existing wallet using your private key. Make sure to
                enter it correctly to access your funds.
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your private key"
                value={privateKey}
                onChangeText={setPrivateKey}
                autoCapitalize="none"
                secureTextEntry
                placeholderTextColor={theme.colors.textSecondary}
              />
              <Button
                title="Import Wallet"
                onPress={handleImportWallet}
                loading={isLoading}
                disabled={!privateKey}
                size="large"
              />
            </>
          )}

          <Button
            title={
              isImporting
                ? 'Create a new wallet instead'
                : 'Import an existing wallet'
            }
            onPress={() => setIsImporting(!isImporting)}
            variant="outline"
            size="small"
            style={styles.switchButton}
          />
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: theme.spacing.md,
    justifyContent: 'center',
  },
  headerCard: {
    marginBottom: theme.spacing.md,
    alignItems: 'center',
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  actionCard: {
    padding: theme.spacing.lg,
  },
  description: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  input: {
    ...theme.typography.body,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    color: theme.colors.text,
  },
  switchButton: {
    marginTop: theme.spacing.md,
  },
}); 