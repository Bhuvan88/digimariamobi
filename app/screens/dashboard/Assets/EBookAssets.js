import React, {useState, useEffect} from 'react';
import {
    NativeBaseProvider,
    useDisclose,
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
    CheckIcon,Select,
    KeyboardAvoidingView,
    View
  } from 'native-base';
  
import {
  FlatList,
  Dimensions,
} from 'react-native';
import 'react-native-gesture-handler';
const {height, width} = Dimensions.get('window');
import MyIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  CardGradientComponent,
  HeaderComponent,
  SuccessModalComponent,
} from '../../../components/component';
import { WebView } from 'react-native-webview';
import Video from 'react-native-video';
//import VideoPlayer from 'react-native-video-player';

export default function Home(props) {
  const [show, setShow] = useState(false);
  const onSuccess = () => {
    setShow(false);
    // props.navigation.navigate('Home');
  };

  return (
    <Box flex="1" >
      <HeaderComponent
        wrapperColor="#151218"
        bgColor="#273897"
        headerTitle={props.route.params.title}
        nav={props.navigation}
        LeftContent={'goback'}
      />
            <WebView
                    source={{
                    uri: props.route.params.assets
                    }}
                    style={{ margin:10,width:'95%' }}
                />
    </Box>
  );
}
