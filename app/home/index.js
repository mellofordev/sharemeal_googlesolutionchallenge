import {View,StyleSheet,SafeAreaView, ScrollView,TouchableOpacity,Image} from 'react-native';
import { ActivityIndicator, Appbar, Card,Divider,Text } from 'react-native-paper';
import MapView,{Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { useSearchParams,Link } from 'expo-router';
import { useEffect, useState } from 'react';
import {MAP_API_KEY} from '@env';
import MapViewDirections from 'react-native-maps-directions';
import {Ionicons} from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setBackgroundColorAsync } from "expo-navigation-bar";

export default function Home(){
    useEffect(()=>{
        setBackgroundColorAsync("rgba(0, 0, 0, 0.005)");
    });
    const params = useSearchParams();
    var latitude = parseFloat(params.lat);
    var longitude = parseFloat(params.long);
    var item_length=0;
    const [variantCoords,setCoords] = useState({lat:latitude,long:longitude});
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(true);
    const [name , setName] = useState('');
    const [token,setToken] = useState('');
    const auth = getAuth();
    const apifetch=()=>{
        setLoading(true)
        fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=auditorium&location=${latitude}%2C${longitude}&radius=2000&type=auditorium&key=${MAP_API_KEY}`)
        .then(response=>response.json())
        .then(data=>{
            
            setData(data.results);
            item_length=(data.results).length;
        })
        .catch(err=>console.log(err));
    }
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
        apifetch();
        getToken();
        //console.log(auth.getUser(token));
        setLoading(false);
    },[])
    return(
        <>

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
            <Marker coordinate={{latitude:variantCoords.lat,longitude:variantCoords.long,latitudeDelta: 0.05,longitudeDelta: 0.05}} title={name}/>
            
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
                    <ScrollView contentContainerStyle={{flexGrow:1,paddingBottom:30}} showsVerticalScrollIndicator={false}>
                       
                     {
                     loading==true ? <ActivityIndicator color='black' size={34}/>
                     :( 
                     data.map((i)=>{
                        
                        return(
                           <TouchableOpacity onPress={()=>{
                            setCoords({lat:i.geometry.location.lat,long:i.geometry.location.lng});
                           }}>
                               <View style={styles.placeContianer}>
                                  <View style={styles.placeDetials}>
                                    <Text style={{fontSize:20,fontWeight:'600',margin:10}}>{(i.name).slice(0,20)+'...'}</Text>
                                    <Text style={{fontSize:15,fontWeight:'500',color:'grey',marginLeft:13}}>{(i.vicinity).slice(0,10)+'...'}</Text>
                                  </View>
                                  {/* <Image source={{uri:`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${(i.photos)}&key=${MAP_API_KEY}`}}
                                         style={{height:100,width:100,borderRadius:15,marginTop:5}}
                                  /> */}
                                <Link href={{pathname:'/details',params:{item_name:i.name,lat:variantCoords.lat,long:variantCoords.long,add:i.vicinity}}} asChild>
                                    <TouchableOpacity  style={{backgroundColor:'#0096FF',height:50,width:50,borderRadius:15,marginTop:5,justifyContent:'center',alignItems:'center'}}>
                                        <Ionicons name='navigate'  size={15} color={'white'}/>
                                    </TouchableOpacity>
                                </Link>

                               </View>
                               <Divider/>
                           </TouchableOpacity>
                        );
                     })
                     )}
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

    },
    placeContianer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:15,
        padding:3
    },
    placeDetials:{
        flexDirection:'column'
    }
});