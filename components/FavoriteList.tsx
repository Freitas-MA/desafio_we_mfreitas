import React from 'react';
import { RestaurantCard } from './RestaurantCard';
import type { MinimalRestaurant } from '@/types/restaurant';
import { useResponsiveColumns } from '@/hooks/useResponsiveColumns';
import { StyleSheet, FlatList, View, useWindowDimensions } from 'react-native';

interface FavoriteListProps {
  favorites: MinimalRestaurant[];
  loading?: boolean;
}

export const FavoriteList = React.memo(({ favorites, loading }: FavoriteListProps) => {
  const numColumns = useResponsiveColumns();
  const { width } = useWindowDimensions();

  const renderItem = React.useCallback(({ item }: { item: MinimalRestaurant }) => (
    <View style={[styles.cardContainer, { width: width / numColumns }]}>
      <RestaurantCard restaurant={item} />
    </View>
  ), [width, numColumns]);

  return (
    <FlatList
      data={favorites}
      key={`list-${numColumns}`}
      numColumns={numColumns}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      initialNumToRender={5}
      maxToRenderPerBatch={5}
      windowSize={5}
      contentContainerStyle={styles.container}
    />
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    padding: 8,
  }
});

FavoriteList.displayName = 'FavoriteList';