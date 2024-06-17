import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import usePasscode from './hooks/usePasscode';
import styles from './PasscodeScreen.style';

export default function PasscodeScreen() {
  const {
    passcode,
    confirmPasscode,
    error,
    isSettingPasscode,
    handlePress,
    resetPasscode,
    forgotPasscode,
    existingPasscode,
  } = usePasscode();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isSettingPasscode ? 'SETTING PASSCODE' : 'ENTER PASSCODE'}
      </Text>
      <View style={styles.pinContainer}>
        {[...Array(6)].map((_, index) => (
          <View
            key={index}
            style={[
              styles.pinDot,
              (isSettingPasscode
                ? passcode.length > index
                : confirmPasscode.length > index) && styles.pinDotFilled,
            ]}
          />
        ))}
      </View>
      <View style={styles.numberPad}>
        <View style={styles.numberRow}>
          {['1', '2', '3'].map(num => (
            <TouchableOpacity
              key={num}
              style={styles.numberButton}
              onPress={() => handlePress(num)}>
              <Text style={styles.numberText}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.numberRow}>
          {['4', '5', '6'].map(num => (
            <TouchableOpacity
              key={num}
              style={styles.numberButton}
              onPress={() => handlePress(num)}>
              <Text style={styles.numberText}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.numberRow}>
          {['7', '8', '9'].map(num => (
            <TouchableOpacity
              key={num}
              style={styles.numberButton}
              onPress={() => handlePress(num)}>
              <Text style={styles.numberText}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.numberRow}>
          <View style={styles.numberEmptyButton} />
          <TouchableOpacity
            style={styles.numberButton}
            onPress={() => handlePress('0')}>
            <Text style={styles.numberText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.numberButton}
            onPress={() => handlePress('clear')}>
            <Text style={styles.numberText}>←</Text>
          </TouchableOpacity>
        </View>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {existingPasscode && !isSettingPasscode && (
        <TouchableOpacity style={styles.forgotButton} onPress={forgotPasscode}>
          <Text style={styles.forgotButtonText}>FORGOT PASSCODE</Text>
        </TouchableOpacity>
      )}
      {!existingPasscode && !isSettingPasscode && (
        <TouchableOpacity style={styles.resetButton} onPress={resetPasscode}>
          <Text style={styles.resetButtonText}>RESET TO SETTING PASSCODE</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
