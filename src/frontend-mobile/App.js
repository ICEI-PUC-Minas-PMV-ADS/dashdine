import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

