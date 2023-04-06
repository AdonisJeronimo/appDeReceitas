import { useState, useEffect } from 'react'
import { View,Text, StyleSheet, SafeAreaView, FlatList } from 'react-native'
import { getFavorite } from '../../Utils/storage'; 

import { useIsFocused } from '@react-navigation/native'

import { FoodList } from '../../Components/foodlist'


export function Favorites(){
    const [receipes, setReceipes] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        let isActive = true;

        async function getReceipes(){
            const result = await getFavorite("@appreceitas")
            if(isActive){
                setReceipes(result);
            }
        }
        if(isActive){
            getReceipes();
        }

        return () => {
            isActive = false;
        }

    },[isFocused])

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Receitas Favoritas</Text>

            {receipes.length === 0 &&(
                <Text style={styles.advice}>Você ainda não possui nenhuma receita salva.</Text>
            )}

            <FlatList 
            showsVerticalScrollIndicator= {false}
            styles={{ marginTop: 14}}
            data={receipes}
            keyExtractor={(item) => String(item.id)}
            renderItem={ ({item}) => <FoodList data={item}/> }
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#f3f3f9ff",
        paddingStart: 14,
        paddingEnd: 14,
        paddingTop: 36,
    },
    title:{
        color: "#000",
        fontWeight: 'bold',
        fontSize: 24,
    },
    advice:{
        marginTop: "50%",
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
    },
})