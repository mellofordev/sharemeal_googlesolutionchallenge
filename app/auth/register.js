import {View,Text,StyleSheet,Alert,TextInput, Pressable} from 'react-native';
import { Card, Provider, Appbar, Button, ActivityIndicator} from 'react-native-paper';
import { Link, useRouter } from 'expo-router';
import {getAuth,createUserWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';
import { useEffect, useState } from 'react';
import {app} from '../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { setBackgroundColorAsync } from "expo-navigation-bar";

export default function Register(){

  useEffect(()=>{
    setBackgroundColorAsync("rgba(0, 0, 0, 0.005)");
  });
 
    const router = useRouter();
    const auth = getAuth();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [user,setUser]=useState();
    // useEffect(()=>{
    //   if(app){
    //     onAuthStateChanged(auth,(user)=>{
    //       console.log(user);
    //     })
    //   }
    // },[app])
    const storeToken = async(token) =>{
      try{
        await AsyncStorage.setItem("token",token);
      }catch(err){
        Alert.alert(err);
      }

    }
    const registerAccount = ()=>{

      createUserWithEmailAndPassword(auth,email,password)
      .then(userCredentials=>{
        setUser(userCredentials.user);
        console.log(userCredentials.user.uid);
        storeToken(userCredentials.user.uid);
      })
      .catch(err=>{
        alert(err.message);
      })
    }
    console.log(user);
    return(
        <>
        <StatusBar backgroundColor='transparent'/>
        <Appbar.Header style={{backgroundColor:'white'}}>
            <Appbar.BackAction iconColor='black' onPress={()=>{router.back()}}/>
            <Appbar.Content title="Register"/>
        </Appbar.Header>
        <View style={styles.container}>
              <Text style={styles.header}>Create Your Account</Text>
          
              <TextInput placeholder="email"  onChangeText={email=>setEmail(email)} style={styles.textinput}/>
              <TextInput placeholder="password"  onChangeText={password=>setPassword(password)} secureTextEntry={true}  style={styles.textinput}/>

              <Link href={'/provider'} asChild>
                  <Pressable style={styles.Pressable}><Text style={styles.Text}>Register</Text></Pressable>


              </Link>

        </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom:100
    },
    textinput:{
      backgroundColor: 'transparent',
      margin: 0,
      
      marginBottom:30, backgroundColor:'#F5F8FA',borderRadius: 15, height: 50, width:'90%', padding:15, 
  
    },
    Pressable: {
      backgroundColor: '#fd0136',
      width: '90%',
      padding:5,
      borderRadius:20
    },
    Text: {
      fontSize: 20,
      color: 'white',
      padding: 5,
      textAlign: 'center'
  
    
    },
    header: {
      left: -40,
      margin: 10,
      fontSize: 40,
      fontWeight: 800
    }
  });