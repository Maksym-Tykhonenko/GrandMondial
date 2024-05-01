import React, {useState, useEffect} from 'react';
import {
  Button,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  Modal,
  TextInput,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useWindowDimensions} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailsScreen = ({navigation, route}) => {
  const {height, width} = useWindowDimensions();
  const [hideTicketPriceInfo, setHideTicketPriceInfo] = useState(false);
  const [hideDescriptionInfo, setHideDescriptionInfo] = useState(false);
  const [openGallaryModal, setOpenGallaryModal] = useState(false);
  const [gallariArrey, setGallariArrey] = useState([]);
  const [openForecastModal, setOpenForecastModal] = useState(false);
  const [whoWillBeTheWinner, setWhoWillBeTheWinner] = useState('');
  const [myForcast, setMyForcast] = useState();
  console.log('whoWillBeTheWinner==>', whoWillBeTheWinner);
  const {item} = route.params;
  //console.log('item==>', item.photo);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setData();
  }, [myForcast, gallariArrey]);

  useEffect(() => {
    setForcastData();
  }, [myForcast]);

  const setData = async () => {
    try {
      const data = {
        myForcast,
        gallariArrey,
      };

      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(`DetailsScreen${item.name}`, jsonData);
      console.log('Дані збережено в AsyncStorage');
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  const setForcastData = async () => {
    try {
      const existingData = await AsyncStorage.getItem(`AllForcastData`);
      let dataArray = existingData ? JSON.parse(existingData) : [];

      const newData = {
        name: item.name,
      };

      if (myForcast) {
        // Якщо є прогноз, додайте його до нових даних
        newData.myForcast = myForcast;
      }

      dataArray.push(newData); // Додайте нові дані до масиву

      await AsyncStorage.setItem(`AllForcastData`, JSON.stringify(dataArray));
      console.log('Дані збережено в AsyncStorage');
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem(`DetailsScreen${item.name}`);
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        //console.log('parsedData==>', parsedData);
        setMyForcast(parsedData.myForcast);
        setGallariArrey(parsedData.gallariArrey);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

  /////////////////ImagePicer
  const ImagePicer = () => {
    let options = {
      storageOptios: {
        path: 'image',
      },
    };

    launchImageLibrary(options, response => {
      if (!response.didCancel) {
        setGallariArrey([response.assets[0].uri, ...gallariArrey]);
      } else {
        console.log('Вибір скасовано');
      }
    });
  };

  const modalForecastCloce = () => {
    setMyForcast(whoWillBeTheWinner);
    setOpenForecastModal(false);
  };
  return (
    <View style={{flex: 1}}>
      <ImageBackground style={{flex: 1}} source={require('../assets/bgr.jpeg')}>
        <SafeAreaView
          style={{
            position: 'relative',
            flex: 1,
            alignItems: 'center',
          }}>
          <View
            style={{
              flex: 1,
              width: width * 0.9,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            <ScrollView>
              {/** name*/}
              <View style={{alignItems: 'center', marginBottom: 10}}>
                <Text
                  style={{
                    color: '#f44fac',
                    fontSize: 30,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  {item.name}
                </Text>
              </View>

              {/** photo*/}
              <View style={{marginBottom: 10}}>
                {item.photo.length > 3 ? (
                  <Image
                    style={{width: width * 0.9, height: 200}}
                    source={{uri: item.photo}}
                  />
                ) : (
                  <Image
                    style={{width: width * 0.9, height: 200}}
                    source={item.photo}
                  />
                )}
              </View>

              <View style={{alignItems: 'center'}}>
                {myForcast ? (
                  <Text
                    style={{
                      marginBottom: 10,
                      color: '#f44fac',
                      fontSize: 25,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      shadowColor: '#000',
                      shadowOffset: {width: 0, height: 10},
                      shadowOpacity: 0.9,
                      shadowRadius: 10,
                    }}>
                    My forcast: {myForcast}
                  </Text>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setOpenForecastModal(true);
                    }}
                    style={{
                      marginBottom: 10,
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
                      Make a forecast
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    setOpenGallaryModal(true);
                  }}
                  style={{
                    marginBottom: 10,
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
                    Open gallery
                  </Text>
                </TouchableOpacity>
              </View>

              {/** dateOfTheNearestTournament*/}
              <View style={{marginBottom: 10}}>
                <Text
                  style={{color: '#f44fac', fontSize: 20, fontWeight: 'bold'}}>
                  Date of the Next Tournament:
                  <Text
                    style={{
                      color: '#f44fac',
                      fontSize: 25,
                      fontWeight: 'bold',
                    }}>
                    {'  '}
                    {item.dateOfTheNearestTournament}
                  </Text>
                </Text>
              </View>

              {/** dates*/}
              <View style={{marginBottom: 10}}>
                <Text
                  style={{color: '#f44fac', fontSize: 20, fontWeight: 'bold'}}>
                  Dates:
                  <Text
                    style={{
                      color: '#f44fac',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}>
                    {'  '}
                    {item.dates}
                  </Text>
                </Text>
              </View>

              {/** countriesInWillBeHeld*/}
              <View style={{marginBottom: 10}}>
                <Text
                  style={{color: '#f44fac', fontSize: 20, fontWeight: 'bold'}}>
                  Сompetition will take place:
                  <Text
                    style={{
                      color: '#f44fac',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}>
                    {'  '}
                    {item.countriesInWillBeHeld}
                  </Text>
                </Text>
              </View>

              {/** averageTicketPrice*/}
              <View style={{marginBottom: 10}}>
                {hideTicketPriceInfo ? (
                  <Pressable
                    style={{}}
                    onPress={() => {
                      setHideTicketPriceInfo(false);
                    }}>
                    <Text
                      style={{
                        color: '#f44fac',
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}>
                      Average ticket price{' '}
                      <AntDesign name="arrowright" style={{fontSize: 20}} />
                    </Text>
                  </Pressable>
                ) : (
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        setHideTicketPriceInfo(true);
                      }}>
                      <Text
                        style={{
                          color: '#f44fac',
                          fontSize: 20,
                          fontWeight: 'bold',
                        }}>
                        Average ticket price{' '}
                        <AntDesign name="arrowdown" style={{fontSize: 20}} />
                      </Text>
                    </TouchableOpacity>

                    <Text
                      style={{
                        color: '#f44fac',
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}>
                      {'  '}
                      {item.averageTicketPrice}
                    </Text>
                  </View>
                )}
              </View>

              {/** description*/}
              <View style={{marginBottom: 10}}>
                {hideDescriptionInfo ? (
                  <Pressable
                    style={{}}
                    onPress={() => {
                      setHideDescriptionInfo(false);
                    }}>
                    <Text
                      style={{
                        color: '#f44fac',
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}>
                      Description{' '}
                      <AntDesign name="arrowright" style={{fontSize: 20}} />
                    </Text>
                  </Pressable>
                ) : (
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        setHideDescriptionInfo(true);
                      }}>
                      <Text
                        style={{
                          color: '#f44fac',
                          fontSize: 20,
                          fontWeight: 'bold',
                        }}>
                        Description{' '}
                        <AntDesign name="arrowdown" style={{fontSize: 20}} />
                      </Text>
                    </TouchableOpacity>

                    <Text
                      style={{
                        color: '#f44fac',
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}>
                      {'  '}
                      {item.description}
                    </Text>
                  </View>
                )}
              </View>
            </ScrollView>
          </View>
          {/**BTN BAck */}
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

          {/**Modal gallary */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={openGallaryModal}>
            <View
              style={{
                flex: 1,
                marginTop: '20%',
                backgroundColor: '#00000022',
                borderColor: '#f44fac',
                borderWidth: 1,
              }}>
              <ImageBackground
                source={require('../assets/bgr.jpeg')}
                style={{flex: 1}}>
                <View style={{alignItems: 'flex-end'}}>
                  <TouchableOpacity
                    style={{marginRight: 10, marginTop: 10}}
                    onPress={() => setOpenGallaryModal(false)}>
                    <FontAwesome
                      name="close"
                      style={{color: '#f44fac', fontSize: 60}}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{alignItems: 'center'}}>
                  <View style={{alignItems: 'center'}}>
                    <TouchableOpacity
                      onPress={() => {
                        ImagePicer();
                      }}
                      style={{
                        marginBottom: 10,
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
                        Add photo
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View>
                    <FlatList
                      data={gallariArrey}
                      renderItem={({item}) => (
                        <View
                          style={{
                            width: 150,
                            height: 150,
                            margin: 10,
                            borderWidth: 1,
                            borderColor: '#f44fac',
                          }}>
                          <Image
                            source={{uri: item}}
                            style={{
                              width: 150,
                              height: 150,
                              margin: 10,
                              borderWidth: 1,
                              borderColor: '#f44fac',
                            }}
                          />
                        </View>
                      )}
                      numColumns={2}
                    />
                  </View>
                </View>
              </ImageBackground>
            </View>
          </Modal>

          {/**Modal forecast */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={openForecastModal}>
            <View
              style={{
                flex: 1,
                marginTop: '20%',
                backgroundColor: '#00000022',
                borderColor: '#f44fac',
                borderWidth: 1,
              }}>
              <ImageBackground
                source={require('../assets/bgr.jpeg')}
                style={{flex: 1}}>
                <View style={{alignItems: 'flex-end'}}>
                  <TouchableOpacity
                    style={{marginRight: 10, marginTop: 10}}
                    onPress={() => setOpenForecastModal(false)}>
                    <FontAwesome
                      name="close"
                      style={{color: '#f44fac', fontSize: 60}}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{alignItems: 'center'}}>
                  <View>
                    <TextInput
                      placeholderTextColor="rgba(244, 79, 172, 0.7)"
                      placeholder="Who will be the winner?"
                      value={whoWillBeTheWinner}
                      onChangeText={setWhoWillBeTheWinner}
                      multiline={true}
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
                  </View>

                  <View style={{alignItems: 'center'}}>
                    <TouchableOpacity
                      onPress={() => {
                        modalForecastCloce();
                      }}
                      style={{
                        marginBottom: 10,
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
                        Make a forecast
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ImageBackground>
            </View>
          </Modal>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default DetailsScreen;
