import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const ProfileScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          position: 'relative',
          flex: 1,
          alignItems: 'center',
          marginTop: 40,
        }}>
        <Text style={{marginBottom: 10}}>Profile Screen</Text>

        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{position: 'absolute', bottom: 20, right: 20}}>
          <Entypo name="back" style={{fontSize: 40}} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;
