import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Wordle from "./pages/Wordle";

export default function App() {
  return (
    <View style={styles.container}>
      <Wordle guessCount={6} wordleSize={5} word={'reach'}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: 'black'
  },
});
