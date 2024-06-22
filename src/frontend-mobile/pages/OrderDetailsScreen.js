import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const OrderDetailsScreen = ({ route }) => {
  const { order } = route.params;

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemQuantity}>Quantidade: {item.quantity}</Text>
      <Text style={styles.itemPrice}>Preço: {item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{order.number}</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações do Pedido</Text>
        <Text style={styles.status}><Icon name="info-circle" size={16} /> Status: {order.status}</Text>
        <Text style={styles.date}><Icon name="calendar" size={16} /> Data do Pedido: {order.date}</Text>
        <Text style={styles.customer}><Icon name="user" size={16} /> Cliente: {order.customer}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Itens do Pedido</Text>
        <FlatList
          data={order.items}
          renderItem={renderOrderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.total}><Icon name="money" size={16} /> Total do Pedido: {order.total}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Endereço de Entrega</Text>
        <Text> </Text>
        <Text style={styles.address}>{order.address}</Text>
      </View>
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
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  status: {
    fontSize: 18,
    marginBottom: 5,
  },
  date: {
    fontSize: 18,
    marginBottom: 5,
  },
  customer: {
    fontSize: 18,
    marginBottom: 5,
  },
  orderItem: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemQuantity: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 16,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 18,
  },
});

export default OrderDetailsScreen;
