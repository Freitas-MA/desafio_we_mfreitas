import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import Fontisto from "@expo/vector-icons/Fontisto";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: "rgb(103, 80, 164)",
				tabBarInactiveTintColor: "gray",
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color }) => (
						<FontAwesome size={28} name="home" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="favorites"
				options={{
					title: "Favoritos",
					tabBarIcon: ({ color }) => (
						<Fontisto size={28} name="favorite" color={color} />
					),
					headerShown: true,
				}}
			/>
		</Tabs>
	);
}
