import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const OrderTrackingScreen = () => {
  // Exemplo de dados fictícios de pedidos
  const [orders, setOrders] = useState([
    { id: '1', number: 'Pedido #1234', status: 'Em andamento' },
    { id: '2', number: 'Pedido #5678', status: 'Entregue' },
    { id: '3', number: 'Pedido #9012', status: 'Pendente' },
  ]);

  // Função para renderizar cada item da lista de pedidos
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => handleOrderDetails(item)}>
      <Text style={styles.itemText}>{item.number}</Text>
      <Text style={styles.itemStatus}>{item.status}</Text>
      <Icon name="chevron-right" size={20} color="#000" />
    </TouchableOpacity>
  );

  // Função para lidar com o pressionamento de um pedido
  const handleOrderDetails = (order) => {
    // Implemente a navegação para a tela de detalhes do pedido aqui
    console.log('Detalhes do pedido:', order);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acompanhar Pedidos</Text>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
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
  list: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
  itemStatus: {
    fontSize: 14,
    color: '#666',
  },
});

export default OrderTrackingScreen;
