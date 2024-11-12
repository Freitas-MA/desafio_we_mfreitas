import React from 'react';
import { FlatList, View, Dimensions, StyleSheet, useWindowDimensions } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { RestaurantCard } from './RestaurantCard';
import type { Restaurant } from "@/types/restaurant";
import { useResponsiveColumns } from '@/hooks/useResponsiveColumns';

interface RestaurantListProps {
  restaurants: Restaurant[];
  loading: boolean;
  onLoadMore: () => void;
  totalDocs?: number; 
}

export const RestaurantList = ({ 
  restaurants, 
  loading, 
  onLoadMore,
  totalDocs 
}: RestaurantListProps) => {
  const numColumns = useResponsiveColumns();
  const { width } = useWindowDimensions();

  const handleLoadMore = () => {
    if (totalDocs && restaurants.length >= totalDocs) {
      return;
    }
    onLoadMore();
  };

  return (
    <FlatList
      data={restaurants}
      key={`list-${numColumns}`}
      numColumns={numColumns}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <View style={[styles.cardContainer, { width: width / numColumns }]}>
          <RestaurantCard restaurant={item} />
        </View>
      )}
      onEndReached={handleLoadMore} // Use the new handler
      onEndReachedThreshold={0.1}
      ListFooterComponent={
        loading ? (
          <View style={styles.footer}>
            <ActivityIndicator />
          </View>
        ) : null
      }
      contentContainerStyle={styles.container}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    padding: 8,
  },
  footer: {
    padding: 16,
    alignItems: 'center',
  }
});