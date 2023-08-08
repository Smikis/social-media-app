import {SafeAreaView, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const TopBar = ({navigation}: any): JSX.Element => {
  return (
    <SafeAreaView
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}>
      <Text style={{color: '#000', fontSize: 25, fontWeight: 'bold'}}>
        Logo
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: 70,
        }}>
        <Icon
          name="add-circle-outline"
          size={25}
          color="#000"
          onPress={() => navigation.navigate('NewPost')}
        />
        <Icon
          name="settings-outline"
          size={25}
          color="#000"
          onPress={() => navigation.navigate('Settings')}
        />
      </View>
    </SafeAreaView>
  );
};

export default TopBar;
