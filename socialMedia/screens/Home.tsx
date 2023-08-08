import {SafeAreaView, StatusBar, View} from 'react-native';

import {TopBar, Content} from '../components';
import React from 'react';

const Home = ({navigation}: any): JSX.Element => {
  return (
    <SafeAreaView
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <StatusBar barStyle="dark-content" backgroundColor={'#fff'} />
      <View style={{width: '100%', flex: 1}}>
        <TopBar navigation={navigation} />
        <Content />
      </View>
    </SafeAreaView>
  );
};

export default Home;
