import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import usePasscode from './hooks/usePasscode';

export default function PasscodeScreen() {
  const {
    passcode,
    confirmPasscode,
    error,
    isSettingPasscode,
    handlePress,
    resetPasscode,
  } = usePasscode();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isSettingPasscode ? 'SETTING PASSCODE' : 'CONFIRM PASSCODE'}
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
      {!isSettingPasscode && (
        <TouchableOpacity style={styles.resetButton} onPress={resetPasscode}>
          <Text style={styles.resetButtonText}>RESET TO SETTING PASSCODE</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

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
});
