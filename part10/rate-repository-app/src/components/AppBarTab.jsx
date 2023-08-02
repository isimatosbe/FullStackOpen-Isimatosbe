import { Pressable, Text, View } from "react-native"

const AppBarTab = ({ tabName, style }) => {
    return (
        <View>
            <Pressable>
                <Text style={style} >{tabName}</Text>
            </Pressable>
        </View>
    )
}

export default AppBarTab;