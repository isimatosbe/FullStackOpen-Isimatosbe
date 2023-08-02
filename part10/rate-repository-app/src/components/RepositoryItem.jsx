import { Image, StyleSheet, Text, View } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
    name: {
        fontWeight: theme.fontWeights.bold
    },
    description: {
        color: theme.colors.textSecondary
    },
    avatar: {
        width: 66,
        height: 58,
    },
    language: {
        backgroundColor: theme.colors.accenture,
        color: theme.colors.white
    }
})

const RepositoryItem = ({ item } ) => {
    return (
        <View>
            <Image
                style={styles.avatar} 
                source={{uri: item.ownerAvatarUrl}} 
            />
            <Text style={styles.name}>{item.fullName}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.language}>Language: {item.language}</Text>
            <Text>Stars: {item.stargazersCount}</Text>
            <Text>Forks: {item.forksCount}</Text>
            <Text>Reviews: {item.reviewCount}</Text>
            <Text>Rating: {item.ratingAverage}</Text>
        </View>
    )
}

export default RepositoryItem;