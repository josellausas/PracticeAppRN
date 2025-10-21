import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootNavigatorParamList } from "../navigation/types";
import { useState } from "react";
import { Button, Text, TextInput  } from "react-native";
import { Styles } from "./styles/CommonStyles";

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

type Props = NativeStackScreenProps<RootNavigatorParamList, 'Setup'>;

export const SetupScreen: React.FC<Props> = (props) => {
  const {navigation} = props;
  const [config, setConfig] = useState<string>("");
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  const fetchUrl = (url: string): Promise<Response> => { 
    return fetch(url);
  }

  const onPress = async (_: TouchEvent) => {
    setLoading(true);
    await delay(1000);
    try {
      const response = await fetchUrl(config).catch(
        (_2) => {
          setError(true);
        }
      );
      if (response?.status === 200) {
        navigation.replace('Main', { configUrl: config });
      } else {
        setError(true);
      }
    } catch(error) {
      console.error(error);
      setError(true);
    }
    setLoading(false);
  }

  const onChangeText = (text: string) => {
    setConfig(text);
  }
  
  if (isLoading) { return <Text>{"Loading..."}</Text> }
  return (
    <>
      <Text>{"Setup app"}</Text>
      <TextInput value={config} onChangeText={onChangeText} style={Styles.textInput} />
      { isError ? <Text>{"try another URL"}</Text> : <></>}
      <Button title="Continue" onPress={onPress} />
    </>
  )
}