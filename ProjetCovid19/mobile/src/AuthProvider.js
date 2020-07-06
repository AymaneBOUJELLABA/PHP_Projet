import React, { useState } from 'react';
import { AsyncStorage } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.1.13:8000';

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [id, setId] = useState(null);
  const [info, setInfo] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        info,
        setInfo,
        error,
        addInfo: (nom, prenom, age, adresse, telephone, ville, sexe) => {
          axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
          axios.post('/api/info', {
            nom,
            prenom,
            age,
            adresse,
            telephone,
            ville,
            sexe,
          }).then(response => {
            console.log(response.data);
            setInfo(true);
            console.log(info);
          }).catch(error => {
            const key = Object.keys(error.response.data.errors)[0];
            setError(error.response.data.errors[key][0]);
          })
        },
        register: (name, email, password) => {
          axios.post('/api/user/register', {
            name,
            email,
            password,
            device_name: 'mobile',
          }).then(response => {
            const userResponse = {
              email: response.data.user.email,
              token: response.data.token,
              id: response.data.id,
            }
            setUser(userResponse);
            setError(null);
            SecureStore.setItemAsync('user', JSON.stringify(userResponse));
          }).catch(error => {
            const key = Object.keys(error.response.data.errors)[0];
            setError(error.response.data.errors[key][0]);
          })
        },
        login: (email, password) => {
          axios.post('/api/user/login', {
            email,
            password,
            device_name: 'mobile',
          })
            .then(response => {
              const userResponse = {
                email: response.data.user.email,
                token: response.data.token,
                id: response.data.id,
              }
              setUser(userResponse);
              setError(null);
              SecureStore.setItemAsync('user', JSON.stringify(userResponse));
            })
            .catch(error => {
              const key = Object.keys(error.response.data.errors)[0];
              setError(error.response.data.errors[key][0]);
            })
        },
        logout: () => {
          axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

          axios.post('/api/user/logout')
            .then(response => {
              setUser(null);
              SecureStore.deleteItemAsync('user')
            })
            .catch(error => {
              console.log(error.response);
            })
        }
      }}>
      {children}
    </AuthContext.Provider>
  );
}
