import React, {useState, useEffect} from 'react';
import {
  Image,
  FormControl,
  Box,
  Stack,
  Button,
  Center,
  HStack,
  VStack,
  TextArea,
  Icon,
  Input,
  WarningOutlineIcon,
  CheckIcon,
  Select,
  KeyboardAvoidingView,
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
  NativeModules
} from 'react-native';
import 'react-native-gesture-handler';
const {height, width} = Dimensions.get('window');
import MyIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  launchCamera,
  launchImageLibrary
} from 'react-native-image-picker';
//https://aboutreact.com/example-of-image-picker-in-react-native/

import {
  CardGradientComponent,
  HeaderComponent,
  SuccessModalComponent,
} from '../../components/component';

const includeExtra = true;

export default function Home(props) {
  const [show, setShow] = useState(false);
  const [showQrCode, setShowQrCode] = useState(true);
  const submitLogin = async () => {};
  const onSuccess = () => {
    setShow(false);
    // props.navigation.navigate('Home');
  };
  const [filePath, setFilePath] = useState({});

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };
 
  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };
 
  const captureImage = async (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();

    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response) => {
        console.log('Response = ', response);
 
        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        console.log('base64 -> ', response.base64);
        console.log('uri -> ', response.uri);
        console.log('width -> ', response.width);
        console.log('height -> ', response.height);
        console.log('fileSize -> ', response.fileSize);
        console.log('type -> ', response.type);
        console.log('fileName -> ', response.fileName);
        setFilePath(response);
      });
    }
  };
 
  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);
 
      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      console.log('base64 -> ', response.base64);
      console.log('uri -> ', response.uri);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      console.log('fileName -> ', response.fileName);
      
      setFilePath(response);
    });
  };
 


  return (
    <Box flex="1" style={{backgroundColor: '#F2F3F4'}}>
      <HeaderComponent
        wrapperColor="#151218"
        bgColor="#fece2e"
        headerTitle={'My Profile'}
        nav={props.navigation}
        LeftContent={'goback'}
      />
      <View style={{margin: 10}}>
        <FormControl isInvalid={false}>
          <Box backgroundColor={'#33325F'} borderRadius={15} mt={3}>
            <Input
              w={{
                base: '100%',
                md: '25%',
              }}
              height={50}
              borderWidth={0}
              color={'#f1f1f1'}
              placeholder="First name *"
              // value={companyForm.firstName}
              placeholderTextColor={'#808080'}
              // onChangeText={text =>
              //   setCompanyFormData({firstName: text, firstNameError: ''})
              // }
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="person" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
            />
          </Box>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="sm" />}>
            Please enter your name
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={false}>
          <Box backgroundColor={'#33325F'} borderRadius={15} mt={3}>
            <Input
              w={{
                base: '100%',
                md: '25%',
              }}
              height={50}
              borderWidth={0}
              color={'#f1f1f1'}
              placeholder="Last name *"
              //value={companyForm.lastName}
              placeholderTextColor={'#808080'}
              // onChangeText={text =>
              //   setCompanyFormData({lastName: text, lastNameError: ''})
              // }
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="person" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
            />
          </Box>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="sm" />}>
            Please enter your last name
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={false}>
          <Box backgroundColor={'#33325F'} borderRadius={15} mt={3}>
            <Input
              w={{
                base: '100%',
                md: '25%',
              }}
              height={60}
              borderWidth={0}
              color={'#f1f1f1'}
              placeholder="Email Address *"
              //value={companyForm.lastName}
              placeholderTextColor={'#808080'}
              // onChangeText={text =>
              //   setCompanyFormData({lastName: text, lastNameError: ''})
              // }
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="email" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
            />
          </Box>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="sm" />}>
            Please enter your Email
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={false}>
          <Box backgroundColor={'#33325F'} borderRadius={15} mt={3}>
            <Input
              w={{
                base: '100%',
                md: '25%',
              }}
              height={50}
              borderWidth={0}
              maxLength={10}
              editable={false}
              color={'#f1f1f1'}
              placeholder="Mobile Number"
              //  value={companyForm.companyMobile}
              placeholderTextColor={'#808080'}
              keyboardType="numeric"
              // onChangeText={text =>
              //   setCompanyFormData({companyMobile: text, companyMobileError: ''})
              // }
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="phone" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
            />
          </Box>
          <FormControl.ErrorMessage
            leftIcon={
              <WarningOutlineIcon size="sm" />
            }></FormControl.ErrorMessage>
        </FormControl>

        <View style={{alignItems:'center', width:'100%'}}>
        <Image
          source={{uri: filePath.uri}}
          style={styles.imageStyle}
        />
        <Text style={styles.textStyle}>{filePath.uri}</Text>
        
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => chooseFile('photo')}>
          <Text style={styles.textStyle}>Choose Image</Text>
        </TouchableOpacity>
        
      </View>


        <Box mt={3}>
          <TouchableOpacity
            onPress={() => SaveCompany()}
            style={{
              backgroundColor: '#462780',
              height: 50,
              borderRadius: 20,
              width: '50%',
              alignSelf: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: '#fff',
                padding: 15,
                fontSize: 18,
                // fontFamily: 'JosefinSans-Bold',
              }}>
              Save
            </Text>
          </TouchableOpacity>
        </Box>
      </View>
    </Box>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aliceblue',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    marginVertical: 10,
    width: 150,
    borderRadius:10,
    paddingTop:10,
    height:40
  },
  imageContainer: {
    marginVertical: 24,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  imageStyle: {
    width: 200,
    maxHeight: 200,
    margin: 5,
  },
});
