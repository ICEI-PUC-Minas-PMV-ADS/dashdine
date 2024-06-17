import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const OrderTrackingScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([
    { id: '1', number: 'Pedido #1234', status: 'Em andamento' },
    { id: '2', number: 'Pedido #5678', status: 'Entregue' },
    { id: '3', number: 'Pedido #9012', status: 'Pendente' },
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleOrderDetails = (order) => {
    navigation.navigate('OrderDetails', { order });
  };

  const filteredOrders = orders.filter(order =>
    order.number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.itemContainer, getStatusStyle(item.status)]}
      onPress={() => handleOrderDetails(item)}
    >
      <View style={styles.itemContent}>
        <View>
          <Text style={styles.itemText}>{item.number}</Text>
          <Text style={styles.itemStatus}>{item.status}</Text>
        </View>
        <Icon name="chevron-right" size={20} color="#000" />
      </View>
    </TouchableOpacity>
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Em andamento':
        return styles.inProgress;
      case 'Entregue':
        return styles.delivered;
      case 'Pendente':
        return styles.pending;
      default:
        return {};
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acompanhar Pedidos</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar pedidos..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredOrders}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
        ListEmptyComponent={<Text style={styles.emptyMessage}>Nenhum pedido encontrado</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchBar: {
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  list: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemStatus: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  inProgress: {
    borderColor: '#ffcc00',
  },
  delivered: {
    borderColor: '#00cc00',
  },
  pending: {
    borderColor: '#cc0000',
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
});

export default OrderTrackingScreen;
