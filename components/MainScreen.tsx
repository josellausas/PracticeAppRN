import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../navigation/types';
import { RenderObject } from '../models/Models';
import { useConfig } from '../hooks/useConfig';

type MainScreenProps = NativeStackScreenProps<RootStackParamList, 'Main'>;

export const AppContent: React.FC<MainScreenProps> = (props) => {
  const { navigation } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);
  const [config, _] = useConfig();

  const getApi = async (url: string) => {
    console.log('url', url);
    // TODO: Replace this with url
    const testURL = 'https://reactnative.dev/movies.json';
    try {
      const response = await fetch(testURL);
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
    getApi(config.apiUrl);
  }, [config.apiUrl]);

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
  },
  movieCard: {
    paddingBottom: 14,
    borderRadius: 3,
    borderWidth: 2, borderColor: 'blue',
    margin: 5
  }
});
