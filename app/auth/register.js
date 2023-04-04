import {View,Text,StyleSheet} from 'react-native';
import { Card, Provider ,TextInput, Appbar, Button, ActivityIndicator} from 'react-native-paper';
import { Link, useRouter } from 'expo-router';
export default function Register(){
    const router = useRouter();
    return(
        <>
        <Appbar.Header>
            <Appbar.BackAction iconColor='black' onPress={()=>{router.back()}}/>
            <Appbar.Content title="Register"/>
        </Appbar.Header>
        <View style={styles.container}>
            <Card style={{height:'auto',width:'90%'}}>
            
            <Card.Cover source={{uri:'https://i.ibb.co/4d376Jv/materialu.png'}}/>
          
            <Card.Content style={{margin:5}}>
            
              <TextInput label="name" style={{marginBottom:20}}/>
              <TextInput label="password" style={{marginBottom:20}}/>
              <TextInput label="confirm password" />
            </Card.Content>
            <Card.Actions >
              <Link href={'/provider'} asChild>
                <Button>Register</Button>
              </Link>
            </Card.Actions>
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
      marginBottom:100
    },
  });