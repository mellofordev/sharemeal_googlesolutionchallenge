import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, View,Text } from 'react-native';

import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Card, Provider ,TextInput, Appbar, Button, ActivityIndicator} from 'react-native-paper';
import { Link } from 'expo-router';
export default function App() {
  const [location,setLocation] = useState();
  const [loading,setLoading] = useState(true);
  
  useEffect(()=>{
    const locationRequest = async()=>{
      let {status} =await Location.requestForegroundPermissionsAsync();
  
      if(status!=="granted"){
        Alert.alert("We need your location access to function the app");
        setLoading(false);
        return;
      }
      var location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLoading(false);
    }
    locationRequest();
  },[loading]);
  let userlocation = JSON.stringify(location);
  console.log(location);
  return (
    <Provider>
      <Appbar.Header>
        <Appbar.Content title="sharemeal"/>
      </Appbar.Header>
      <View style={styles.container}>
        <StatusBar style="auto" />
        {loading==true ? <ActivityIndicator size={24} color={'black'}/> :(
            <>
              <Card style={{height:'auto',width:'90%'}}>
            
              <Card.Cover source={{uri:'https://i.ibb.co/4d376Jv/materialu.png'}}/>
            
              <Card.Content style={{margin:5}}>
              
                <TextInput label="username" style={{marginBottom:30}}/>
                <TextInput label="password"/>
              </Card.Content>
              <Card.Actions >
                <Link href={{pathname:'/home',params:{lat:location["coords"]["latitude"],long:location["coords"]["longitude"]}}} asChild>
                  <Button>Login</Button>
                </Link>
              </Card.Actions>
          </Card>

          <View style={styles.auth}>
            <Text style={styles.text}>Create new account :</Text>
            <Link style={{marginTop:5}} href={'/auth/register'}>
                <Button><Text style={styles.text}>Register</Text></Button>
            </Link>
          </View>
        </>
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
    marginBottom:100
  },
  auth:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  text:{
    fontSize:20,
    marginTop:10
  }
});