/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, useColorScheme } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { AppContent } from './components/MainScreen';
import { MovieDetail } from './components/MovieDetail';

export interface RenderObject {
  id: String;
  title: String;
  releaseYear: String;
}

export type RootStackParamList = {
  Main: undefined;
  MovieDetail: { movie: RenderObject };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaProvider>
      <NavigationContainer>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Stack.Navigator>
        <Stack.Screen
          name='Main'
          component={AppContent}
        />
        <Stack.Screen
          name='MovieDetail'
          component={MovieDetail}
        />
      </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}


export default App;
