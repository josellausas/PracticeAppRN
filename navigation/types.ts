import { RenderObject } from "../models/Models";

// Setup stack parameters
export type SetupStackParamList = {
  Setup: undefined;
};

// Main app stack parameters  
export type RootStackParamList = {
  Main: { configUrl: string };
  MovieDetail: { movie: RenderObject };  
};

// Root navigator parameters (for the main App component)
export type RootNavigatorParamList = {
  Setup: undefined;
  Main: { configUrl: string };
  MovieDetail: { movie: RenderObject };
};
