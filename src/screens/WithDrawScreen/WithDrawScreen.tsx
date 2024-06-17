import React, {useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import useWithdraw from './hooks/useWithdraw';

export type WithDrawScreenParams = undefined;

export default function WithDrawScreen() {
  const {amount, setAmount, loading, handleWithdraw, formatAmount} =
    useWithdraw();

  const onAmountChange = useCallback(
    (value: string) => {
      setAmount(formatAmount(value));
    },
    [setAmount, formatAmount],
  );

  const onWithdraw = useCallback(() => {
    handleWithdraw();
  }, [handleWithdraw]);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.withdrawText}>AMOUNT FOR WITHDRAWAL</Text>
        <View style={styles.withdrawContainer}>
          <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.dollarSign}>$</Text>
            <TextInput
              style={styles.amountInput}
              keyboardType="numeric"
              placeholder="Enter amount"
              placeholderTextColor="#888"
              value={amount}
              onChangeText={onAmountChange}
              editable={!loading}
            />
          </ScrollView>
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
          <Button title="WITHDRAW" onPress={onWithdraw} disabled={loading} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
