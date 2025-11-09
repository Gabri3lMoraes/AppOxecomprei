import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
  Registro: undefined;
  Posregistro: undefined;
  Login: undefined;
};

export type NavigationProps = StackNavigationProp<RootStackParamList>;
