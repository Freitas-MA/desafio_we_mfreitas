import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

type Props = {
  onGoBack: () => void;
};

const DisabledRestaurantView = ({ onGoBack }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Este restaurante está atualmente desativado.</Text>
      <Button mode="contained" onPress={onGoBack} style={styles.button}>
        Go Back
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    width: '50%',
  },
});

export default DisabledRestaurantView;