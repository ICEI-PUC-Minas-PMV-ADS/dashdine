import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const OrderDetailsScreen = ({ route }) => {
  const { order } = route.params; // Recebe o pedido passado como parâmetro na navegação

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{order.number}</Text>
      <Text style={styles.status}>Status: {order.status}</Text>
      {/* Adicione mais detalhes do pedido conforme necessário */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  status: {
    fontSize: 18,
  },
});

export default OrderDetailsScreen;
