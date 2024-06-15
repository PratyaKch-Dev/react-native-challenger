import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

export type WithDrawScreenParams = undefined;

export default function WithDrawScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.withdrawText}>AMOUNT FOR WITHDRAWAL</Text>
      <View style={styles.withdrawContainer}>
        <Text style={styles.amountText}>$100</Text>
      </View>
      <Text style={styles.withdrawText}>TRANSFER TO</Text>
      <View style={styles.detailsContainer}>
        <DetailItem label="NAME" value="JOHN DOE" />
        <DetailItem label="COMPANY" value="SALARY LTD" />
        <DetailItem label="BANK" value="BOT" />
        <DetailItem label="BANK ACCOUNT" value="XXX5672231" />
      </View>
      <View style={styles.detailsContainer}>
        <DetailItem label="FEE" value="-$5" />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="WITHDRAW" onPress={() => {}} />
      </View>
    </View>
  );
}

function DetailItem({label, value}: {label: string; value: string}) {
  return (
    <View style={styles.detailItem}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  withdrawContainer: {
    backgroundColor: '#E0E0E0',
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  withdrawText: {
    fontSize: 18,
    textAlign: 'left',
    marginBottom: 10,
  },
  amountText: {
    fontSize: 36,
    fontWeight: 'bold',
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
