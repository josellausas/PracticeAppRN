import { useEffect, useState } from "react";

interface Config {
  apiUrl: string;
  apiKey: string;
}

export const useConfig = () => {
  const [config, setConfig] = useState<Config>({
    apiUrl: '',
    apiKey: '',
  });

//   const fetchConfig = async () => {
//     const response = await fetch('/config.json');
//     const data = await response.json();
//     setConfig(data);
//   };

  useEffect(() => {
    setConfig({
      apiUrl: '',
      apiKey: '',
    });
    console.log('Config Reset');
  }, []);

  return [config, setConfig ] as const;
};