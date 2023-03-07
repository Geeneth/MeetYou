import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomePage from './pages/home-page';
import Navigation from './pages/navigation';
import UserInfoPage from './pages/user-info-page';
import { TamaguiProvider } from "tamagui";
import config from "./tamagui.config";


export default function App() {
  return (
    <TamaguiProvider config={config}>
      <NavigationContainer>
        <Navigation/>
      </NavigationContainer>
    </TamaguiProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
