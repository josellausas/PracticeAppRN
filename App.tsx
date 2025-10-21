/**
 * Practice React Native App
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
import { SetupScreen } from './components/SetupScreen';
import { RootNavigatorParamList } from './navigation/types';

const RootStack = createNativeStackNavigator<RootNavigatorParamList>();

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  
  return (
    <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <RootStack.Navigator initialRouteName="Setup">
            <RootStack.Screen
              name='Setup'
              component={SetupScreen}
            />
            <RootStack.Screen
              name='Main'
              component={AppContent}
            />
            <RootStack.Screen
              name='MovieDetail'
              component={MovieDetail}
              options={{ title: 'Movie Details' }}
            />
          </RootStack.Navigator>
        </NavigationContainer>
    </SafeAreaProvider>
  );
}


export default App;
