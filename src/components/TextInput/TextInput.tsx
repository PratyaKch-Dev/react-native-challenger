import React, {useMemo, useCallback, useState} from 'react'
import {
  View,
  Keyboard,
  TextInput as TextInputForm,
  TouchableOpacity,
} from 'react-native'
import styles from './TextInput.style'
import Image from 'components/Image'

type TextInputProps = {
  value: string
  placeholder: string
  onChangeText: (value: string) => void
  isPassword?: boolean
}

export default function TextInput({
  value,
  placeholder,
  onChangeText,
  isPassword = false,
}: TextInputProps) {
  const [displayPassword, setDisplayPassword] = useState<boolean>(isPassword)

  const handleDisplayPassword = useCallback(() => {
    setDisplayPassword(!displayPassword)
  }, [displayPassword])

  return (
    <>
      <View style={styles.inputContainer}>
        <TextInputForm
          secureTextEntry={displayPassword ? true : false}
          style={styles.textArea}
          placeholder={placeholder}
          onChangeText={data => onChangeText(data)}
          maxLength={50}
          textAlignVertical="top"
          value={value}
          scrollEnabled={false}
          blurOnSubmit
          returnKeyType="done"
          onSubmitEditing={() => Keyboard.dismiss()}
        />
        {isPassword && (
          <>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => handleDisplayPassword()}>
              <Image
                source={
                  displayPassword
                    ? require('./images/EyeSlash.png')
                    : require('./images/Eye.png')
                }
                style={styles.image}
              />
            </TouchableOpacity>
          </>
        )}
      </View>
    </>
  )
}
