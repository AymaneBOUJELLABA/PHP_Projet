
import React, { useContext, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "./AuthProvider";
import { Button, Text, View, TextInput } from "react-native";
import { Keyboard, TouchableWithoutFeedback, Alert, KeyboardAvoidingView } from 'react-native';
//import { ButtonIndex } from "./components/Button";
import styles from "./style";
const Stack = createStackNavigator();

function LoginScreen({ navigation }) {
  const { login, error } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  return (

    <View style={styles.loginScreenContainer}>
      <View style={styles.loginFormView}>
        <Text style={styles.logoText}>Covid19 Test</Text>
        {error &&
          <Text style={{ color: 'red', marginBottom: 24, marginLeft: 100 }}>{error}</Text>
        }
        <TextInput textContentType="emailAddress" autoCapitalize='none' onChangeText={text => setEmail(text)} placeholder="Email" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} />
        <TextInput onChangeText={text => setPassword(text)} placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
        <Button
          buttonStyle={styles.loginButton}
          title="Login"
          onPress={() => login(email, password)}
        />
        <Button
          buttonStyle={styles.loginButton}
          title="Go to Register"
          onPress={() => navigation.navigate('Register')}
          color="#3897f1"
        />
      </View>
    </View>


  );

}

function RegisterScreen({ navigation }) {
  const { register, error } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  return (
    <View style={styles.loginScreenContainer}>
      <View style={styles.loginFormView}>
        <Text style={styles.logoText}>Covid19 Test</Text>
        {error &&
          <Text style={{ color: 'red', marginBottom: 24, marginLeft: 100 }}>{error}</Text>
        }
        <TextInput autoCapitalize='none' placeholder="Name" onChangeText={text => setName(text)} placeholderColor="#c4c3cb" style={styles.loginFormTextInput} />
        <TextInput textContentType="emailAddress" autoCapitalize='none' onChangeText={text => setEmail(text)} placeholder="Email" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} />
        <TextInput onChangeText={text => setPassword(text)} placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
        <Button
          buttonStyle={styles.loginButton}
          title="Register"
          onPress={() => register(name, email, password)}
        />
        <Button type="outline" title="Go to Login" onPress={() => navigation.navigate('Login')} />

      </View>
    </View>

  );
}

export const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  )
}
