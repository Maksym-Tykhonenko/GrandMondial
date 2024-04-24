import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

const DetailsScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{marginBottom: 10}}>Details Screen</Text>

      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{borderWidth: 1}}>
        <Text>Go back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DetailsScreen;
