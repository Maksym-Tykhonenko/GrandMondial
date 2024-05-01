import React, {useState, useEffect} from 'react';
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
  TextInput,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {uid} from 'uid';
import {champs} from '../data/champs';
import {useWindowDimensions} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  const [initialArrey, setInitialArrey] = useState(champs);
  const [modalVisible, setModalVisible] = useState(false);

  const [name, setName] = useState('');
  const [dateOfTheNearestTournament, setDateOfTheNearestTournament] =
    useState('');
  const [dates, setDates] = useState('');
  const [countriesInWillBeHeld, setCountriesInWillBeHeld] = useState('');
  const [averageTicketPrice, setAverageTicketPrice] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);

  const [mundial, setMundial] = useState([]);
  console.log('mundial_0==>', mundial);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setData();
  }, [mundial]);

  const setData = async () => {
    try {
      const data = {
        mundial,
      };

      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(`HomeScreen`, jsonData);
      console.log('Дані збережено в AsyncStorage');
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem(`HomeScreen`);
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        //console.log('parsedData==>', parsedData);
        setMundial(parsedData.mundial);
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
        setPhoto(response.assets[0].uri);
      } else {
        console.log('Вибір скасовано');
      }
    });
  };

  const handleAddMundiall = () => {
    let newMundial = {
      name,
      dateOfTheNearestTournament,
      dates,
      countriesInWillBeHeld,
      averageTicketPrice,
      description,
      photo,
    };

    setMundial([...mundial, newMundial]);

    setName('');
    setDateOfTheNearestTournament('');
    setDates('');
    setCountriesInWillBeHeld('');
    setAverageTicketPrice('');
    setDescription('');

    handleCloseModal();
  };

  const handleCloseModal = () => {
    setModalVisible(!modalVisible);
  };

  //console.log(initialArrey);
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
          {/**BTN Profile & AddMundial*/}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={{marginLeft: 10}}
              onPress={() => {
                navigation.navigate('ProfileScreen');
              }}>
              <MaterialCommunityIcons
                name="face-man-shimmer"
                style={{fontSize: 60, color: '#f44fac'}}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{marginRight: 10}}
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
              {mundial &&
                mundial.map(item => {
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
                        source={{uri: item.photo}}
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
              visible={modalVisible}>
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
                      onPress={() => handleCloseModal()}>
                      <FontAwesome
                        name="close"
                        style={{color: '#f44fac', fontSize: 60}}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={{alignItems: 'center'}}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 30,
                        color: '#f44fac',
                      }}>
                      Add event
                    </Text>

                    <ScrollView>
                      {/**name input */}
                      <TextInput
                        placeholderTextColor="rgba(244, 79, 172, 0.7)"
                        placeholder="Enter name..."
                        value={name}
                        onChangeText={setName}
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

                      {/**dateOfTheNearestTournament input */}
                      <TextInput
                        placeholderTextColor="rgba(244, 79, 172, 0.7)"
                        placeholder="Date of the Next Tournament..."
                        keyboardType="numeric"
                        value={dateOfTheNearestTournament}
                        onChangeText={setDateOfTheNearestTournament}
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

                      {/**dates input */}
                      <TextInput
                        placeholderTextColor="rgba(244, 79, 172, 0.7)"
                        placeholder="Enter dates..."
                        multiline={true}
                        value={dates}
                        onChangeText={setDates}
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

                      {/**countriesInWillBeHeld input */}
                      <TextInput
                        placeholderTextColor="rgba(244, 79, 172, 0.7)"
                        placeholder="Сompetition will take place..."
                        multiline={true}
                        value={countriesInWillBeHeld}
                        onChangeText={setCountriesInWillBeHeld}
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

                      {/**averageTicketPrice input */}
                      <TextInput
                        placeholderTextColor="rgba(244, 79, 172, 0.7)"
                        placeholder="Average ticket price..."
                        multiline={true}
                        value={averageTicketPrice}
                        onChangeText={setAverageTicketPrice}
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

                      {/**description input */}
                      <TextInput
                        placeholderTextColor="rgba(244, 79, 172, 0.7)"
                        placeholder="Description..."
                        multiline={true}
                        value={description}
                        onChangeText={setDescription}
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

                      {/**BTN add photo */}
                      <TouchableOpacity
                        onPress={() => {
                          ImagePicer();
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
                          Add photo
                        </Text>
                      </TouchableOpacity>

                      {/**BTN Save */}
                      <TouchableOpacity
                        onPress={() => {
                          handleAddMundiall();
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
                          shadowOffset: {width: 0, height: 10},
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
                          Save
                        </Text>
                      </TouchableOpacity>

                      <View style={{height: 450}}></View>
                    </ScrollView>
                  </View>
                </ImageBackground>
              </View>
            </Modal>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;
