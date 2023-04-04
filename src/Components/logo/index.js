import { View, Text, StyleSheet} from 'react-native'

export function Logo(){
    return(
        <View style={styles.logoArea}>
            <Text style={styles.logo}>Receita Facil</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    logoArea:{
        backgroundColor: "#4CBE6C",
        alignSelf: "flex-start",
        padding: 8,
        paddingLeft: 16,
        paddingRight: 20,
        borderTopRightRadius: 8,
        borderTopLefttRadius: 8,
        borderBottomRightRadius: 32,
        borderBottomLeftRadius: 8,
    },

    logo:{
        fontSize:18,
        fontWeight: "bold",
        color: "#FFF,"
    }
})