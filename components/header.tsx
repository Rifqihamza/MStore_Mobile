import { View, Text } from "react-native"
import { StyleSheet } from "react-native"
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Header = () => {
    return (
        <View style={style.header}>
            <View style={style.titleHeader}>
                <Text style={style.logoName}>MITRASTORE</Text>
                <FontAwesome style={style.iconBars} size={20} name="bars"></FontAwesome>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    header: {
        padding: 20,
        position: 'absolute',
        top: 0,
        left: 0,
        width: "100%",
    },
    titleHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    logoName: {
        fontSize: 20,
        letterSpacing: 2,
        fontWeight: 700,
        color: '#fff'
    },
    iconBars: {
        fontSize: 26,
        color: '#fff'

    }

})

export default Header