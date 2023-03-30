import {View,StyleSheet,SafeAreaView, ScrollView,TouchableOpacity} from 'react-native';
import { Appbar, Card,Text } from 'react-native-paper';
import MapView,{Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { useSearchParams } from 'expo-router';
export default function Home(){
    const params = useSearchParams();

    return(
        <>
        <Appbar.Header>
                <Appbar.Content title="Home"/>
        </Appbar.Header>
        <View style={styles.container}>
            <MapView
                style={{height:'60%',width:'100%'}}
                initialRegion={{latitude:parseFloat(params.lat),longitude:parseFloat(params.long),latitudeDelta: 0.05,longitudeDelta: 0.05}}
                region={{latitude:parseFloat(params.lat),longitude:parseFloat(params.long),latitudeDelta: 0.05,longitudeDelta: 0.05}}
            >
            <Marker coordinate={{latitude:parseFloat(params.lat),longitude:parseFloat(params.long),latitudeDelta: 0.05,longitudeDelta: 0.05}} title="My location"/>
            <Marker coordinate={{latitude:8.509215084876823,longitude:76.95511843323422,latitudeDelta: 0.05,longitudeDelta: 0.05}} title="Poojapora"/>
            </MapView>
            <Card style={{height:'100%',flex:1}}>
                <Card.Title title="Live"/>
                
                <Card.Content>
                    <ScrollView contentContainerStyle={{flexGrow:1}}>
                     {["Poojapora","Kowdiar","TVM","KOllam","USA","India","Canada"].map((i)=>{
                        return(
                           <TouchableOpacity>
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