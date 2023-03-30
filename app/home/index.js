import {View,Text,StyleSheet,SafeAreaView} from 'react-native';
import { Appbar } from 'react-native-paper';
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
                style={{height:'100%',width:'100%'}}
                initialRegion={{latitude:parseFloat(params.lat),longitude:parseFloat(params.long),latitudeDelta: 0.05,longitudeDelta: 0.05}}
                region={{latitude:parseFloat(params.lat),longitude:parseFloat(params.long),latitudeDelta: 0.05,longitudeDelta: 0.05}}
            >
            <Marker coordinate={{latitude:parseFloat(params.lat),longitude:parseFloat(params.long),latitudeDelta: 0.05,longitudeDelta: 0.05}} title="Marker"/>
            </MapView>
        </View>
        </>
    );
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        
    }
});