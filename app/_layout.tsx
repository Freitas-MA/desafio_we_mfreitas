import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/store";

export default function Layout() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Stack>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					<Stack.Screen
						name="[id]"
						options={{ headerShown: false }}
					/>
				</Stack>
			</PersistGate>
		</Provider>
	);
}
