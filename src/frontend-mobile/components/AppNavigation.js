import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../pages/LoginScreen';
import RegisterScreen from '../pages/RegisterScreen';
import OrderTrackingScreen from '../pages/OrderTrackingScreen';
import OrderDetailsScreen from '../pages/OrderDetailsScreen'; // Importe a tela de detalhes do pedido

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OrderTracking"
          component={OrderTrackingScreen}
          options={{ title: 'Acompanhar Pedidos' }}
        />
        <Stack.Screen
          name="OrderDetails"
          component={OrderDetailsScreen} // Adicione a tela de detalhes do pedido
          options={{ title: 'Detalhes do Pedido' }} // Título do cabeçalho para a tela de detalhes do pedido
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

