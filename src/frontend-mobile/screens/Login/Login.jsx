import React, { useState, useContext } from 'react';
import { View, Image, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/FontAwesome';
import DashDineImage from '../../assets/dashdine.png';
import styles from './styles';
import { AuthContext } from '../../context/AuthContext';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);

    try {
      await login(email, password);
      setLoading(false);
      navigation.navigate('TrackOrder');
    } catch (error) {
      setLoading(false);
      Alert.alert('Erro', 'Falha ao fazer login. Por favor, tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={DashDineImage} style={styles.logo} />
        <Text style={styles.title}>DashDine</Text>
      </View>
      <TextInput
        style={styles.input}
        value={email}
        label="Email"
        onChangeText={text => setEmail(text)}
        left={<TextInput.Icon name="email" />}
      />
      <TextInput
        style={styles.input}
        value={password}
        label="Password"
        onChangeText={text => setPassword(text)}
        secureTextEntry
        left={<TextInput.Icon name="lock" />}
        right={<TextInput.Icon name="eye" />}
      />

      <View style={styles.row}>
        <CheckBox value={rememberMe} onValueChange={setRememberMe} />
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
        icon="arrow-right"
        loading={loading}
        disabled={loading}
      >
        Entrar
      </Button>

      <View style={styles.rowCenter}>
        <Text style={styles.text}>
          PRIMEIRO ACESSO?{' '}
          <Text
            style={styles.textLink}
            onPress={() => navigation.navigate('Register')}
          >
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
        onPress={() => console.log('Pressed')}
      >
        <Icon name="google" size={20} color="#ECA442" style={styles.icon} />
        <Text style={styles.socialButtonText}>Google</Text>
      </Button>
      <Button
        style={styles.socialMediaButton}
        uppercase
        mode="outlined"
        onPress={() => console.log('Pressed')}
      >
        <Icon name="facebook" size={20} color="#ECA442" style={styles.icon} />
        <Text style={styles.socialButtonText}>Facebook</Text>
      </Button>
    </View>
  );
};

export default Login;
