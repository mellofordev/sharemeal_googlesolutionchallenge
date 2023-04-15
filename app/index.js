import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, View, TextInput, Pressable, Text, Image} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Card, Provider , ActivityIndicator} from 'react-native-paper';
import { Link , useRouter} from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAuth} from 'firebase/auth';
export default function App() {
  const [location,setLocation] = useState({});
  const [loading,setLoading] = useState(true);
  const [token ,setToken] = useState('');
  const router = useRouter();
  const auth = getAuth();
  const getToken = async ()=>{
    const item = await AsyncStorage.getItem("token");
    try{
      if(item!=null){
        setToken(item);

      }
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    const locationRequest = async()=>{
      let {status} =await Location.requestForegroundPermissionsAsync();
  
      if(status!=="granted"){
        Alert.alert("We need your location access to function the app");
        setLoading(false);
        return;
      }
      getToken();
      var location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLoading(false);

    }
    locationRequest();
  },[loading]);
  const login = async()=>{
    getToken();
    router.push({pathname:'/home',params:{lat:location["coords"]["latitude"],long:location["coords"]["longitude"]}});
  }
  let userlocation = JSON.stringify(location);
  console.log(location);

  return (
    <Provider>

      <View style={styles.container}>
        <StatusBar style="auto" />
        {loading==true ? <ActivityIndicator size={24} color={'black'}/> :(
         token=='' ? 
           
            <>
               <Image source={require('./img/logo.png')} style={styles.logo}/>

 
              <TextInput placeholder='username'  style={styles.textinput} />
              <TextInput placeholder='password' style={styles.textinput} secureTextEntry={true}/>

              <Link href={{pathname:'/home',params:{lat:location["coords"]["latitude"],long:location["coords"]["longitude"]}}} asChild>
                 <Pressable style={styles.Pressable}><Text style={styles.Text}>LOGIN</Text></Pressable>
              </Link>
              <View style={styles.footer}>
                <Text>If you are not registered, </Text>
                <Link href='#'>
                  <Text style={styles.link}>Register</Text>
                </Link>
              </View>
            </>:(
        router.push({pathname:'/home',params:{lat:location["coords"]["latitude"],long:location["coords"]["longitude"]}})
      )
       )}
      </View>
    </Provider>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:100,
    
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
  logo: {
    width: '100%',
    height: '25%',
    marginBottom: 15
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 30
  },
  link: {
    color: '#fd0136'
  }


});