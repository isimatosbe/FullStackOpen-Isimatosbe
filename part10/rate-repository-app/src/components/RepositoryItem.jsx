import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
    flexContainerRow1: {
        display: 'flex',
        flexDirection: 'row',
        padding: 15
    },
    flexContainerRow2: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 30,
        justifyContent: 'space-evenly'
    },
    flexContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    name: {
        fontSize: theme.fontSizes.subheading,
        fontWeight: theme.fontWeights.bold,
        lineHeight: 29
    },
    description: {
        color: theme.colors.textSecondary,
        lineHeight: 29,
        textBreakStrategy: 'simple'
    },
    avatar: {
        maxWidth: 60,
        maxHeight: 60,
        aspectRatio: 1,
        borderRadius: 10
    },
    language: {
        backgroundColor: theme.colors.primary,
        color: theme.colors.white,
        alignSelf: 'flex-start',
        padding: 8,
        borderRadius: 10,
    }
})

const shortNumbers = (number) => {
    return (number < 1000) ? number : (number / 1000).toFixed(1) + "k"
}

const RepositoryItem = ({ item } ) => {
    return (
        <View style={{backgroundColor: 'white'}}>
            <View style={styles.flexContainerRow1}>
                <Image
                    style={styles.avatar} 
                    source={{uri: item.ownerAvatarUrl}} 
                />
                <View style={{marginLeft: 20}}>
                    <Text style={styles.name}>{item.fullName}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                    <Text style={styles.language}>{item.language}</Text>
                </View>                
            </View>
            <View>
                <FlatList 
                    style={styles.flexContainerRow2}
                    data={
                        [
                            {title: 'Stars', value: item.stargazersCount}, 
                            {title: 'Forks', value: item.forksCount},
                            {title: 'Reviews', value: item.reviewCount},
                            {title: 'Rating', value: item.ratingAverage}
                        ]
                    }
                    //ItemSeparatorComponent={ItemSeparator}
                    renderItem={({ item } ) => (
                        <View style={styles.flexContainer}>
                            <Text style={styles.name}>{shortNumbers(item.value)}</Text>
                            <Text>{item.title}</Text>
                        </View>
                    )} 
                />
            </View>
        </View>
        
    )
}

export default RepositoryItem;