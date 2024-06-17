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
import styles from './WithDrawScreen.style';

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
