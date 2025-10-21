import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View, Button, TextInput, GestureResponderEvent, StyleSheet, FlatList} from "react-native";
import { useState } from "react";
import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, 'MovieDetail'>;
const API = "https://josellausas.com/";

const USE_FLATLIST_RENDER = true;

interface CardProps {
  comment: String;
}

export const CommentCard: React.FC<CardProps> = ({comment}) => {
  return (
    <View>
      <Text>{comment}</Text>
    </View>
  );
}

export const MovieDetail: React.FC<Props> = (props) => {
  const { route } = props;
  const { movie } = route.params;
  const [comment, setComment ] = useState("");
  const [commentArray, setCommentArray] = useState<String[]>([]);

  async function saveComment(_: GestureResponderEvent) {
    if (comment === "" ) { return }
    console.log("Saving" + comment);
    try {
      const response = await fetch(API, {
        method: "GET",
      });
      console.log(response.status);
    } catch (error) {
      console.error(error);
      console.log("Error fetching")
    }
    setCommentArray( prev => [...prev, comment]);
    setComment("");
  }
  
  return (
    <View>
      <Text>{movie.title}</Text>
      <Text>{"Release year: " + movie.releaseYear}</Text>
      <TextInput value={comment} onChangeText={setComment} style={styles.textInput} />
      <Button onPress={saveComment} title={"Save Comment"} />
      <Text>{"Comments\n"}</Text>
      {
        USE_FLATLIST_RENDER ?
        (
          <FlatList 
            data={commentArray || []}
            renderItem={({ item }) => <CommentCard comment={item} />}
            keyExtractor={(_, index) => "id-" + index.toString()}
          />
        ) :
        commentArray.map(
          (item, index) => {
            return (<Text key={"id" + index}>{item}</Text>)  
          }
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
})