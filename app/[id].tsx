import React, { useEffect, useState, useLayoutEffect } from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import { Text, useTheme, ActivityIndicator, Chip } from "react-native-paper";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { fetchRestaurantDetails } from "@/services/api";
import type { MinimalRestaurant, Restaurant } from "@/types/restaurant";
import FavoriteButton from "@/components/FavoriteButton";
import DisabledRestaurantView from "@/components/DisabledRestaurantView";

const RestaurantDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const theme = useTheme();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    const minimalRestaurant: MinimalRestaurant | null = restaurant ? {
      _id: restaurant._id,
      name: restaurant.name,
      image: restaurant.image
    } : null;

    navigation.setOptions({
      headerShown: true,
      headerTitle: restaurant?.name ?? "Restaurant Details",
      headerTintColor: theme.colors.primary,
      headerStyle: {
        backgroundColor: theme.colors.surface,
      },
      headerTitleStyle: {
        fontSize: 18,
        fontWeight: "500",
      },
      headerRight: () => (
        minimalRestaurant ? <FavoriteButton restaurant={minimalRestaurant} /> : null
      ),
    });
  }, [navigation, restaurant, theme]);


  useEffect(() => {
    const loadRestaurant = async () => {
      try {
        const response = await fetchRestaurantDetails(id as string);
        if (response.status === 403) {
          setIsDisabled(true);
        } else {
          setRestaurant(response.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadRestaurant();
  }, [id]);

  if (isDisabled) {
    return <DisabledRestaurantView onGoBack={() => navigation.goBack()} />;
  }

	if (loading || !restaurant) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	return (
		<ScrollView style={styles.container}>
			{restaurant.image ? (
				<Image
					source={{ uri: restaurant.image.url }}
					style={styles.headerImage}
				/>
			) : (
				<View style={styles.placeholderImage}>
					<MaterialCommunityIcons
						name="food"
						size={60}
						color={theme.colors.primary}
					/>
				</View>
			)}

			<View style={styles.content}>
				<Text variant="headlineMedium" style={styles.name}>
					{restaurant.name}
				</Text>

				<View style={styles.section}>
					<View style={styles.infoRow}>
						<MaterialCommunityIcons
							name="map-marker"
							size={24}
							color={theme.colors.primary}
						/>
						<Text style={styles.infoText}>
							{restaurant.addressInfo.address}
						</Text>
					</View>

					<View style={styles.infoRow}>
						<MaterialCommunityIcons
							name="phone"
							size={24}
							color={theme.colors.primary}
						/>
						<Text style={styles.infoText}>
							{restaurant.contacts.phoneNumber}
						</Text>
					</View>

					<View style={styles.infoRow}>
						<MaterialCommunityIcons
							name="email"
							size={24}
							color={theme.colors.primary}
						/>
						<Text style={styles.infoText}>{restaurant.contacts.email}</Text>
					</View>
				</View>

				{restaurant.cuisines.length > 0 ? (
					<View style={styles.cuisines}>
						{restaurant.cuisines.map((cuisine) => (
							<Chip key={cuisine._id} style={styles.chip}>
								{cuisine.name["pt-BR"]}
							</Chip>
						))}
					</View>
				) : (
					<Chip style={styles.chip}>Tipo de cozinha indisponível</Chip>
				)}
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	centered: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	headerImage: {
		width: "100%",
		height: 250,
	},
	placeholderImage: {
		width: "100%",
		height: 250,
		backgroundColor: "#f5f5f5",
		justifyContent: "center",
		alignItems: "center",
	},
	content: {
		padding: 16,
	},
	name: {
		marginBottom: 16,
		fontWeight: "bold",
	},
	section: {
		marginBottom: 24,
	},
	infoRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 12,
	},
	infoText: {
		marginLeft: 12,
		flex: 1,
	},
	cuisines: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
	},
	chip: {
		marginBottom: 8,
	},
});

export default RestaurantDetailScreen;
