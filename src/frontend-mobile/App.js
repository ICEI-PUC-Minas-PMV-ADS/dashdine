import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import OrderTrackingScreen from './pages/OrderTrackingScreen'; // Importando a tela de acompanhamento de pedidos
import OrderDetailsScreen from './pages/OrderDetailsScreen'; // Importando a tela de detalhes do pedido

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerStyle: { height: 0 }, // Define a altura do cabeçalho como zero para removê-lo
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerStyle: { height: 0 }, // Define a altura do cabeçalho como zero para removê-lo
          }}
        />
        <Stack.Screen
          name="OrderTracking"
          component={OrderTrackingScreen}
          options={{ title: 'Acompanhar Pedidos' }} // Título do cabeçalho para a tela de acompanhamento de pedidos
        />
        <Stack.Screen
          name="OrderDetails"
          component={OrderDetailsScreen} // Adicionando a tela de detalhes do pedido
          options={{ title: 'Detalhes do Pedido' }} // Título do cabeçalho para a tela de detalhes do pedido
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;


