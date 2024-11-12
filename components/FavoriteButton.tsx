import type React from "react";
import { IconButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { addFavorite, removeFavorite } from "../store/favoritesSlice";
import type { MinimalRestaurant } from "@/types/restaurant";

interface Props {
	restaurant: MinimalRestaurant;
}

const FavoriteButton: React.FC<Props> = ({ restaurant }) => {
	const dispatch = useDispatch();
	const isFavorite = useSelector((state: RootState) =>
		state.favorites.favorites.some((fav) => fav._id === restaurant._id),
	);

	const toggleFavorite = () => {
		if (isFavorite) {
			dispatch(removeFavorite(restaurant._id));
		} else {
			const minimalRestaurant: MinimalRestaurant = {
				_id: restaurant._id,
				name: restaurant.name,
				image: restaurant.image ? { url: restaurant.image.url } : undefined,
			};
			dispatch(addFavorite(minimalRestaurant));
		}
	};

	return (
		<IconButton
			icon={isFavorite ? "star" : "star-outline"}
			iconColor={isFavorite ? "#FFD700" : "gray"}
			size={20}
			onPress={toggleFavorite}
		/>
	);
};
export default FavoriteButton;
