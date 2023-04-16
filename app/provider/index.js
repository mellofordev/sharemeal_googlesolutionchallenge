import { useRouter } from 'expo-router';
import { useState } from 'react';
import {View,Text,StyleSheet, TextInput} from 'react-native';
import { Appbar, Card, Checkbox, Divider,Button,Chip } from 'react-native-paper';

export default function Provider(){
    const router = useRouter();
    const [checked,setChecked] = useState(false);
    const [selected,setSelected] = useState('i');
    return(
        <>

        <View style={styles.container}>
           <Text style={{fontSize: 45, marginTop: -300, margin: 5, fontWeight: 700}}>Donate Food</Text>
           <Card style={{width:'100%',height:'auto', backgroundColor: 'white'}}>
                <Card.Content >
                    <View style={{marginBottom:10}}>
                        <Text style={{fontSize:25,fontWeight:'650'}}>Updates the status</Text>
                        <Text style={{fontSize:15,fontWeight:'400',color:'grey'}}>Please update the status of the food.</Text>
                    </View>
                    <View>
                        <TextInput style={styles.textinput} placeholder='food'/>
                        <TextInput style={styles.textinput} placeholder='quatity' />
                    </View>
                    <View style={{flexDirection:'column',height:100,margin:5}}>
                        <Text style={{fontSize:18}}>Enter the mode :</Text>
                        <Chip onPress={()=>{setSelected('i')}} mode={selected=='i' ? 'flat' :'outlined'} style={{marginBottom:10}}>individual</Chip>
                        <Chip onPress={()=>{setSelected('p')}} mode={selected=='p' ? 'flat' :'outlined'}>institutional</Chip>
                    </View>
                </Card.Content>
                <Button>Submit</Button>
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

    textinput:{
        backgroundColor: 'transparent',
        
        marginBottom:10, backgroundColor:'#F5F8FA',borderRadius: 15, height: 50, width:'100%', padding:15, 
    
      }
  });