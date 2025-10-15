/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useEffect, useState } from 'react';
import { StatusBar, StyleSheet, useColorScheme, View, Text, TouchableOpacity } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
// import { FlatList } from 'react-native';

// TODO: Dont use globals
const API_URL = "https://reactnative.dev/movies.json";

interface RenderObject {
  id: String;
  title: String;
  releaseYear: String;
}



const Stack = createNativeStackNavigator();

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
      </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

interface Props {
  // renderData: RenderObject[]
}

const AppContent: React.FC<Props> = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);
  
  const getApi = async () => {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      setData(json.movies);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(()=>{
    getApi();
    // TODO: Dispatch Loading of the data
  }, []);

  const renderData = data || [];

  if (isLoading) return (<Text>{"Loading"}</Text>);
  if (isError) return (<Text>{"API ERROR"}</Text>);
  return (
    <View style={styles.container}>
      {
        renderData.map( (item: RenderObject, index) => {
          return (
            <TouchableOpacity onPress={() => {
              console.log("Pressed");
            }}>
            <View id={"item-" + index } style={styles.movieCard}>
              <Text>{item.title}</Text>
              <Text>{"Year: " + item.releaseYear}</Text>
            </View>
            </TouchableOpacity>
          )
        })
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 30,
    // top: 80
  },
  movieCard: {
    paddingBottom: 14,
    borderRadius: 3,
    borderWidth: 2, borderColor: 'blue',
    margin: 5
  }
});

export default App;
