import theme from '../theme';
import { View, ScrollView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
    //padding: 15,
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
        <ScrollView horizontal>
          <AppBarTab tabName="Repositories" route="/" />
          <AppBarTab tabName="Sign in" route="/signin" />
        </ScrollView>
    </View>
  )
};

export default AppBar;