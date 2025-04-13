import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { useWallet } from '../contexts/WalletContext';
import { useTheme } from '../utils/theme';

export const NetworkSelector = () => {
  const { currentNetwork, getNetworks, switchNetwork } = useWallet();
  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const networks = getNetworks();

  const handleNetworkSelect = async (networkId: string) => {
    await switchNetwork(networkId);
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity 
        style={[styles.selector, { backgroundColor: theme.colors.card }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={[styles.networkName, { color: theme.colors.text }]}>
          {currentNetwork.name}
        </Text>
        <Text style={[styles.networkSymbol, { color: theme.colors.secondary }]}>
          {currentNetwork.symbol}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={[styles.modalContainer, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.background }]}>
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
              Select Network
            </Text>
            
            <FlatList
              data={networks}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.networkItem,
                    { 
                      backgroundColor: item.id === currentNetwork.id ? theme.colors.card : 'transparent',
                      borderColor: theme.colors.border
                    }
                  ]}
                  onPress={() => handleNetworkSelect(item.id)}
                >
                  <Text style={[styles.networkItemName, { color: theme.colors.text }]}>
                    {item.name}
                  </Text>
                  <Text style={[styles.networkItemSymbol, { color: theme.colors.secondary }]}>
                    {item.symbol}
                  </Text>
                </TouchableOpacity>
              )}
            />
            
            <TouchableOpacity
              style={[styles.closeButton, { backgroundColor: theme.colors.primary }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  networkName: {
    fontSize: 16,
    fontWeight: '600',
  },
  networkSymbol: {
    fontSize: 14,
    fontWeight: '400',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    borderRadius: 12,
    padding: 16,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  networkItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
  },
  networkItemName: {
    fontSize: 16,
    fontWeight: '500',
  },
  networkItemSymbol: {
    fontSize: 14,
    fontWeight: '400',
  },
  closeButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 