import theme from '../theme';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
  },
  
  text: {
    color: theme.colors.white,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.heading
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
        <AppBarTab tabName={"Repositories"} style={styles.text} />
    </View>
  )
};

export default AppBar;