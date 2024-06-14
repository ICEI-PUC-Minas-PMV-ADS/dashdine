import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  backIcon: {
    marginLeft: 10,
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 10,
  },
  input: {
    width: '100%',
    marginVertical: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  halfInput: {
    flex: 1,
    marginHorizontal: 5,
  },
  agreeText: {
    marginLeft: 10,
  },
  termsText: {
    color: '#ECA442',
    textDecorationLine: 'underline',
  },
  button: {
    marginTop: 20,
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  middleText: {
    fontSize: 16,
    color: '#888',
  },
  socialMediaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    borderColor: '#ECA442',
    borderWidth: 1,
  },
  icon: {
    marginRight: 10,
  },
  socialButtonText: {
    fontSize: 16,
    color: '#ECA442',
  },
  orderItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
