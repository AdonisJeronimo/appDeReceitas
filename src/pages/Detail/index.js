import { useLayoutEffect, useState } from 'react';
import { View,Text, StyleSheet, Pressable, ScrollView, Image, Modal, Share } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'

import { Fontisto,AntDesign, Feather } from '@expo/vector-icons'

import { Ingredients } from '../../Components/ingredients';
import { Instructions } from '../../Components/instructions';
import { VideoView } from '../../Components/video';

import { isFavorite, saveFavorite, removeFavorite } from '../../Utils/storage';

export function Detail(){
    const route = useRoute();
    const navigation = useNavigation();
    const [showVideo, setShowVideo] = useState(false)
    const [ favorite, setFavorite] = useState(false)

    useLayoutEffect(() => {

        async function getStatusFavorites(){
            const receipeFavorite = await isFavorite(route.params.data)
            setFavorite(receipeFavorite)
        }
        getStatusFavorites();

        navigation.setOptions({
            title: route.params?.data ? route.params?.data.name : "Detalhes da receita",
            headerRight: () => (
                <Pressable onPress={() => handleFavoriteReceipe(route.params.data)}>
                  {favorite? (
                      <Fontisto
                      name='favorite'
                      color="#ff4141" 
                      size={28}
                      />
                  ) : (
                    <Fontisto
                    name='bookmark'
                    color="#4cbe6e" 
                    size={28}
                    />
                  ) }
                </Pressable>
            )
        })
    }, [navigation, route.params?.data, favorite])

    async function handleFavoriteReceipe(receipe){
        if(favorite){
            await removeFavorite(receipe.id)
            setFavorite(false);
        }else{
            await saveFavorite("@appreceitas", receipe)
            setFavorite(true);
        }
    }

    function handleOpenVideo(){
        setShowVideo(true);
    }

    async function shareRecipe(){
        try{
            await Share.share({
                url: "https://google.com",
                message: `Receita: ${route.params?.data.name}\nIngredientes: ${route.params.data.total_ingredients}\nVi la no app receita facil` 
            })
        }catch(error){
            console.log(error)
        }
    }

    return(
        <ScrollView contentContainerStyle={{paddingBottom: 14}} style={styles.container} showsVerticalScrollIndicator={false}>
            <Pressable onPress={handleOpenVideo}>
                <View style={styles.playIcon}>
                    <AntDesign name='playcircleo' size={75} color="#FAFAFA"/>
                </View>
                <Image 
                source={{uri: route.params.data.cover}}
                style={styles.cover}
                />
            </Pressable>

            <View style={styles.headerDetails}>
                <View>
                    <Text style={styles.title}>{route.params?.data.name}</Text>
                    <Text style={styles.ingredientsText}>Ingredientes ({route.params?.data.total_ingredients})</Text>
                </View>

                <Pressable onPress={shareRecipe}>
                    <Feather name='share-2' size={30} color="#121212" />
                </Pressable>
            </View>

           {route.params?.data.ingredients.map((item) => (
            <Ingredients key={item.id} data={item} />
           ))}

           <View style={styles.instructionsArea}>
            <Text style={styles.instructionsText}>Modo de preparo</Text>
            <Feather name='arrow-down' size={24} color="#fff" />
           </View>

           {route.params?.data.instructions.map( (item, index) => (
                <Instructions key={item.id} data={item} index={index}/>
           ))}

            <Modal visible={showVideo} animationType='slide'>
                <VideoView 
                handleCLose={() => setShowVideo(false) }
                videoUrl={route.params.data.video}
                />
            </Modal>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#f3F9FF",
        paddingTop: 14,
        paddingEnd: 14,
        paddingStart: 14,
    },
    cover:{
       height: 200,
       borderRadius: 20,
       width: "100%",
    },
    playIcon:{
        position: "absolute",
        zIndex: 9,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        fontSize:18,
        marginTop: 14,
        fontWeight: 'bold',
        color: "#000",
        marginBottom: 4,
    },
    ingredientsText:{
        marginBottom: 14,
        fontSize: 16,
    },
    headerDetails:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 14,
    },
    instructionsArea:{
        backgroundColor: "#4cbe6e",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        padding: 0,
        borderRadius: 5,
        marginBottom: 14,
    },
    instructionsText:{
        fontSize: 18,
        fontWeight: 500,
        color: "#fff",
        margin: 8,
    }
    
})