import { useState } from 'react';
import {View,Text,StyleSheet, Image,TouchableOpacity} from 'react-native';
import { Appbar,Card,TextInput,Divider,Button} from 'react-native-paper';
import { useRouter, useSearchParams } from 'expo-router';

export default function Default (){
    
    const params = useSearchParams();
    const router = useRouter();
    return(
        <>
        <Appbar.Header style={{backgroundColor: 'white'}}>
            <Appbar.BackAction onPress={()=>router.back()} />
            <Appbar.Content title={params.item_name}/>
            
        </Appbar.Header>
        <View style={styles.container}>

            <Text style={{fontSize:12,margin:15, marginTop: 5}}>Address: {params.add}</Text>
            <Divider/>
            <Text style={{fontSize:30,textAlign:'center',margin:5, marginBottom: 15}}>Available foods</Text>
            <Card style={styles.qfix}>
                <Card.Content style={styles.card}>
                    <View>
                    <Text style={styles.foodname}>Biriyani</Text>
                    <Text style={styles.qty}>Qty: 5kg</Text>
                    </View>
                    <View style={styles.flexContainer}>
                        <Image source={{uri:'https://5.imimg.com/data5/ANDROID/Default/2022/5/NE/LE/RY/125143773/product-jpeg-500x500.jpg'}} style={styles.foodpic}/>
                        <TouchableOpacity style={styles.addBox}>
                            <Text style={{textAlign:'center'}}>add</Text>
                        </TouchableOpacity>
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
      margin:15
    },
    textbox:{
        marginBottom:10
    },
    qfix:{
        backgroundColor: 'white'
    },
    card:{
        display: 'flex',
        flexDirection: 'row',
        height: 125,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 20
    },
    foodname:{
        fontSize: 30
    },
    qty:{
        fontSize: 15,
        color: 'grey'
    },
    foodpic:{
        height: 70,
        width: 70,
        borderRadius:5,
    },
    flexContainer:{
        flexDirection:'column',
        justifyContent:'space-evenly',
        alignItems:'center',
        
    },
    addBox:{
        borderRadius:10,
        borderWidth:0.9,
        height:30,
        borderColor:'#FD0136',
        width:90,
        marginTop:9
    }

  });