import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView} from 'react-native-safe-area-context';

export type HomeScreenParams = undefined;

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.userName}>John Doe</Text>
          <View style={styles.userIconContainer}>
            <Image
              style={styles.userIcon}
              source={{uri: 'https://via.placeholder.com/50'}}
            />
          </View>
        </View>
        <Text style={styles.balanceText}>AVAILABLE BALANCE</Text>
        <View style={styles.balanceContainer}>
          <Text style={styles.amountText}>$300</Text>
        </View>
        <Text style={styles.historyTitle}>TRANSACTION HISTORY</Text>
        <View style={styles.transactionContainer}>
          <TransactionItem
            date="15 FEB 2023"
            status="COMPLETED"
            amount="$100"
          />
          <TransactionItem
            date="15 FEB 2023"
            status="COMPLETED"
            amount="$100"
          />
          <TransactionItem
            date="15 FEB 2023"
            status="COMPLETED"
            amount="$100"
          />
        </View>
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
});
