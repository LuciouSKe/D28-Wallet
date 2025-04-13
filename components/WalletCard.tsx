/// components/WalletCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../utils/theme';

interface WalletCardProps {
  address: string;
  balance: string;
  onPress?: () => void;
}

export const WalletCard: React.FC<WalletCardProps> = ({ address, balance, onPress }) => {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.balance, { color: theme.colors.text }]}>
          {balance} ETH
        </Text>
        <Text style={[styles.address, { color: theme.colors.secondary }]}>
          {address.slice(0, 6)}...{address.slice(-4)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  balance: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  address: {
    fontSize: 16,
    fontWeight: '400',
  },
});
