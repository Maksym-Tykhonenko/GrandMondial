import React, {useState} from 'react';
import {
  Button,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useWindowDimensions} from 'react-native';

const DetailsScreen = ({navigation, route}) => {
  const {height, width} = useWindowDimensions();
  const [hideTicketPriceInfo, setHideTicketPriceInfo] = useState(false);
  const [hideDescriptionInfo, setHideDescriptionInfo] = useState(false);
  const {item} = route.params;
  console.log('item==>', item.name);
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
                <Image
                  style={{width: width * 0.9, height: 200}}
                  source={item.photo}
                />
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
                  Date of the Next Tournament:
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
            style={{position: 'absolute', bottom: 20, right: 20}}>
            <Entypo name="back" style={{fontSize: 60, color: '#f44fac'}} />
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default DetailsScreen;
