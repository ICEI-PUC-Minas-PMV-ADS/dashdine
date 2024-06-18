import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const OrderTrackingScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([
    { id: '1', number: 'Pedido #1234', status: 'A caminho', date: '2024-06-15', total: 'R$150,00', customer: 'João Silva' },
    { id: '2', number: 'Pedido #5678', status: 'Entregue', date: '2024-06-14', total: 'R$200,00', customer: 'João Silva' },
    { id: '3', number: 'Pedido #9012', status: 'Em produção', date: '2024-06-13', total: 'R$50,00', customer: 'João Silva' },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOrderDetails = (order) => {
    navigation.navigate('OrderDetails', { order });
  };

  const filteredOrders = orders.filter(order =>
    order.number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderSeparator = () => (
    <View style={styles.separator} />
  );

  const renderItem = ({ item, index }) => (
    <>
      {index > 0 && filteredOrders[index - 1].status !== item.status && renderSeparator()}
      <TouchableOpacity
        style={[styles.itemContainer, getStatusStyle(item.status)]}
        onPress={() => handleOrderDetails(item)}
      >
        <View style={styles.itemContent}>
          <View style={styles.itemTextContainer}>
            <Text style={styles.itemText}>{item.number}</Text>
            <Text style={styles.itemDate}>{item.date}</Text>
            <Text style={styles.itemTotal}>{item.total}</Text>
            <Text style={styles.itemCustomer}>{item.customer}</Text>
          </View>
          <View style={styles.itemStatusContainer}>
            <Text style={styles.itemStatus}>{item.status}</Text>
            {getStatusIcon(item.status)}
          </View>
        </View>
      </TouchableOpacity>
    </>
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case 'A caminho':
        return styles.inProgress;
      case 'Entregue':
        return styles.delivered;
      case 'Em produção':
        return styles.pending;
      default:
        return {};
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'A caminho':
        return <Icon name="truck" size={20} color="#ffcc00" />;
      case 'Entregue':
        return <Icon name="check-circle" size={20} color="#00cc00" />;
      case 'Em produção':
        return <Icon name="clock-o" size={20} color="#cc0000" />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={filteredOrders}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          ItemSeparatorComponent={renderSeparator}
          ListEmptyComponent={<Text style={styles.emptyMessage}>Nenhum pedido encontrado</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
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
  itemTextContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  itemTotal: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  itemCustomer: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  itemStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemStatus: {
    fontSize: 14,
    color: '#666',
    marginRight: 10,
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
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
});

export default OrderTrackingScreen;
