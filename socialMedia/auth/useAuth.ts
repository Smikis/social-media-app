import { useEffect, useState }  from 'react'
import type { User } from '../types/User';
import type { Form } from '../types/Form';

import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.0.153:3000/auth';

export const saveUser = async (user: User) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user));
  } catch (e: any){
    console.log(e);
  }
}

export const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    if (user !== null) {
      return JSON.parse(user);
    }
  } catch (e: any){
    console.log(e);
  }
}

export const removeUser = async () => {
  try {
    await AsyncStorage.removeItem('user');
  } catch (e: any){
    console.log(e);
  }
}

export const useAuth = () => {
    const [user, setUser] = useState({} as User);

    const RegisterWithEmailAndPass = async (user: Form) => {
        const response = await fetch(`${API_URL}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        })

        if (response.status === 201) {
          const data: User = await response.json();
          setUser(data);
          saveUser(data);
        } else {
            const data = await response.json();
            return data;
        }
    };

    const loginWithEmailAndPass = async (email: string, password: string) => {
        console.log(email, password);
        const response = await fetch(`${API_URL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email, password}),
        })

        if (response.status === 200) {
            const data: User = await response.json();
            console.log(data);
            setUser(data);
            saveUser(data);
        } else {
            const data = await response.json();
            console.log(data);
            return data;
        }
    };

    const logout = () => {
      setUser({} as User);
      removeUser();
    }

    useEffect(() => {
      getUser().then(User => {
        if (User) {
          setUser(User);
        }
      })
    });

    return {
        user,
        RegisterWithEmailAndPass,
        loginWithEmailAndPass,
        logout
    }
    
}