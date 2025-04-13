import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ActionButtons = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.buttonContainer}>
      <View style={styles.button}>
        <Button title="Send" color="#00bcd4" onPress={() => navigation.navigate('Send')} />
      </View>
      <View style={styles.button}>
        <Button title="Receive" color="#8bc34a" onPress={() => navigation.navigate('Receive')} />
      </View>
    </View>
  );
};

export default ActionButtons;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    flex: 1,
  },
});
