import React from 'react';

import {ActivityIndicator, View} from 'react-native';

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#181818',
      }}>
      <ActivityIndicator size="large" color="#E4E6EB" />
    </View>
  );
};

export default Loading;
