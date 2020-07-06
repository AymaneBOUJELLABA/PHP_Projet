//this is something to test
import React, { useContext, useState, useEffect, StyleSheet } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "./AuthProvider";
import styles from "./style";
import { Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView } from 'react-native';
import { Button, CheckBox, Picker } from 'react-native';
import axios from 'axios';
import { AuthStack } from "./AuthProvider";
import { NavigationContainer } from "@react-navigation/native";
axios.defaults.baseURL = 'http://192.168.1.13:8000';

const Stack = createStackNavigator();

function DashboardScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext)
  const [name, setName] = useState(null);

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

    axios.get('/api/user')
      .then(response => {
        setName(response.data.name);
      })
      .catch(error => {
        console.log(error.response);
      })

  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', marginTop: 60 }}>
      <Text>Bienvenue {name} sur votre platforme de test de covid 19</Text>

      <View style={{ marginTop: 60, flexDirection: "row", justifyContent: "space-between" }}>
        <Button type="outline" title="Fiche d'invistigation" onPress={() => navigation.navigate('Settings')} />

        <Button type="outline" title="Carte géographique" />

      </View>
      <View style={{ marginTop: 200 }}>
        <Button type="outline" title="Logout" onPress={() => logout()} />

      </View>
    </View >
  );
}

function SettingsScreen({ navigation }) {
  const { logout, addInfo, info } = useContext(AuthContext);
  const [isSelected, setSelection] = useState(false);
  const [nom, setNom] = useState('');
  const [prenom, setPreom] = useState('');
  const [age, setAge] = useState('');
  const [adresse, setAdresse] = useState('');
  const [telephone, setTelephone] = useState('');
  const [ville, setVille] = useState('');
  const [selectedSexe, setSelectedSexe] = useState('');
  return (
    <View style={{ flex: 1, marginTop: 30 }}>
      <View style={{ alignItems: 'center', marginBottom: 10 }}>
        <Text style={{ fontSize: 20 }} >Remplir votre information personnel</Text>
      </View>
      <TextInput autoCapitalize='none' onChangeText={text => setNom(text)} placeholder="Nom" placeholderColor="#c4c3cb" style={styles.InfoFormTextInput} />
      <TextInput autoCapitalize='none' onChangeText={text => setPreom(text)} placeholder="Prenom" placeholderColor="#c4c3cb" style={styles.InfoFormTextInput} />
      <TextInput autoCapitalize='none' onChangeText={text => setAge(text)} placeholder="Age" placeholderColor="#c4c3cb" style={styles.InfoFormTextInput} />
      <TextInput autoCapitalize='none' onChangeText={text => setAdresse(text)} placeholder="Adresse" placeholderColor="#c4c3cb" style={styles.InfoFormTextInput} />
      <TextInput autoCapitalize='none' onChangeText={text => setTelephone(text)} placeholder="Telephone" placeholderColor="#c4c3cb" style={styles.InfoFormTextInput} />

      <TextInput autoCapitalize='none' onChangeText={text => setVille(text)} placeholder="Ville" placeholderColor="#c4c3cb" style={styles.InfoFormTextInput} />
      <Picker
        selectedValue={selectedSexe}
        style={{ height: 50, width: 150, marginHorizontal: 30 }}
        onValueChange={(itemValue, itemIndex) => setSelectedSexe(itemValue)}
      >
        <Picker.Item label="femme" value="femme" />
        <Picker.Item label="homme" value="homme" />
      </Picker>
      <Button title="Submit" onPress={() => { addInfo(nom, prenom, age, adresse, telephone, ville, selectedSexe) }} />

      <View style={{ marginTop: 100, flexDirection: "row" }}>
        <Button type="outline" title="Go to Dashboard" onPress={() => navigation.navigate('Dashboard')} />
        <Button type="outline" title="Logout" onPress={() => logout()} />

      </View>
    </View>
  );


}


export const AppStack = () => {


  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  )


}

{/* <View style={{ flex: 1, alignItems: "center", justifyContent: "center", }}>
        <View style={{ flexDirection: "row", marginBottom: 20 }}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={{ alignSelf: "center", }}
          />
          <Text style={{ margin: 8, }} >Do you like React Native?</Text>
        </View>
        <Text>Is CheckBox selected: {isSelected ? "👍" : "👎"}</Text>
      </View> */}