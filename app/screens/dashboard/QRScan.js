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
  useToast,
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
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { useDetailsAll } from '../../context/detailsProvider';
import MyIcon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  {CardGradientComponent,HeaderComponent,SuccessModalComponent}  from '../../components/component';
export default function Home(props) {

  const [userId, setUserId] = useState(null);
  const [ showQrCode, setShowQrCode ] = useState(true);
  const {linkBook,setSuccess,
		success} = useDetailsAll();
    const toast = useToast();
  useEffect(() => {
		loadResourcesAndDataAsync();
	}, []);
	async function loadResourcesAndDataAsync() {
		let token = await AsyncStorage.getItem('token');
		if (token) {
      let tokenParse=JSON.parse(token);
      setUserId(tokenParse.userid)
		}
	}
  const onSuccess = (data) => {
		setShowQrCode(false);
		linkBook(userId,data.data);
	};
 
  const linkedSuccess=()=>{
    setSuccess(null);
    //props.navigation.navigate('MyBooks');
    props.navigation.reset({ routes: [{ name: 'MyBooks' }] });
  }
  useEffect(() => {
		
	}, [success]);
  return (
<Box flex="1" >	
     <HeaderComponent wrapperColor="#151218" bgColor="#fece2e" headerTitle={'Scan QRCode'} nav={props.navigation}
				LeftContent={'goback'}/>
           
           {showQrCode ? (
					<QRCodeScanner
						onRead={onSuccess}
						topViewStyle={{ backgroundColor: '#000' }}
            bottomViewStyle={{ backgroundColor: '#000' }}
						showMarker={true}
						markerStyle={{
							borderColor: '#273897',
							borderRadius: 30,
							borderWidth: 3
						}}
					/>
				) : null}
         <SuccessModalComponent
			title={'Success'}
			subTitle={'Book Linked Successfully'}
			type={'Success'}
			isVisible={success?true:false}
			okText={'Go To My Books'}
			onPressOk={() => {
				linkedSuccess();
			}}
		/>
     </Box>
    
  );
}
