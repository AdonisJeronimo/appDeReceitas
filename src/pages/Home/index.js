import { useState, useEffect } from 'react'
import { View,Text, StyleSheet, SafeAreaView,TextInput, TouchableOpacity,
FlatList, } from 'react-native'

import { Logo } from '../../Components/logo'
import {Ionicons} from '@expo/vector-icons'

import api from '../../Services/api'
import { FoodList } from '../../Components/foodlist'

import { useNavigation } from '@react-navigation/native'

import { Text as MotiText} from 'moti'

export function Home(){
    const [inputValue, setInputValue] = useState("")
    const [foods,setFoods] =  useState([])

    const navigation = useNavigation();

     useEffect(() => {
        async function fetchApi(){
            const response = await api.get("/foods")
            setFoods(response.data)
        }

        fetchApi();
    },[])

    function handleSearch(){

        if(!inputValue) return;

        let input = inputValue;
        setInputValue("")
        navigation.navigate("Search", {name: input})

        console.log(`Você digitou: `)
        console.log(inputValue)
    }

    return(
        <SafeAreaView style={styles.container}>
          <Logo/>
          <MotiText 
          style={styles.title}
          from={{
            opacity: 0,
            translateY: 15,
          }}
          animate={{
            opacity:1,
            translateY: 0,
          }}
          transition={{
            delay:500,
            type: 'timing',
            duration: 850,
          }}
          >Encontre a receita</MotiText>
          
          <MotiText 
          style={styles.title}
          from={{
            opacity: 0,
            translateY: 18,
          }}
          animate={{
            opacity:1,
            translateY: 0,
          }}
          transition={{
            delay:600,
            type: 'timing',
            duration: 650,
          }}
          >que combina com você</MotiText>

          <View style={styles.form}>
            <TextInput 
                placeholder='humm... o que iremos comer?'
                style={styles.input}
                value={inputValue}
                onChangeText={(text) => setInputValue(text)}
            />
            <TouchableOpacity onPress={handleSearch}>
                <Ionicons name='search' color="#4CBE6C" size={28}/>
            </TouchableOpacity>
          </View>

          <FlatList
          data={foods}
          keyExtractor={ (item) => String(item.id) }
          renderItem={ ({item}) => <FoodList data={item}/>}
          showsVerticalScrollIndicator={false}
          
          />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#F3F9FF",
        paddingTop: 33,
        paddingStart: 14,
        paddingEnd: 14,
    },

    title:{
        fontSize: 26,
        fontWeight: 'bold',
        color: "#000",
    },

    form:{
        width: '100%',
        borderRadius: 8,
        marginTop: 16,
        marginBottom: 16,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ECECEC",
        padding: 8,
        paddingRight: 8,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'

    },

    input:{
        width: '90%',
        maxWidth: '90%',
        height: 50,

    }

})