import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: '#F5F5F5',
  },
  withdrawText: {
    fontSize: 18,
    textAlign: 'left',
    marginBottom: 10,
  },
  withdrawContainer: {
    backgroundColor: '#E0E0E0',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dollarSign: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
  },
  amountInput: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    minWidth: 50,
  },
  detailsContainer: {
    backgroundColor: '#E0E0E0',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    color: '#333',
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    backgroundColor: '#E0E0E0',
    padding: 20,
    borderRadius: 10,
  },
});

export default styles;
