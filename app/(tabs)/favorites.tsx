import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { FavoriteList } from "@/components/FavoriteList";
import type { RootState } from "@/store";
import { Fontisto } from "@expo/vector-icons";

const FavoritesScreen = () => {
	const favorites = useSelector(
		(state: RootState) => state.favorites.favorites,
	);

	if (favorites.length === 0) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Fontisto size={44} name="favorite" color={"rgba(103, 80, 164, 0.5)"} />
			</View>
		);
	}

	return (
		<View style={{ flex: 1 }}>
			<FavoriteList favorites={favorites} />
		</View>
	);
};

export default FavoritesScreen;
