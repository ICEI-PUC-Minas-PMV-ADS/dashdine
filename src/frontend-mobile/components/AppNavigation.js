import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../pages/LoginScreen';
import RegisterScreen from '../pages/RegisterScreen';
import OrderTrackingScreen from '../pages/OrderTrackingScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
          name="OrderTracking" // Verifique se o nome está exatamente como 'OrderTracking'
          component={OrderTrackingScreen}
          options={{ title: 'Acompanhar Pedidos' }} // Título do cabeçalho para a tela de acompanhamento de pedidos
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
