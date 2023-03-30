import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View,SafeAreaView, ActivityIndicator } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Card, Provider ,TextInput,Text as PaperText, Appbar, Button} from 'react-native-paper';
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
        <Appbar.Content title="Login"/>
      </Appbar.Header>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Card style={{height:'auto',width:'90%'}}>
           
           <Card.Cover source={{uri:'https://lh3.googleusercontent.com/9kq1UNUjO1F86J4xvya2O-4mcUo24djjcqqoNiiL6Gtn59yoIUjWF8qMuUti1xXNbkY0MjZAu5vnSA4Ah0Df0Sbu2p42GVvivnX-yj6jS8uGOOjowMg=w1400-v0'}}/>
          
           <Card.Content style={{margin:5}}>
            
             <TextInput label="username" style={{marginBottom:30}}/>
             <TextInput label="password"/>
           </Card.Content>
           <Card.Actions >
              <Button>Login</Button>
           </Card.Actions>
        </Card>
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

});