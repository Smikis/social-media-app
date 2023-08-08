import React from 'react';

import {View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import {Home, Profile, Register, Settings, Login} from './screens';

import {useContext} from 'react';

import AppContext from './contexts/AppContext';
import NewPost from './screens/NewPost';
import {User} from './types/User';
import EditProfile from './screens/EditProfile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MemoizedProfile = React.memo(Profile);

const HomeTabs = ({user}: {user: User}): JSX.Element => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#181818',
          borderTopWidth: 0.2,
          borderTopColor: '#B0B3B8',
          height: 50,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name={focused ? 'home-sharp' : 'home-outline'}
              size={25}
              color="#E4E6EB"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        children={() => <MemoizedProfile user={user} />}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name={focused ? 'person-sharp' : 'person-outline'}
              size={25}
              color="#E4E6EB"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const ctx = useContext(AppContext);

  if (!ctx) return null;

  const {user} = ctx;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user.id ? (
          <>
            <Stack.Screen
              name="HomeTabs"
              options={{headerShown: false}}
              children={() => <HomeTabs user={user} />}
            />
            <Stack.Screen
              name="Settings"
              options={{
                animationEnabled: false,
              }}
              component={Settings}
            />
            <Stack.Screen
              name="NewPost"
              options={{
                headerTitle: 'New Post',
                headerBackground: () => {
                  return (
                    <View
                      style={{
                        backgroundColor: '#181818',
                        height: '100%',
                        width: '100%',
                      }}
                    />
                  );
                },
                headerTitleStyle: {
                  color: '#E4E6EB',
                },
                headerTintColor: '#E4E6EB',
              }}
              component={NewPost}
            />
            <Stack.Screen
              name="EditProfile"
              options={{
                headerTitle: 'Edit Profile',
                headerBackground: () => {
                  return (
                    <View
                      style={{
                        backgroundColor: '#181818',
                        height: '100%',
                        width: '100%',
                      }}
                    />
                  );
                },
                headerTitleStyle: {
                  color: '#E4E6EB',
                },
                headerTintColor: '#E4E6EB',
              }}
              component={EditProfile}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              options={{headerShown: false}}
              name="Login"
              component={Login}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="Register"
              component={Register}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
