import React, {useState, useContext} from 'react';

import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import Svg, {Defs, Rect, LinearGradient, Stop} from 'react-native-svg';

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

const Login = ({navigation}: any) => {
  const ctx = useContext(AppContext);

  if (!ctx) return null;

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const {loginWithEmailAndPass} = ctx;

  const clearErrors = () => {
    setError({email: '', password: ''});
  };

  const handleSubmit = async () => {
    clearErrors();
    if (user.email === '') {
      setError(prev => ({...prev, email: 'Email is required'}));
      return;
    }
    if (user.password === '') {
      setError(prev => ({...prev, password: 'Password is required'}));
      return;
    }

    try {
      setLoading(true);
      const res = await loginWithEmailAndPass(user.email, user.password);
      setLoading(false);
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
          Welcome Back!
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
            secureTextEntry
            inputType="password"
          />
          <Pressable
            onPress={handleSubmit}
            style={{
              backgroundColor: '#01c38e',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              borderRadius: 7,
              elevation: 5,
              marginTop: 10,
            }}>
            {loading ? (
              <ActivityIndicator style={{padding: 15}} color="#fff" size={25} />
            ) : (
              <Text
                style={{
                  color: '#FFF',
                  padding: 15,
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                Log In
              </Text>
            )}
          </Pressable>
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
            Don't have an account?{' '}
            <Text
              onPress={() => navigation.navigate('Register')}
              style={{textDecorationLine: 'underline'}}>
              Sign Up
            </Text>
          </Text>
          <Text
            style={{
              color: '#FFF',
              fontSize: 17,
              textDecorationLine: 'underline',
            }}>
            Forgot password?
          </Text>
        </View>
      </View>
    </Background>
  );
};

export default Login;
