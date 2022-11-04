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
import Logo from '../../assets/logo.png'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import AsyncStorage from '@react-native-async-storage/async-storage';
//import { TouchableOpacity } from 'react-native-web';
import  {HeaderWithLogoComponent,CardGradientComponent,SuccessModalComponent,HeaderComponent}  from '../../components/component';
export default function Home(props) {
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(null);
  
  const submitLogin = async () => {
    if (username == null) {
      setEmailError('Please Enter your mobile number');
      return;
    }
    setShow(true)
  };
  const onSuccess=()=>{
    setShow(false);

  }
  const onpressQR=()=>{
    props.navigation.navigate('QRScan');
  }
  const onpressMyBook=()=>{
    props.navigation.navigate('MyBooks');
  }
  const onpressProfile=()=>{
    props.navigation.navigate('Profile');
  }
  const alertLogout=async()=>{
    await AsyncStorage.removeItem('token');
    props.navigation.reset({ routes: [{ name: 'Login' }] });
  }
  
  
  return (
    <Box flex="1" style={{backgroundColor:'#F2F3F4'}}>
     <HeaderWithLogoComponent logo={Logo} wrapperColor="#151218" bgColor="#fece2e" headerTitle={'Home'}
     rightContent={<View style={{}}>
     <View style={{}} >
      
          <IconButton
           onPress={() => Alert.alert(
             'Alert',
            'Are you sure want to logout?',
             [
               {
                 text: 'Cancel',
                 onPress: () => console.log("Cancel Pressed"),
                 style: "cancel"
               },
               { text: 'OK', onPress: () => alertLogout() }
             ]
           )}
           icon={
             <Icon
               size={30}
               as={MaterialIcon}
               name="logout"
               color="#808080"
             />
           }
         />
         </View>
   </View>}
     >
            <View style={{marginTop:50}}>
                <Text style={{color:'#000',textAlign:'center',fontSize:16,fontWeight:'bold'}}>Good Morning Kumar!</Text>
            </View>

            <HStack space={4} justifyContent={'space-between'} mt={5} m={1} >
						<CardGradientComponent
								textValue={'My Books'}
								buttonBackground={'#0AB4B6'}
								onPress={onpressMyBook}
								accessId={'attendancehistory'}
								accessLabel={'attendancehistory'}
								iconType={{icon:'book',iconFamily:'FontAwesome',iconColor:'#fff'}}
              />
						<CardGradientComponent
								textValue={'Activities'}
								buttonBackground={'#34C759'}
								onPress={onSuccess}
								accessId={'attendancehistory'}
								accessLabel={'attendancehistory'}
								iconType={{icon:'edit',iconFamily:'FontAwesome',iconColor:'#fff'}}
								//extraComponent={onSuccess()}	
              />
						
					</HStack>

          <HStack space={4} justifyContent={'space-between'} mt={4} m={1} >
						<CardGradientComponent
								textValue={'Scan QR Code'}
								buttonBackground={'#1a251d'}
								onPress={onpressQR}
								accessId={'attendancehistory'}
								accessLabel={'attendancehistory'}
								iconType={{icon:'qrcode',iconFamily:'FontAwesome',iconColor:'#fff'}}
              />
						<CardGradientComponent
								textValue={'Profile'}
								buttonBackground={'#867AE9'}
								onPress={onpressProfile}
								accessId={'attendancehistory'}
								accessLabel={'attendancehistory'}
								iconType={{icon:'user',iconFamily:'FontAwesome',iconColor:'#fff'}}
								//extraComponent={onSuccess()}	
              />
						
					</HStack>
          <HStack space={4} justifyContent={'space-between'} mt={4} m={1} >
          <CardGradientComponent
								textValue={'Contact Support'}
								buttonBackground={'#B980F0'}
								onPress={onSuccess}
								accessId={'attendancehistory'}
								accessLabel={'attendancehistory'}
								iconType={{icon:'question-circle-o',iconFamily:'FontAwesome',iconColor:'#fff'}}
								//extraComponent={onSuccess()}	
              />
              </HStack>

     </HeaderWithLogoComponent>
     </Box>
    
  );
}
