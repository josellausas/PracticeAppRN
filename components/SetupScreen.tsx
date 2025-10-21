import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootNavigatorParamList } from "../navigation/types";
import { useState } from "react";
import { Button, Text, TextInput  } from "react-native";
import { Styles } from "./styles/CommonStyles";
import { useConfig } from "../hooks/useConfig";

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

type Props = NativeStackScreenProps<RootNavigatorParamList, 'Setup'>;

export const SetupScreen: React.FC<Props> = (props) => {
  const {navigation} = props;
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [config, setConfig] = useConfig();

  const fetchUrl = (url: string): Promise<Response> => { 
    return fetch(url);
  }

  const onPress = async (_: TouchEvent) => {
    setLoading(true);
    await delay(1000);
    try {
      const response = await fetchUrl("https://" + config.apiUrl).catch(
        (_2) => {
          setError(true);
        }
      );
      if (response?.status === 200) {
        navigation.replace('Main', { configUrl: config.apiUrl });
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
    setConfig({ ...config, apiUrl: text });
  }
  
  if (isLoading) { return <Text>{"Loading..."}</Text> }
  return (
    <>
      <Text>{"Setup app"}</Text>
      <TextInput 
        value={config.apiUrl} 
        onChangeText={onChangeText} 
        style={Styles.textInput}
        autoComplete="off"
        autoCorrect={false}
        autoCapitalize="none"
        keyboardType="url"
        returnKeyType="done"
      />
      { isError ? <Text>{"try another URL"}</Text> : <></>}
      <Button title="Continue" onPress={onPress} />
    </>
  )
}