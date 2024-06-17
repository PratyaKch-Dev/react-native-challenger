import React, {useMemo} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView} from 'react-native-safe-area-context';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import useUserProfile from './hooks/useUserProfile';
import {useFocusEffect} from '@react-navigation/native';
import styles from './HomeScreen.style';

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
