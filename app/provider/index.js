import { useRouter } from 'expo-router';
import { useState } from 'react';
import {View,Text,StyleSheet} from 'react-native';
import { Appbar, Card, Checkbox, Divider, TextInput } from 'react-native-paper';

export default function Provider(){
    const router = useRouter();
    const [checked,setChecked] = useState(false);
    return(
        <>
        <Appbar.Header>
            <Appbar.Content title="Dashboard"/>
            <Appbar.Action icon={"logout"} onPress={()=>{router.back();}}/>
        </Appbar.Header>
        <View style={styles.container}>
           <Card style={{width:'100%',height:'auto'}}>
                <Card.Cover  source={{uri:'https://lh3.googleusercontent.com/78oT8GROrcU1-CAKTdsCLUzhSnlS8l_YB33qv52wE1kBlqff0A77JYE8vStC1l__TG8hpqW7RniS-PIOL6fJfiEtEfv0OLpwKTmhYc94mSCzEuRApkMv=w1400-v0'}}/>
                <Card.Content >
                    <View style={{marginBottom:10}}>
                        <Text style={{fontSize:25,fontWeight:'650'}}>Updates the status</Text>
                        <Text style={{fontSize:15,fontWeight:'400',color:'grey'}}>Please update the status of the food.</Text>
                        <Divider/>
                    </View>
                    <View>
                        <TextInput style={styles.textbox} placeholder='food'/>
                        <TextInput keyboardType='numeric' placeholder='quatity' />
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:20,marginTop:5}}>Live</Text>
                        <Checkbox onPress={()=>{checked==true?setChecked(false):setChecked(true)}} status={checked==true?'checked':'unchecked'}/>
                    </View>
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
      alignItems: 'center',
      justifyContent: 'center',
      margin:15
    },
    textbox:{
        marginBottom:10
    }
  });