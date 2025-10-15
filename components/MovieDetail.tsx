import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { Text, View } from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, 'MovieDetail'>;

export const MovieDetail: React.FC<Props> = (props) => {
  const { route } = props;
  const { movie } = route.params;
  return (
    <View>
      <Text>{movie.title}</Text>
      <Text>{"Release year: " + movie.releaseYear}</Text>
    </View>
  );
}