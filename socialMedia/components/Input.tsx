import React from 'react';
import {KeyboardTypeOptions, TextInput} from 'react-native';

import type {Form} from '../types/Form';
import type {inputError} from '../types/inputError';

type Props = {
  error: inputError;
  user: Form;
  placeholder: string;
  onChange: Function;
  keyboardType: KeyboardTypeOptions;
  inputType: 'email' | 'password' | 'tag';
  secureTextEntry?: boolean;
};

export const Input = ({
  error,
  user,
  placeholder,
  onChange,
  keyboardType,
  inputType,
  secureTextEntry,
}: Props) => {
  return (
    <TextInput
      style={{
        backgroundColor: '#FFF',
        color: '#000',
        fontSize: 20,
        borderRadius: 7,
        padding: 15,
        marginBottom: 10,
        borderColor: error[inputType] ? 'red' : 'transparent',
        borderWidth: 1,
        elevation: 5,
      }}
      placeholderTextColor="#ccc"
      keyboardType={keyboardType}
      placeholder={placeholder}
      value={user[inputType]}
      secureTextEntry={secureTextEntry}
      onChangeText={text =>
        onChange((prev: Form) => ({...prev, [inputType]: text}))
      }
    />
  );
};

export default Input;
