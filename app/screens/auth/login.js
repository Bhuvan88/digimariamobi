import React, {useState, useEffect} from 'react';
import {
  VStack,
  Box,
  Divider,
  NativeBaseProvider,
  Image,
  StatusBar,
  HStack,
  ScrollView,
  IconButton,
  Icon,
  Input,
  FormControl,
  WarningOutlineIcon,
  Center,
  Button,
} from 'native-base';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Alert,
  I18nManager,
  Dimensions,
} from 'react-native';
import 'react-native-gesture-handler';
const {height, width} = Dimensions.get('window');
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import MyIcon from 'react-native-vector-icons/FontAwesome';
import CodePin from 'react-native-pin-code';
import { useDetail } from '../../context/authProvider';
import LinearGradient from 'react-native-linear-gradient';
//import AsyncStorage from '@react-native-async-storage/async-storage';
//import { TouchableOpacity } from 'react-native-web';
export default function Register(props) {
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(null);
  const {mobileCheck,oTP,LoginCheck,setSuccess,
		success} = useDetail();
  const submitLogin = async () => {
    if (username == null) {
      setEmailError('Please Enter your mobile number');
      return;
    }
    mobileCheck(username)
  };
  const onSuccess=()=>{
    LoginCheck(username);
   
    setShow(false)
  }
  useEffect(
    ()=>{
      if(oTP){
       // alert(oTP)
        setShow(true)
      }

    },[oTP]
  )
  useEffect(
    ()=>{
      if(success){
       //props.navigation.navigate('Home');
       props.navigation.reset({ routes: [{ name: 'Home' }] });
      }

    },[success]
  )

  return (
    <NativeBaseProvider>
      <LinearGradient
          colors={['#FFDD00', '#FBB034']}
          style={{
            flex: 1
          }}>
      <View
        style={{flex: 2, justifyContent: 'center'}}>
          
        <Image
          source={require('../../assets/logo.png')}
          resizeMode="contain"
          style={{width: '80%', height: 80, alignSelf: 'center'}}
        />
        <View
          style={{
            backgroundColor: '#F2F3F4',
            borderRadius: 8,
            shadowColor: '#000000',
            shadowRadius: 2,
            elevation: 4,
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 2.0,
            margin: 8,
          }}>
          {/* <Text style={{color:'#fff'}} fontSize="md" my={1}>
							Please login with your credentials
						</Text> */}
          <HStack
            padding={5}
            w="100%"
            alignItems="center"
           // borderRadius={15}
            flexDirection={'column'}>
            <FormControl
              isInvalid={emailError}
              style={{justifyContent: 'center'}}>
              <FormControl.Label>
                <Text style={{color: '#000'}}>Mobile Number</Text>
              </FormControl.Label>
              <Input
              
                value={username}
                placeholder={'Enter your mobile number'}
                backgroundColor={'#262A30'}
                maxLength={10}
                keyboardType="numeric"
                variant="filled"
                style={{
                  color: '#fff',
                  fontSize: 16,
                  height: 50,
                  borderRadius:10
                }}
                w={{base: '100%'}}
                onChangeText={text => {
                  setEmailError('');
                  setUsername(text);
                }}
                InputLeftElement={
                  <Icon
                    as={<MyIcon name="mobile" />}
                    size={6}
                    ml="2"
                    color="#fff"
                  />
                }
              />

              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {emailError}
              </FormControl.ErrorMessage>
            </FormControl>

            <Button
              onPress={() => submitLogin()}
              w={'50%'}
              mt={7}
              borderRadius={10}
              backgroundColor={'#000000'}>
              <Text style={{paddingTop: 2, textAlign: 'center', color: '#fff',fontWeight:'bold',fontSize:16}}>
                SIGN IN
              </Text>
            </Button>
          </HStack>
        </View>
      </View>
      <Modal
        transparent={true}
        style={{
          backgroundColor: 'rgba(52, 52, 52, 0.8)',
          borderColor: 'rgba(0, 0, 0, 0.1)',
        }}
        visible={show}
        animationType="slide"
        swipeToClose={false}
        onRequestClose={() => null}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(52, 52, 52, 0.8)',
            borderColor: 'rgba(0, 0, 0, 0.1)',
          }}>
          <View style={{flex: 1}}></View>
          <View style={{flex: 1}}>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <CodePin
                //ref={ref => (this.ref = ref)}
                autoFocusFirst
                code={'1234'}
                text="We have send you on sms on with 4 digit verification code"
                error="Invalid"
                number={4}
                keyboardType="number-pad"
                errorStyle={{paddingTop: 0}}
                textStyle={{
                  textAlign: 'center',
                  color: '#000',
                  fontSize: 14,
                  marginTop: 30,
                  bottom: 10,
                }}
                //checkPinCode={(code, callback) => callback(code === this.props.signUpdata.result)}
                success={onSuccess}
                containerStyle={{
                  height: 160,
                  width: width - 30,
                  borderRadius: 10,
                }}
                pinStyle={{height: 40, paddingTop: 15, color: '#000'}}
                containerPinStyle={{marginTop: 0}}
              />
              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  paddingTop: 10,
                  backgroundColor: '#fff',
                  bottom: 35,
                }}
                onPress={() => props.navigation.navigate('Login')}>
                <Text style={{color: '#e84590', fontWeight: '600'}}>
                  Resend OTP
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flex: 1}}></View>
        </View>
      </Modal>
      </LinearGradient>
    </NativeBaseProvider>
  );
}
