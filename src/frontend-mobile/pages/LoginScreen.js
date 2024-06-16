import React, { useState } from 'react';
import { StyleSheet, View, Image, Alert } from 'react-native';
import { TextInput, Button, Text, Switch } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import LogoImage from '../assets/Dash.png';
import { login } from '../services/api';
import { useNavigation } from '@react-navigation/native'; // Importe useNavigation

const LoginScreen = () => {
  const navigation = useNavigation(); // Obtenha o objeto de navegação

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      // Aqui você pode verificar a resposta da API e realizar as ações adequadas
      if (response.accessToken) {
        // Se houver um token de acesso na resposta, navegue para a tela de acompanhamento de pedidos
        navigation.navigate('OrderTracking');
      } else {
        // Caso contrário, exiba uma mensagem de erro
        Alert.alert('Erro', 'Credenciais inválidas. Tente novamente.');
      }
    } catch (error) {
      // Se ocorrer um erro ao chamar a função login, exiba uma mensagem de erro genérica
      console.error('Erro ao fazer login:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login. Por favor, tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={LogoImage} style={styles.logo} />
        <Text style={styles.title}>DashDine</Text>
      </View>
      <TextInput
        style={styles.input}
        value={email}
        label="Email"
        onChangeText={(text) => setEmail(text)}
        left={<TextInput.Icon name="email" />}
      />
      <TextInput
        style={styles.input}
        value={password}
        label="Password"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        left={<TextInput.Icon name="lock" />}
        right={<TextInput.Icon name="eye" />}
      />

      <View style={styles.row}>
        <Switch
          value={rememberMe}
          onValueChange={(newValue) => setRememberMe(newValue)}
          color="#f5a623"
        />
        <Text style={styles.rememberMe}>Lembrar-me</Text>
        <Text style={styles.forgotPassword}>Esqueci a senha</Text>
      </View>

      <Button
        style={[styles.button, { backgroundColor: '#f5a623' }]}
        uppercase
        mode="contained"
        onPress={handleLogin}
        labelStyle={{ color: '#000' }}
        contentStyle={{ flexDirection: 'row-reverse' }}
        icon="arrow-right">
        Entrar
      </Button>

      <View style={styles.rowCenter}>
        <Text style={styles.text}>
          PRIMEIRO ACESSO?{' '}
          <Text
            style={styles.textLink}
            onPress={() => navigation.navigate('Register')}>
            CADASTRE-SE
          </Text>
        </Text>
      </View>

      <View style={styles.rowCenter}>
        <Text style={styles.middleText}>OU CONTINUE COM</Text>
      </View>

      <Button
        style={styles.socialMediaButton}
        uppercase
        mode="outlined"
        onPress={() => console.log('Pressed')}>
        <Icon name="google" size={20} color="#ECA442" style={styles.icon} />
        <Text style={styles.socialButtonText}>Google</Text>
      </Button>
      <Button
        style={styles.socialMediaButton}
        uppercase
        mode="outlined"
        onPress={() => console.log('Pressed')}>
        <Icon name="facebook" size={20} color="#ECA442" style={styles.icon} />
        <Text style={styles.socialButtonText}>Facebook</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  logo: {
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  button: {
    marginBottom: 8,
    backgroundColor: '#f5a623',
  },
  rememberMe: {
    color: '#fff',
    marginLeft: 8,
  },
  forgotPassword: {
    color: '#fff',
    marginLeft: 'auto',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  text: {
    color: '#fff',
    flex: 1,
    textAlign: 'right',
  },
  textLink: {
    textDecorationLine: 'underline',
    color: '#f5a623',
  },
  middleText: {
    color: '#fff',
    textAlign: 'center',
    marginVertical: 10,
  },
  socialMediaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderColor: '#fff',
    borderWidth: 1,
  },
  socialButtonText: {
    color: '#fff',
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
});

export default LoginScreen;

