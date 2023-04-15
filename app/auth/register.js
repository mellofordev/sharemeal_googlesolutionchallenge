import {View,Text,StyleSheet,Alert} from 'react-native';
import { Card, Provider ,TextInput, Appbar, Button, ActivityIndicator} from 'react-native-paper';
import { Link, useRouter } from 'expo-router';
import {getAuth,createUserWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';
import { useEffect, useState } from 'react';
import {app} from '../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register(){
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
        <Appbar.Header>
            <Appbar.BackAction iconColor='black' onPress={()=>{router.back()}}/>
            <Appbar.Content title="Register"/>
        </Appbar.Header>
        <View style={styles.container}>
            <Card style={{height:'auto',width:'90%'}}>
            
            <Card.Cover source={{uri:'https://i.ibb.co/4d376Jv/materialu.png'}}/>
          
            <Card.Content style={{margin:5}}>
              <TextInput label="email"  onChangeText={email=>setEmail(email)} style={{marginBottom:20}}/>
              <TextInput label="password"  onChangeText={password=>setPassword(password)} secureTextEntry={true}  style={{marginBottom:20}}/>
            </Card.Content>
            <Card.Actions >
              <Link href={'/provider'} asChild>
                <Button onPress={()=>registerAccount()}>Register</Button>
              </Link>
            </Card.Actions>
        </Card>
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
  });