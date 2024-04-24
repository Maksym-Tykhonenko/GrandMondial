import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <View
        style={{
          position: 'relative',
          flex: 1,
          alignItems: 'center',
          marginTop: 40,
        }}>
        <Text style={{marginBottom: 10}}>Home Screen</Text>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ProfileScreen');
          }}
          style={{position: 'absolute', left: 20}}>
          <MaterialCommunityIcons
            name="face-man-shimmer"
            style={{fontSize: 50}}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('DetailsScreen');
          }}
          style={{borderWidth: 1, marginBottom: 10}}>
          <Text>Go to Details Screen</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
