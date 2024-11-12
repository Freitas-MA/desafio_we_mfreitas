import React from "react";
import { Card, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FavoriteButton from "@/components/FavoriteButton";

interface MinimalRestaurant {
	_id: string;
	name: string;
	image?: {
		url: string;
	};
}

interface RestaurantCardProps {
	restaurant: MinimalRestaurant;
}

export const RestaurantCard = React.memo(
	({ restaurant }: RestaurantCardProps) => {
		const router = useRouter();
		const theme = useTheme();

		if (!restaurant || !restaurant._id) return null;

		return (
			<Card
				style={styles.card}
				onPress={() => router.push(`/${restaurant._id}`)}
			>
				{restaurant.image?.url ? (
					<Card.Cover
						source={{ uri: restaurant.image.url }}
						style={styles.image}
					/>
				) : (
					<View
						style={[
							styles.placeholderImage,
							{ backgroundColor: theme.colors.surfaceVariant },
						]}
					>
						<MaterialCommunityIcons
							name="food"
							size={60}
							color={theme.colors.primary}
						/>
					</View>
				)}
				<Card.Title
					title={restaurant.name}
					right={() => <FavoriteButton restaurant={restaurant} />}
				/>
			</Card>
		);
	},
);

RestaurantCard.displayName = "RestaurantCard";

const styles = StyleSheet.create({
	card: {
	  flex: 1,
	  margin: 0,
	},
	image: {
	  height: 140,
	},
	placeholderImage: {
	  height: 140,
	  justifyContent: "center",
	  alignItems: "center",
	},
  });
