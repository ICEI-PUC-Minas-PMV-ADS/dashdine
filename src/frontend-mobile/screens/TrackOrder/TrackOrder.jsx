import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; // ou seu serviço API configurado
import styles from './styles';

const TrackOrder = () => {
  const [orders, setOrders] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Chamada à API para buscar pedidos
    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://dashdine-1hvj.onrender.com/orders'); // Atualize a URL conforme necessário
        setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderTitle}>Pedido #{item.id}</Text>
      <Text>Status: {item.status}</Text>
      <Text>Total: R${item.total}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acompanhar Pedido</Text>
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default TrackOrder;
