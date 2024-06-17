import React, {useMemo} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView} from 'react-native-safe-area-context';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import useUserProfile from './hooks/useUserProfile';
import {useFocusEffect} from '@react-navigation/native';

export type HomeScreenParams = undefined;

export default function HomeScreen() {
  const {
    userProfile,
    transactions,
    error,
    loading,
    refetchUserProfile,
    refetchUserTransactions,
  } = useUserProfile();

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          await refetchUserProfile();
          await refetchUserTransactions();
        } catch (err) {
          console.error('Error refetching data', err);
        }
      };

      fetchData();
    }, [refetchUserProfile, refetchUserTransactions]),
  );

  const memoizedUserProfile = useMemo(() => userProfile, [userProfile]);
  const memoizedTransactionItems = useMemo(() => {
    return transactions?.transactions.map((transaction: any) => (
      <TransactionItem
        key={transaction.uid}
        date={transaction.date}
        status="COMPLETED"
        amount={`$${transaction.amount}`}
      />
    ));
  }, [transactions]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {loading ? (
          <SkeletonPlaceholder>
            <View>
              <View style={styles.header}>
                <View style={styles.userIconContainer}>
                  <View style={styles.skeletonUserIcon} />
                </View>
                <View style={styles.skeletonUserName} />
              </View>
              <View style={styles.skeletonBalanceText} />
              <View style={styles.skeletonBalanceContainer} />
              <View style={styles.skeletonHistoryTitle} />
              <View style={styles.skeletonTransactionContainer}>
                {Array(3)
                  .fill(null)
                  .map((_, index) => (
                    <View key={index} style={styles.skeletonTransactionItem}>
                      <View style={styles.skeletonTransactionLeft}>
                        <View style={styles.skeletonTransactionIcon} />
                        <View>
                          <View style={styles.skeletonTransactionDate} />
                          <View style={styles.skeletonTransactionStatus} />
                        </View>
                      </View>
                      <View style={styles.skeletonTransactionAmount} />
                    </View>
                  ))}
              </View>
            </View>
          </SkeletonPlaceholder>
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <>
            <View style={styles.header}>
              <Text
                style={
                  styles.userName
                }>{`${memoizedUserProfile?.firstname}\n${memoizedUserProfile?.lastname}`}</Text>
              <View style={styles.userIconContainer}>
                <Image
                  style={styles.userIcon}
                  source={{uri: 'https://via.placeholder.com/50'}}
                />
              </View>
            </View>
            <Text style={styles.balanceText}>AVAILABLE BALANCE</Text>
            <View style={styles.balanceContainer}>
              <Text style={styles.amountText}>${transactions?.available}</Text>
            </View>
            <Text style={styles.historyTitle}>TRANSACTION HISTORY</Text>
            <View style={styles.transactionContainer}>
              {memoizedTransactionItems}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function TransactionItem({
  date,
  status,
  amount,
}: {
  date: string;
  status: string;
  amount: string;
}) {
  return (
    <View style={styles.transactionItem}>
      <View style={styles.transactionLeft}>
        <Icon
          name="square"
          size={16}
          color="#000"
          style={styles.transactionIcon}
        />
        <View>
          <Text style={styles.transactionDate}>{date}</Text>
          <Text style={styles.transactionStatus}>{status}</Text>
        </View>
      </View>
      <Text style={styles.transactionAmount}>{amount}</Text>
    </View>
  );
}

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
