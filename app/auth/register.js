import {View,Text,StyleSheet,Alert,TextInput, Pressable,TouchableOpacity} from 'react-native';
import { Card, Provider, Appbar, Button, ActivityIndicator,Chip} from 'react-native-paper';
import { Link, useRouter } from 'expo-router';
import {getAuth,createUserWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';
import { useEffect, useState } from 'react';
import {app} from '../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { setBackgroundColorAsync } from "expo-navigation-bar";
import * as DocumentPicker from 'expo-document-picker';
import { useSearchParams } from 'expo-router';

export default function Register(){
  const params = useSearchParams();
  useEffect(()=>{
    setBackgroundColorAsync("rgba(0, 0, 0, 0.005)");
  });
 
    const router = useRouter();
    const auth = getAuth();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [user,setUser]=useState("");
    const [select,setSelect] = useState('ngo');
    const [uploadFile,setUploadFile] = useState('not');
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
    const upload = ()  =>{
     DocumentPicker.getDocumentAsync({type:'image/*'})
     .then(item =>{
        setUploadFile(item.type);
     }).catch(err=>{
      console.log(err);
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
              <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',marginBottom:10}}>
                <Text style={{fontSize:18,margin:6}}>Select the type:</Text>
                <Chip icon={"information"} mode={select=='ngo' ?'outlined' : 'flat'} onPress={()=>{setSelect('provider')}} style={{margin:5}}>provider</Chip>
                <Chip icon={"information"} mode={select!='provider' ?'flat' : 'outlined'} onPress={()=>{setSelect('ngo')}}  style={{margin:5}}>NGO</Chip>
              </View>
              {select=='ngo' && 
                <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',width:'100%'}}>
                    <TouchableOpacity onPress={()=>{upload();}} style={[styles.textinput,styles.upload]}>
                      <Text>{uploadFile=='success' ? 'File uploaded' : 'upload verification'}</Text>
                    </TouchableOpacity>
                </View>
              }
              <Pressable onPress={()=>{
                registerAccount();
                if(select=='ngo'){
                  router.push({pathname:'/home',params:params})
                }else{
                  router.push('/provider')
                }
              }} style={styles.Pressable}><Text style={styles.Text}>Register</Text></Pressable>
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
      margin: 10,
      fontSize: 40,
      fontWeight: 800,
    },
    upload:{
      flexDirection:'row',
      justifyContent:'space-around',
      alignItems:'flex-start'
    }
  });