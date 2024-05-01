import React, {useState, useEffect} from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useWindowDimensions} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {uid} from 'uid';

const ProfileScreen = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  const [wallpaper, setWallpaper] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [prevName, setPrevName] = useState('');
  const [name, setName] = useState('');
  const [allForcastData, setAllForcastData] = useState([]);
  console.log('allForcastData=====>', allForcastData);

  useEffect(() => {
    getData();
    getForcastData();
  }, []);

  useEffect(() => {
    setData();
  }, [name, avatar, wallpaper]);

  const setData = async () => {
    try {
      const data = {
        name,
        avatar,
        wallpaper,
      };

      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(`ProfileScreen`, jsonData);
      console.log('Дані збережено в AsyncStorage');
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem(`ProfileScreen`);
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        //console.log('parsedData==>', parsedData);
        setName(parsedData.name);
        setAvatar(parsedData.avatar);
        setWallpaper(parsedData.wallpaper);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

  const getForcastData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem(`AllForcastData`);
      if (jsonData !== null) {
        const parsedForcastData = JSON.parse(jsonData);
        console.log('parsedForcastData==>', parsedForcastData);
        setAllForcastData(parsedForcastData);
        //allForcastData;
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

  /////////////////Image Picer
  const WallpaperPicer = () => {
    let options = {
      storageOptios: {
        path: 'image',
      },
    };

    launchImageLibrary(options, response => {
      if (!response.didCancel) {
        setWallpaper(response.assets[0].uri);
      } else {
        console.log('Вибір скасовано');
      }
    });
  };

  const AvatarPicer = () => {
    let options = {
      storageOptios: {
        path: 'image',
      },
    };

    launchImageLibrary(options, response => {
      if (!response.didCancel) {
        setAvatar(response.assets[0].uri);
      } else {
        console.log('Вибір скасовано');
      }
    });
  };

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
          <View>
            {/**Avatart Block */}
            <View style={{alignItems: 'center'}}>
              {/**wallpaper */}
              <TouchableOpacity
                onPress={() => {
                  WallpaperPicer();
                }}
                style={{
                  width: width,
                  height: 200,
                  borderWidth: 3,
                  borderColor: '#f44fac',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  alignItems: 'center',
                  shadowColor: '#f44fac',
                  shadowOffset: {width: 0, height: 10},
                  shadowOpacity: 0.9,
                  shadowRadius: 10,
                }}>
                {wallpaper ? (
                  <Image
                    source={{uri: wallpaper}}
                    style={{
                      width: width,
                      height: 200,
                      borderWidth: 3,
                      borderColor: '#f44fac',
                    }}
                  />
                ) : (
                  <Text
                    style={{
                      color: '#f44fac',
                      fontSize: 40,
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    Press & add wallpaper
                  </Text>
                )}
              </TouchableOpacity>

              {/**Avatar */}
              <TouchableOpacity
                onPress={() => {
                  AvatarPicer();
                }}
                style={{
                  width: 250,
                  height: 250,
                  marginTop: -100,
                  borderWidth: 3,
                  borderRadius: 150,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: '#f44fac',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  shadowColor: '#f44fac',
                  shadowOffset: {width: 0, height: 10},
                  shadowOpacity: 0.9,
                  shadowRadius: 10,
                }}>
                {avatar ? (
                  <Image
                    source={{uri: avatar}}
                    style={{
                      width: 250,
                      height: 250,
                      borderRadius: 150,
                      borderWidth: 3,
                      borderColor: '#f44fac',
                    }}
                  />
                ) : (
                  <Text
                    style={{
                      color: '#f44fac',
                      fontSize: 30,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      shadowColor: '#f44fac',
                      shadowOffset: {width: 0, height: 10},
                      shadowOpacity: 0.9,
                      shadowRadius: 10,
                    }}>
                    Press & add avatar
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            <View style={{alignItems: 'center'}}>
              {!name ? (
                <View>
                  <TextInput
                    placeholderTextColor="rgba(244, 79, 172, 0.7)"
                    placeholder="Enter name..."
                    value={prevName}
                    onChangeText={setPrevName}
                    style={{
                      shadowOffset: {width: 3, height: 4},
                      shadowOpacity: 0.8,
                      elevation: 9,
                      marginTop: 5,
                      marginBottom: 15,
                      paddingLeft: 10,
                      fontSize: 20,
                      borderWidth: 3,
                      borderColor: 'transparent',
                      borderBottomColor: '#f44fac',
                      color: '#f44fac',
                      backgroundColor: 'transparent',
                      width: 280,
                      height: 60,
                      shadowColor: '#000',
                      shadowOffset: {width: 0, height: 10},
                      shadowOpacity: 0.9,
                      shadowRadius: 10,
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setName(prevName);
                    }}
                    style={{
                      marginBottom: 20,
                      width: 280,
                      height: 50,
                      backgroundColor: '#f44fac',
                      borderRadius: 15,
                      borderWidth: 3,
                      borderColor: '#f44fac',
                      alignItems: 'center',
                      justifyContent: 'center',
                      shadowColor: '#000',
                      shadowOffset: {width: 30, height: 50},
                      shadowOpacity: 0.9,
                      shadowRadius: 10,
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        shadowColor: '#000',
                        shadowOffset: {width: 0, height: 10},
                        shadowOpacity: 0.9,
                        shadowRadius: 10,
                      }}>
                      Save name
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  <Text
                    style={{
                      color: '#f44fac',
                      fontSize: 40,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      shadowColor: '#f44fac',
                      shadowOffset: {width: 0, height: 10},
                      shadowOpacity: 0.9,
                      shadowRadius: 10,
                    }}>
                    {name}
                  </Text>
                </View>
              )}
            </View>

            <View>
              <ScrollView>
                {allForcastData &&
                  allForcastData
                    .filter(
                      (forcast, index, self) =>
                        index === self.findIndex(f => f.name === forcast.name),
                    )
                    .map(forcast => {
                      return (
                        <View key={uid()}>
                          <Text style={{color: '#fff'}}>
                            {forcast.myForcast}
                          </Text>
                          <Text style={{color: '#fff'}}>{forcast.name}</Text>
                        </View>
                      );
                    })}
              </ScrollView>
            </View>
          </View>

          {/**BTN Back */}
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              position: 'absolute',
              bottom: 20,
              right: 20,
              borderWidth: 2,
              borderColor: '#f44fac',
              padding: 3,
              borderRadius: 10,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              shadowColor: '#000',
              shadowOffset: {width: 30, height: 50},
              shadowOpacity: 0.9,
              shadowRadius: 10,
            }}>
            <Entypo
              name="back"
              style={{
                fontSize: 60,
                color: '#f44fac',
                shadowColor: '#f44fac',
                shadowOffset: {width: 30, height: 50},
                shadowOpacity: 0.9,
                shadowRadius: 10,
              }}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ProfileScreen;
