import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';

import {AppProvider} from './contexts/AppContext';

const ProvidedApp = () => {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
};

AppRegistry.registerComponent(appName, () => ProvidedApp);
