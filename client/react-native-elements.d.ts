import 'react-native-elements';

declare module 'react-native-elements' {
  export interface FullTheme extends FullTheme {
    backgroundColor?: string;
    secondaryBackgroundColor?: string;
    red?: string;
    green?: string;
  }
}
