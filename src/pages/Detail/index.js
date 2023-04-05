import { useLayoutEffect } from 'react';
import { View,Text, StyleSheet, Pressable } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'

import { Fontisto } from '@expo/vector-icons'

export function Detail(){
    const route = useRoute();
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: route.params?.data ? route.params?.data.name : "Detalhes da receita",
            headerRight: () => (
                <Pressable>
                    <Fontisto
                    name='favorite'
                    color="#ff4141" 
                    size={28}
                    />
                </Pressable>
            )
        })
    }, [navigation, route.params?.data])
    return(
        <View>
            <Text>Página Detalhes da receita</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "blue",

    }
})