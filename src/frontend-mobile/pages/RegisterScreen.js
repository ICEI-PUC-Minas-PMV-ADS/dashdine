import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import LogoImage from '../assets/Dash.png';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleRegister = () => {
    // Lógica de registro aqui
    console.log('Nome:', name);
    console.log('Senha:', password);
    console.log('CPF:', cpf);
    console.log('Data de Nascimento:', birthDate);
    console.log('Email:', email);
    console.log('Concordou com os termos:', agreed);
  };

  const toggleAgreement = () => {
    setAgreed(!agreed);
  };

  const checkboxIcon = agreed ? 'check-square-o' : 'square-o';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-left"
            size={24}
            color="#ECA442"
            style={styles.backIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Image source={LogoImage} style={styles.logo} />
        <Text style={styles.title}>DashDine</Text>
        <Text style={styles.subtitle}>PRIMEIRO ACESSO</Text>
        <TextInput
          style={styles.input}
          value={name}
          label="Nome Completo"
          onChangeText={(text) => setName(text)}
          left={<TextInput.Icon name="account" />}
        />
        <TextInput
          style={styles.input}
          value={password}
          label="Senha"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          left={<TextInput.Icon name="lock" />}
          right={<TextInput.Icon name="eye" />}
        />
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            value={cpf}
            label="CPF"
            onChangeText={(text) => setCpf(text)}
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            value={birthDate}
            label="Data Nasc."
            onChangeText={(text) => setBirthDate(text)}
          />
        </View>
        <TextInput
          style={styles.input}
          value={email}
          label="E-mail"
          onChangeText={(text) => setEmail(text)}
          left={<TextInput.Icon name="email" />}
        />
        <TouchableOpacity style={styles.row} onPress={toggleAgreement}>
          <Icon name={checkboxIcon} size={20} color="#fff" />
          <Text style={styles.agreeText}>
            LI E CONCORDO COM OS{' '}
            <Text style={styles.termsText}>TERMOS DE USO</Text>
          </Text>
        </TouchableOpacity>
        <Button
          style={[styles.button, { backgroundColor: '#f5a623', marginBottom: 10 }]}
          mode="contained"
          onPress={handleRegister}
          labelStyle={{ color: '#000' }}>
          CADASTRAR
        </Button>
        <View style={styles.rowCenter}>
          <Text style={styles.middleText}>OU CONTINUE COM</Text>
        </View>
        <View style={styles.row}>
          <Button
            style={[styles.socialMediaButton, { marginRight: 8 }]}
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  backIcon: {
    marginRight: 10,
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'left',
    marginBottom: 10,
  },
  input: {
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  halfInput: {
    flex: 1,
    marginRight: 4,
  },
  agreeText: {
    color: '#fff',
    marginLeft: 8,
  },
  termsText: {
    textDecorationLine: 'underline',
    color: '#f5a623',
  },
  button: {
    marginBottom: 8,
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  middleText: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  socialMediaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderColor: '#fff',
    borderWidth: 1,
    paddingHorizontal: 16,
  },
  socialButtonText: {
    color: '#fff',
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
});

export default Register;
