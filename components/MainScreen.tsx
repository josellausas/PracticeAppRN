import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { RenderObject, RootStackParamList } from '../App';

type MainScreenProps = NativeStackScreenProps<RootStackParamList, 'Main'>;

export const AppContent: React.FC<MainScreenProps> = (props) => {
  const { navigation } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);

  const getApi = async () => {
    const API_URL = "https://reactnative.dev/movies.json";
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

  useEffect(() => {
    getApi();
    // TODO: Dispatch Loading of the data
  }, []);

  const renderData = data || [];

  if (isLoading) return (<Text>{"Loading"}</Text>);
  if (isError) return (<Text>{"API ERROR"}</Text>);
  return (
    <View style={styles.container}>
      {
        renderData.map((item: RenderObject, index) => {
          const keyId = "item-" + index;
          return (
            <TouchableOpacity key={keyId} id={keyId} onPress={() => {
              console.log("Pressed");
              navigation.navigate('MovieDetail', { movie: item });
            }}>
              <View style={styles.movieCard}>
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