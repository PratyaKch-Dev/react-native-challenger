import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  pinDot: {
    width: 15,
    height: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#333',
    marginHorizontal: 10,
  },
  pinDotFilled: {
    backgroundColor: '#333',
  },
  numberPad: {
    alignItems: 'center',
  },
  numberRow: {
    flexDirection: 'row',
  },
  numberEmptyButton: {
    width: 60,
    height: 60,
    margin: 10,
  },
  numberButton: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 30,
  },
  numberText: {
    fontSize: 24,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  resetButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#A9A9A9',
    borderRadius: 5,
  },
  resetButtonText: {
    color: '#FFF',
    fontSize: 18,
  },
  forgotButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#A9A9A9',
    borderRadius: 5,
  },
  forgotButtonText: {
    color: '#FFF',
    fontSize: 18,
  },
});

export default styles;
