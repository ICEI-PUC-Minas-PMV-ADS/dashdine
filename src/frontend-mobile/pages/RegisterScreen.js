import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);

  const handleRegister = () => {
    if (!firstName || !lastName || !password || !cpf || !email || !agreed) {
      setErrorSnackbar(true);
      return;
    }

    // Lógica de registro aqui (simulação)
    const fullName = `${firstName} ${lastName}`;
    console.log('Nome Completo:', fullName);
    console.log('Senha:', password);
    console.log('CPF:', cpf);
    console.log('Email:', email);
    console.log('Telefone:', phone);
    console.log('Concordou com os termos:', agreed);

    // Navega para a tela de acompanhamento de pedidos
    navigation.navigate('OrderTracking');
  };

  const toggleAgreement = () => {
    setAgreed(!agreed);
  };

  const checkboxIcon = agreed ? 'check-square-o' : 'square-o';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>PRIMEIRO ACESSO</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          label="Nome"
          onChangeText={(text) => setFirstName(text)}
          left={<TextInput.Icon name="account" />}
        />
        <TextInput
          style={styles.input}
          value={lastName}
          label="Sobrenome"
          onChangeText={(text) => setLastName(text)}
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
        <TextInput
          style={styles.input}
          value={cpf}
          label="CPF"
          onChangeText={(text) => setCpf(text)}
          left={<TextInput.Icon name="id-card" />}
        />
        <TextInput
          style={styles.input}
          value={email}
          label="E-mail"
          onChangeText={(text) => setEmail(text)}
          left={<TextInput.Icon name="email" />}
        />
        <TextInput
          style={styles.input}
          value={phone}
          label="Telefone"
          onChangeText={(text) => setPhone(text)}
          left={<TextInput.Icon name="phone" />}
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
      <Snackbar
        visible={errorSnackbar}
        onDismiss={() => setErrorSnackbar(false)}
        duration={3000}
        action={{
          label: 'Fechar',
          onPress: () => setErrorSnackbar(false),
        }}>
        Preencha todos os campos obrigatórios e concorde com os termos.
      </Snackbar>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'black',
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
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
