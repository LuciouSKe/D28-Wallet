import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking } from 'react-native';
import { useWallet } from '../contexts/WalletContext';
import { useTheme } from '../utils/theme';

export const TransactionHistory = () => {
  const { getTransactions, currentNetwork } = useWallet();
  const theme = useTheme();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      setIsLoading(true);
      const txs = await getTransactions();
      setTransactions(txs);
    } catch (error) {
      console.error('Failed to load transactions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const formatAddress = (address: string) => {
    return address.slice(0, 6) + '...' + address.slice(-4);
  };

  const openExplorer = (hash: string) => {
    const url = `${currentNetwork.explorerUrl}/tx/${hash}`;
    Linking.openURL(url);
  };

  const renderTransaction = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        style={[styles.transactionItem, { backgroundColor: theme.colors.card }]}
        onPress={() => openExplorer(item.hash)}
      >
        <View style={styles.transactionHeader}>
          <Text style={[styles.transactionDate, { color: theme.colors.secondary }]}>
            {formatDate(item.timestamp)}
          </Text>
          <Text
            style={[
              styles.transactionStatus,
              {
                color:
                  item.status === 'confirmed'
                    ? theme.colors.success
                    : item.status === 'pending'
                    ? theme.colors.warning
                    : theme.colors.error,
              },
            ]}
          >
            {item.status.toUpperCase()}
          </Text>
        </View>

        <View style={styles.transactionDetails}>
          <View style={styles.transactionAddresses}>
            <Text style={[styles.transactionLabel, { color: theme.colors.secondary }]}>
              From:
            </Text>
            <Text style={[styles.transactionValue, { color: theme.colors.text }]}>
              {formatAddress(item.from)}
            </Text>
          </View>

          <View style={styles.transactionAddresses}>
            <Text style={[styles.transactionLabel, { color: theme.colors.secondary }]}>
              To:
            </Text>
            <Text style={[styles.transactionValue, { color: theme.colors.text }]}>
              {formatAddress(item.to)}
            </Text>
          </View>

          <View style={styles.transactionAmount}>
            <Text style={[styles.transactionLabel, { color: theme.colors.secondary }]}>
              Amount:
            </Text>
            <Text style={[styles.transactionValue, { color: theme.colors.text }]}>
              {item.value} {currentNetwork.symbol}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.loadingText, { color: theme.colors.text }]}>
          Loading transactions...
        </Text>
      </View>
    );
  }

  if (transactions.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.emptyText, { color: theme.colors.secondary }]}>
          No transactions yet
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Transaction History</Text>
      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.hash}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  list: {
    paddingBottom: 16,
  },
  transactionItem: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  transactionDate: {
    fontSize: 14,
  },
  transactionStatus: {
    fontSize: 12,
    fontWeight: '600',
  },
  transactionDetails: {
    gap: 8,
  },
  transactionAddresses: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionAmount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionLabel: {
    fontSize: 14,
    marginRight: 8,
    width: 60,
  },
  transactionValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
}); 