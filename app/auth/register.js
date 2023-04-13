import {View,Text,StyleSheet} from 'react-native';
import { Card, Provider ,TextInput, Appbar, Button, ActivityIndicator} from 'react-native-paper';
import { Link, useRouter } from 'expo-router';
import {getAuth,createUserWithEmailAndPassword} from 'firebase/auth';
import { useEffect, useState } from 'react';

export default function Register(){
    const router = useRouter();
    const auth = getAuth();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [user,setUser]=useState();
    const registerAccount = ()=>{
      createUserWithEmailAndPassword(auth,email,password)
      .then(userCredentials=>{
        setUser(userCredentials.user);
  
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
              <TextInput label="email" value={email} onChangeText={(email)=>setEmail(email)} style={{marginBottom:20}}/>
              <TextInput label="password" value={password} onChangeText={(password)=>setPassword(password)} secureTextEntry={true}  style={{marginBottom:20}}/>
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