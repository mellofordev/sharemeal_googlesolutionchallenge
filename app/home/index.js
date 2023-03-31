import {View,StyleSheet,SafeAreaView, ScrollView,TouchableOpacity} from 'react-native';
import { Appbar, Card,Text } from 'react-native-paper';
import MapView,{Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import { useSearchParams } from 'expo-router';
import { useState } from 'react';
import {MAP_API_KEY} from '@env';
import MapViewDirections from 'react-native-maps-directions';

export default function Home(){
    const params = useSearchParams();
    var latitude = parseFloat(params.lat);
    var longitude = parseFloat(params.long);
    const [variantCoords,setCoords] = useState({lat:latitude,long:longitude});
    return(
        <>
        <Appbar.Header>
                <Appbar.Content title="Home"/>
        </Appbar.Header>
        <View style={styles.container}>
            <MapView
                style={{height:'60%',width:'100%'}}
                showsUserLocation={true}
                initialRegion={{latitude:parseFloat(params.lat),longitude:parseFloat(params.long),latitudeDelta: 0.05,longitudeDelta: 0.05}}
                initialCamera={{
                    center: { latitude: variantCoords.lat, longitude:variantCoords.long},
                    pitch: 0,
                    zoom: 12,
                    heading: 0,
                    altitude: 0
                }}
                region={{latitude:parseFloat(params.lat),longitude:parseFloat(params.long),latitudeDelta: 0.05,longitudeDelta: 0.05}}
            >
            {/* <Marker coordinate={{latitude:parseFloat(params.lat),longitude:parseFloat(params.long),latitudeDelta: 0.05,longitudeDelta: 0.05}} title="My location"/> */}
            <Marker coordinate={{latitude:8.509215084876823,longitude:76.95511843323422,latitudeDelta: 0.05,longitudeDelta: 0.05}} title="Poojapora"/>
            
            {variantCoords.lat!=latitude && 
                <MapViewDirections 
                    origin={{latitude:latitude,longitude:longitude}}
                    destination={{latitude:variantCoords.lat,longitude:variantCoords.long}}
                    apikey={MAP_API_KEY}
                    strokeWidth={3}
                    strokeColor="blue"
                />
            }
            </MapView>
            <Card style={{height:'100%',flex:1}}>
                <Card.Title title="Live"/>
                
                <Card.Content>
                    <ScrollView contentContainerStyle={{flexGrow:1}}>
                     {["Ananda Nilayam Orphnage","Nirmala Shishu Bhawan","Sree Chitra Home"].map((i)=>{
                        return(
                           <TouchableOpacity onPress={()=>{
                            setCoords({lat:8.509215084876823,long:76.95511843323422})
                           }}>
                                <Text style={{fontSize:30,fontWeight:'600',margin:10}}>{i}</Text>
                           </TouchableOpacity>
                        );
                     })}
                    </ScrollView>
                </Card.Content>
               
            </Card>
        </View>
        </>
    );
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        
    }
});