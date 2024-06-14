import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DashDineImage from '../../assets/dashdine.png';
import CheckBox from '@react-native-community/checkbox';
import styles from './styles';
import { register } from '../../services/api';

const Register = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !password || !cpf || !birthDate || !email) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (!agreed) {
      Alert.alert('Erro', 'Você precisa concordar com os termos de uso.');
      return;
    }

    setLoading(true);

    try {
      const data = await register(name, password, cpf, birthDate, email);
      setLoading(false);
      // Processar a resposta do registro, como navegar para a tela de login
      console.log('Registro bem-sucedido', data);
      navigation.navigate('Login'); // Substitua 'Login' pela tela correta
    } catch (error) {
      setLoading(false);
      Alert.alert('Erro', 'Falha ao registrar. Por favor, tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#ECA442" style={styles.backIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Image source={DashDineImage} style={styles.logo} />
        <Text style={styles.title}>DashDine</Text>
        <Text style={styles.subtitle}>PRIMEIRO ACESSO</Text>
        <TextInput
          style={styles.input}
          value={name}
          label="Nome Completo"
          onChangeText={setName}
          left={<TextInput.Icon name="account" />}
        />
        <TextInput
          style={styles.input}
          value={password}
          label="Senha"
          onChangeText={setPassword}
          secureTextEntry
          left={<TextInput.Icon name="lock" />}
          right={<TextInput.Icon name="eye" />}
        />
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            value={cpf}
            label="CPF"
            onChangeText={setCpf}
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            value={birthDate}
            label="Data Nasc."
            onChangeText={setBirthDate}
          />
        </View>
        <TextInput
          style={styles.input}
          value={email}
          label="E-mail"
          onChangeText={setEmail}
          left={<TextInput.Icon name="email" />}
        />
        <View style={styles.row}>
          <CheckBox
            value={agreed}
            onValueChange={setAgreed}
            tintColors={{ true: '#f5a623', false: '#ECA442' }}
          />
          <Text style={styles.agreeText}>
            LI E CONCORDO COM OS{' '}
            <Text style={styles.termsText}>TERMOS DE USO</Text>
          </Text>
        </View>
        <Button
          style={[styles.button, { backgroundColor: '#f5a623' }]}
          mode="contained"
          onPress={handleRegister}
          labelStyle={{ color: '#000' }}
          loading={loading}
          disabled={loading}
        >
          CADASTRAR
        </Button>
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
    </View>
  );
};

export default Register;
