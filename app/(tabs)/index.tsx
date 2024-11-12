import React, { useEffect, useState } from "react";
import { fetchRestaurants } from "@/services/api";
import type { Restaurant } from "@/types/restaurant";
import { RestaurantList } from "@/components/RestaurantList";

const RestaurantListScreen = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [totalDocs, setTotalDocs] = useState<number>(0);
  const limit = 10;

  const loadRestaurants = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const response = await fetchRestaurants(offset, limit);
      setRestaurants((prev) => [...prev, ...response.data.docs]);
      setTotalDocs(response.data.totalDocs);
      setOffset((prev) => prev + limit);
    } catch (error) {
      console.error("Error loading restaurants:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RestaurantList 
      restaurants={restaurants}
      loading={loading}
      onLoadMore={loadRestaurants}
      totalDocs={totalDocs}
    />
  );
};
export default RestaurantListScreen;