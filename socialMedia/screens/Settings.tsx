import {Text, SafeAreaView} from 'react-native';

const Settings = () => {
  return (
    <SafeAreaView
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <Text
        style={{
          color: '#000',
          fontWeight: 'bold',
          fontSize: 25,
        }}>
        SETTINGS
      </Text>
    </SafeAreaView>
  );
};

export default Settings;
