import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {uid} from 'uid';
import {champs} from '../data/champs';
import {useWindowDimensions} from 'react-native';

const HomeScreen = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  const [initialArrey, setInitialArrey] = useState(champs);
  const [modalVisible, setModalVisible] = useState(false);
  console.log(initialArrey);
  return (
    <View
      style={{
        flex: 1,
      }}>
      <ImageBackground source={require('../assets/bgr.jpeg')} style={{flex: 1}}>
        <SafeAreaView
          style={{
            flex: 1,
          }}>
          {/**BTN Profile */}
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              style={{}}
              onPress={() => {
                navigation.navigate('ProfileScreen');
              }}>
              <MaterialCommunityIcons
                name="face-man-shimmer"
                style={{fontSize: 60, color: '#f44fac'}}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{}}
              onPress={() => {
                setModalVisible(true);
              }}>
              <FontAwesome
                name="plus"
                style={{fontSize: 60, color: '#f44fac'}}
              />
            </TouchableOpacity>
          </View>

          {/**Arrey of champs */}
          <View style={{alignItems: 'center'}}>
            <ScrollView>
              {initialArrey.map(item => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('DetailsScreen', {item: item});
                    }}
                    style={{
                      alignItems: 'center',
                      width: width * 0.9,
                      marginBottom: 15,
                      borderWidth: 2,
                      borderColor: '#f44fac',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                    key={uid()}>
                    <Image
                      source={item.photo}
                      style={{
                        height: 160,
                        width: width * 0.9 - 6,
                      }}
                    />
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 20,
                        color: '#f44fac',
                      }}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
              <View style={{height: 150}}></View>
            </ScrollView>

            {/**Modal add champs */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 22,
                }}>
                <View
                  style={{
                    margin: 20,
                    backgroundColor: 'white',
                    borderRadius: 20,
                    padding: 35,
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                  }}>
                  <Text style={{marginBottom: 15, textAlign: 'center'}}>
                    Hello World!
                  </Text>
                  <Pressable
                    style={{}}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text
                      style={{
                        color: '#000',
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}>
                      Hide Modal
                    </Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;
