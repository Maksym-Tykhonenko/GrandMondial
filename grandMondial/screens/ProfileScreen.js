import React from 'react';
import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const ProfileScreen = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <ImageBackground style={{flex: 1}} source={require('../assets/bgr.jpeg')}>
        <View
          style={{
            position: 'relative',
            flex: 1,
            alignItems: 'center',
            marginTop: 40,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{position: 'absolute', bottom: 20, right: 20}}>
            <Entypo name="back" style={{fontSize: 60, color: '#f44fac'}} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ProfileScreen;
