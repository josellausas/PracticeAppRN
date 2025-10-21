import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View, Button, TextInput, GestureResponderEvent, FlatList} from "react-native";
import { useState } from "react";
import { RootStackParamList } from "../navigation/types";
import {Styles} from "./styles/CommonStyles";

type Props = NativeStackScreenProps<RootStackParamList, 'MovieDetail'>;
const API = "https://reactnative.dev/movies.json";

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
      <TextInput value={comment} onChangeText={setComment} style={Styles.textInput} />
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
