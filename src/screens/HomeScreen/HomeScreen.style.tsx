import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  userName: {
    marginRight: 10,
    fontSize: 16,
    textAlign: 'right',
  },
  userIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userIcon: {
    width: '100%',
    height: '100%',
  },
  balanceContainer: {
    backgroundColor: '#D3D3D3',
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  balanceText: {
    fontSize: 18,
    marginBottom: 10,
  },
  amountText: {
    fontSize: 36,
  },
  historyTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  transactionContainer: {
    backgroundColor: '#D3D3D3',
    padding: 20,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionIcon: {
    marginRight: 10,
  },
  transactionDate: {
    fontSize: 16,
  },
  transactionStatus: {
    fontSize: 14,
    color: 'gray',
  },
  transactionAmount: {
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  skeletonUserIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0E0E0',
  },
  skeletonUserName: {
    width: 100,
    height: 20,
    backgroundColor: '#E0E0E0',
    marginLeft: 10,
  },
  skeletonBalanceText: {
    width: 150,
    height: 20,
    backgroundColor: '#E0E0E0',
    alignSelf: 'center',
    marginBottom: 10,
  },
  skeletonBalanceContainer: {
    width: '100%',
    height: 80,
    backgroundColor: '#E0E0E0',
    alignSelf: 'center',
    marginBottom: 20,
  },
  skeletonHistoryTitle: {
    width: 200,
    height: 20,
    backgroundColor: '#E0E0E0',
    alignSelf: 'center',
    marginBottom: 10,
  },
  skeletonTransactionContainer: {
    width: '100%',
  },
  skeletonTransactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  skeletonTransactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skeletonTransactionIcon: {
    width: 16,
    height: 16,
    backgroundColor: '#E0E0E0',
    marginRight: 10,
  },
  skeletonTransactionDate: {
    width: 80,
    height: 20,
    backgroundColor: '#E0E0E0',
    marginBottom: 5,
  },
  skeletonTransactionStatus: {
    width: 60,
    height: 15,
    backgroundColor: '#E0E0E0',
  },
  skeletonTransactionAmount: {
    width: 50,
    height: 20,
    backgroundColor: '#E0E0E0',
  },
});

export default styles;
