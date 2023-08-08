import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const LoginOption = ({
  name,
  size,
  color,
  text,
}: {
  name: string;
  size: number;
  color: string;
  text: string;
}) => {
  return (
    <View
      style={{
        backgroundColor: '#FFF',
        width: 105,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        flexDirection: 'row',
      }}>
      <Icon name={name} size={size} color={color} style={{marginRight: 5}} />
      <Text style={{color: '#000'}}>{text}</Text>
    </View>
  );
};

export default LoginOption;
