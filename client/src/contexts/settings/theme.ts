import { Theme } from 'react-native-elements';

const red = '#d90429';
const green = '#29bf12';

export const darkTheme: Theme = {
  colors: {
    primary: '#d00000',
  },
  Icon: {
    color: '#EAEAEA',
  },
  ListItem: {
    containerStyle: {
      backgroundColor: '#313131',
    },
  },
  ListItemTitle: {
    style: {
      color: '#c1c1c1',
    },
  },
  Text: {
    style: {
      color: '#fff',
    },
  },
  Input: {
    style: {
      color: '#fff',
    },
  },
  red,
  green,
  backgroundColor: '#2b2b2b',
  secondaryBackgroundColor: '#6a040f',
};

export const lightTheme: Theme = {
  colors: {
    primary: '#fb8500',
  },
  Icon: {
    color: '#000',
  },
  ListItem: {
    containerStyle: {
      backgroundColor: '#f0f0f0',
    },
  },
  ListItemTitle: {
    style: {
      color: '#1b1b1b',
    },
  },
  Text: {
    style: {
      color: '#000',
    },
  },
  Input: {
    style: {
      color: '#000',
    },
  },
  red,
  green,
  backgroundColor: '#fff',
  secondaryBackgroundColor: '#fdc280',
};
