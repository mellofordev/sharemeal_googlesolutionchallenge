import { useState } from 'react';
import {View,Text,StyleSheet} from 'react-native';
import { Appbar,Card,TextInput,Divider,Button} from 'react-native-paper';
import { useSearchParams } from 'expo-router';

export default function Default (){
    const [checked,setChecked]=useState(false);
    const [request,setRequest] = useState('Request');
    const params = useSearchParams();

    return(
        <>
        <Appbar.Header>
            <Appbar.BackAction actio />
            <Appbar.Content title={params.item_name}/>
            
        </Appbar.Header>
        <View style={styles.container}>
           <Card style={{width:'100%',height:'auto'}}>
                <Card.Cover  source={{uri:'https://lh3.googleusercontent.com/78oT8GROrcU1-CAKTdsCLUzhSnlS8l_YB33qv52wE1kBlqff0A77JYE8vStC1l__TG8hpqW7RniS-PIOL6fJfiEtEfv0OLpwKTmhYc94mSCzEuRApkMv=w1400-v0'}}/>
                
            </Card>
            <Text style={{fontSize:18,margin:15}}>{params.add}</Text>
            <Divider/>
            <Text style={{fontSize:30,textAlign:'center',margin:5}}>Available foods</Text>
            <Card>
                <Card.Content>
                    <Text style={{fontSize:25,marginBottom:15}}><Text style={{color:'grey'}}>Food :</Text>Briyani</Text>
                    <Text style={{fontSize:25}}><Text style={{color:'grey'}}>Content :</Text>500 ml</Text>
                    <Button onPress={()=>{setRequest('Requested')}}>{request}</Button>
                </Card.Content>
                
            </Card>
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      margin:15
    },
    textbox:{
        marginBottom:10
    }
  });