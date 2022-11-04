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
import sampleVideo from '../../../assets/video1.mp4'
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
        headerTitle={'Video Assets'}
        nav={props.navigation}
        LeftContent={'goback'}
      />
      <View style={{flex:1,paddingTop:10}}>

<Video
    source={sampleVideo}
    style={{position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    justifyContent: 'center',}}
    controls={true}
   // videoWidth={1600}
   // videoHeight={900}
   // thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
    //ref={r => this.player = r}
/>
</View>
{/* <WebView
        source={{
          uri: 'https://digimaria.info/uploads/windows_to_science/class1/flipbook/mobile/index.html'
        }}
        style={{ margin:10,width:'95%' }}
      /> */}
    </Box>
  );
}
