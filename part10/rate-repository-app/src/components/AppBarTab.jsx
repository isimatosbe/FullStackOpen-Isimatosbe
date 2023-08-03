import { StyleSheet, Text, View } from "react-native"
import { Link } from "react-router-native";

import theme from "../theme";

const styles = StyleSheet.create({
    text: {
      color: theme.colors.white,
      fontWeight: theme.fontWeights.bold,
      fontSize: theme.fontSizes.heading,
      padding: 10
    }
  });

const AppBarTab = ({ tabName, route }) => {
    return (
        <View>
            <Link to={route}>
                <Text style={styles.text} >{tabName}</Text>
            </Link>
        </View>
    )
}

export default AppBarTab;