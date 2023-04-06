import { View, Text, StyleSheet} from "react-native"

export function Instructions({data, index}){
    return(
        <View style={styles.container}>
            <Text style={styles.name}>{index +1}° </Text>
            <Text style={styles.text}>{data.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        padding: 0,
        marginBottom: 14,
    },
    name:{
        fontWeight: 'bold',
        fontSize: 18,

    },
    text:{
        lineHeight: 18,
        marginRight: 15,
    }
})