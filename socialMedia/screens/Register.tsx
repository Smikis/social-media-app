import React, {useState, useContext} from 'react';

import {View, Text, Pressable, StyleSheet} from 'react-native';

import Svg, {Defs, Rect, LinearGradient, Stop} from 'react-native-svg';
import Icon from 'react-native-vector-icons/Ionicons';

import type {inputError} from '../types/inputError';
import type {Form} from '../types/Form';

import AppContext from '../contexts/AppContext';

import {Input} from '../components/Input';
import Divider from '../components/Divider';
import LoginOption from '../components/LoginOption';

const Background = ({children}: React.PropsWithChildren) => {
  return (
    <View style={{flex: 1}}>
      <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0" stopColor={'#000'} />
            <Stop offset="1" stopColor={'#01c38e'} />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#grad)" />
      </Svg>
      {children}
    </View>
  );
};

const FirstStep = ({
  user,
  setUser,
  error,
}: {
  user: Form;
  setUser: Function;
  error: inputError;
}) => {
  return (
    <>
      <Input
        error={error}
        user={user}
        placeholder="Email"
        onChange={setUser}
        keyboardType="email-address"
        inputType="email"
      />
      <Input
        error={error}
        user={user}
        placeholder="Password"
        onChange={setUser}
        keyboardType="default"
        inputType="password"
        secureTextEntry
      />
    </>
  );
};

const SecondStep = ({
  user,
  error,
  setUser,
}: {
  user: Form;
  error: inputError;
  setUser: Function;
}) => {
  return (
    <>
      <Input
        error={error}
        user={user}
        placeholder="@Tag"
        onChange={setUser}
        keyboardType="default"
        inputType="tag"
      />
    </>
  );
};

const Register = ({navigation}: any) => {
  const [user, setUser] = useState<Form>({
    email: '',
    password: '',
    tag: '',
  });

  const [error, setError] = useState({
    email: '',
    password: '',
    tag: '',
  });

  const [steps, setSteps] = useState(1);

  const ctx = useContext(AppContext);

  if (!ctx) return null;

  const {RegisterWithEmailAndPass} = ctx;

  const clearErrors = () => {
    setError({email: '', password: '', tag: ''});
  };

  const validateEmailAndPass = () => {
    clearErrors();
    let valid = true;
    if (user.email === '') {
      setError(prev => ({...prev, email: 'Email is required'}));
      valid = false;
    }
    if (user.password === '') {
      setError(prev => ({...prev, password: 'Password is required'}));
      valid = false;
    }
    if (!valid) return;
    else setSteps(2);
  };

  const handleSubmit = async () => {
    clearErrors();
    if (!user.tag) {
      setError(prev => ({...prev, tag: 'Tag is required'}));
      return;
    }
    try {
      const res = await RegisterWithEmailAndPass(user);
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <Background>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}>
        <Text
          style={{
            color: '#FFF',
            textAlign: 'left',
            width: '100%',
            paddingHorizontal: 25,
            fontSize: 35,
            fontWeight: 'bold',
          }}>
          Sign Up
        </Text>
        <View
          style={{
            width: '95%',
            paddingHorizontal: 15,
            paddingVertical: 20,
            marginTop: 20,
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: 10,
            justifyContent: 'center',
          }}>
          {steps === 1 ? (
            <FirstStep user={user} setUser={setUser} error={error} />
          ) : (
            <SecondStep user={user} error={error} setUser={setUser} />
          )}
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: steps === 2 ? 'space-between' : 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            {steps === 2 ? (
              <>
                <View
                  style={{
                    backgroundColor: '#01c38e',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 100,
                    elevation: 5,
                  }}>
                  <Icon
                    name="arrow-back"
                    color="#000"
                    size={20}
                    style={{
                      padding: 16,
                    }}
                    onPress={() => setSteps(1)}
                  />
                </View>
                <Pressable
                  onPress={handleSubmit}
                  style={{
                    backgroundColor: '#01c38e',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '60%',
                    marginLeft: 10,
                    borderRadius: 7,
                    elevation: 5,
                  }}>
                  <Text
                    style={{
                      color: '#FFF',
                      padding: 15,
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}>
                    Register
                  </Text>
                </Pressable>
              </>
            ) : (
              <Pressable
                onPress={validateEmailAndPass}
                style={{
                  backgroundColor: '#01c38e',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  borderRadius: 7,
                  elevation: 5,
                }}>
                <Text
                  style={{
                    color: '#FFF',
                    padding: 15,
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  Next
                </Text>
              </Pressable>
            )}
          </View>
          <Divider />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <LoginOption
              name="md-logo-facebook"
              color="#000"
              size={30}
              text="Facebook"
            />
            <LoginOption
              name="md-logo-google"
              color="#000"
              size={30}
              text="Google"
            />
            <LoginOption
              name="md-logo-twitter"
              color="#000"
              size={30}
              text="Twitter"
            />
          </View>
          <Divider />
          <Text style={{color: '#FFF', fontSize: 17}}>
            Already have an account?{' '}
            <Text
              onPress={() => navigation.navigate('Login')}
              style={{textDecorationLine: 'underline'}}>
              Sign In
            </Text>
          </Text>
        </View>
      </View>
    </Background>
  );
};

export default Register;
