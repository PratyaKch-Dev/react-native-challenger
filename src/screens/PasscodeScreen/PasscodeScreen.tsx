import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function PasscodeScreen() {
  const [pin, setPin] = useState('');

  const handlePress = (value: string) => {
    if (value === 'clear') {
      setPin(pin.slice(0, -1));
    } else {
      if (pin.length < 6) {
        setPin(pin + value);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SETTING PIN</Text>
      <View style={styles.pinContainer}>
        {[...Array(6)].map((_, index) => (
          <View
            key={index}
            style={[styles.pinDot, pin.length > index && styles.pinDotFilled]}
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
});
