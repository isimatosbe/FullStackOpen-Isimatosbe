import { FlatList, View, StyleSheet, Text } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useState, useEffect } from 'react';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { loading, error, data } = useRepositories() 

  if (!loading && (typeof data !== 'undefined')) {
    const repositories = data.repositories

    // Get the nodes from the edges array
    const repositoryNodes = repositories
        ? repositories.edges.map(edge => edge.node)
        : [];
    
    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item, index, separators} ) => (
          <RepositoryItem key={item.id} item={item} />
        )}
      />
    )
  }
  else {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
  }

  ;
};

export default RepositoryList;