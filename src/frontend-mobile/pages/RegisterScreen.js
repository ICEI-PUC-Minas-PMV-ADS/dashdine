import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);
  const [successSnackbar, setSuccessSnackbar] = useState(false);

  const handleRegister = async () => {
    if (!nome || !sobrenome || !cpf || !email || !telefone || !senha || !agreed) {
      setErrorSnackbar(true);
      return;
    }

    try {
      const response = await fetch('https://dashdine-1hvj.onrender.com/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: nome,
          sobrenome: sobrenome,
          cpf: cpf,
          email: email,
          telefone: telefone,
          senha: senha,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessSnackbar(true);
        navigation.navigate('Login'); // Redireciona para a tela de login após o registro
      } else {
        setErrorSnackbar(true); // Exibe mensagem de erro se a requisição falhar
        console.error('Erro ao cadastrar:', data.error); // Exibe detalhes do erro no console
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      setErrorSnackbar(true); // Exibe mensagem de erro se ocorrer um erro na requisição
    }
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
          value={nome}
          label="Nome"
          onChangeText={(text) => setNome(text)}
          left={<TextInput.Icon name="account" />}
        />
        <TextInput
          style={styles.input}
          value={sobrenome}
          label="Sobrenome"
          onChangeText={(text) => setSobrenome(text)}
          left={<TextInput.Icon name="account" />}
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
          value={telefone}
          label="Telefone"
          onChangeText={(text) => setTelefone(text)}
          left={<TextInput.Icon name="phone" />}
        />
        <TextInput
          style={styles.input}
          value={senha}
          label="Senha"
          onChangeText={(text) => setSenha(text)}
          secureTextEntry
          left={<TextInput.Icon name="lock" />}
          right={<TextInput.Icon name="eye" />}
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
        Ocorreu um erro ao cadastrar. Verifique seus dados e tente novamente.
      </Snackbar>
      <Snackbar
        visible={successSnackbar}
        onDismiss={() => setSuccessSnackbar(false)}
        duration={3000}
        action={{
          label: 'Fechar',
          onPress: () => setSuccessSnackbar(false),
        }}>
        Cadastro realizado com sucesso! Faça login para continuar.
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
