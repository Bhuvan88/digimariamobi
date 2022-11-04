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
  Actionsheet
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
import MyIcon from 'react-native-vector-icons/FontAwesome';
import {
  CardGradientComponent,
  HeaderComponent,
  EmptyComponent,
} from '../../components/component';
import Logo from '../../assets/sub1.jpg';
import {useDetailsAll} from '../../context/detailsProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {imageBaseUrl} from '../../../config.json';
export default function Home(props) {
  const [showActivities, SetshowActivities] = useState(false);
  const {getChapters,chapterList,getContents,loading,contentsList} = useDetailsAll();

  useEffect(() => {
    //loadResourcesAndDataAsync();
   // getChapters(props.route.params.id);
  }, []);
  async function loadResourcesAndDataAsync() {
    let token = await AsyncStorage.getItem('token');
    if (token) {
      let tokenParse = JSON.parse(token);
      getChapters(props.route.params.id);
    }
  }
const onCancel =()=>{
    SetshowActivities(false);
}
const showActivity=(type,data)=>{
 // alert(type);
  props.navigation.navigate('MatchTheFollowing',{assets:data.asset,title:data.title})
  return;
   if(type=='video'){
        props.navigation.navigate('SelectActivity',{assets:data.asset,title:data.title})
    }
    else if(type=='trueorfalse'){
        props.navigation.navigate('TrueorFalse',{assets:data.asset,title:data.title})
    }
    else if(type=='activities'){
      props.navigation.navigate('DragAndDrop',{assets:data.asset,title:data.title})
  }

}
  return (
    <Box flex="1">
      <HeaderComponent
        wrapperColor="#151218"
        bgColor="#fece2e"
        headerTitle='CONTENTS'
        nav={props.navigation}
        LeftContent={'goback'}
      />
      <View style={{margin: 10,flex:1}}>
      <Text style={{fontSize:18,fontWeight:'bold',color:'#000',textAlign:'center'}}>{props.route.params.title}</Text>
      <FlatList
                  data={contentsList}
                  showsVerticalScrollIndicator={false}
                  style={{marginTop:10}}
                  ListEmptyComponent={() => (
                    <EmptyComponent data={'No Contents Found'} />
                    )}
                  renderItem={({item, index}) =>
                  contentsList.length > 0 ?  (
              <TouchableOpacity onPress={()=>{showActivity(item.type,item)}} style={{ marginTop: 5}}>
              

                <Box
                  style={[
                    {
                      backgroundColor: '#31305E',
                     // width: '70%',
                      borderRadius: 10,
                     // borderBottomRightRadius: 20,
                      padding: 15,
                    },
                  ]}>
                  <View style={{justifyContent: 'center'}}>
                    <Text fontSize="md" style={{color: '#fff'}}>
                      <Text onLayout={()=>alert('hi')}
                        style={{
                          fontSize: 16,
                          color: '#fff',
                          fontWeight: 'bold',
                        }}>
                         {index+1}.{item.title}
                      </Text>
                    </Text>
                  
                  </View>
                </Box>
              </TouchableOpacity>
           ) : (
            false
          )
        }
        keyExtractor={(item, index) => index.toString()}
      />
      </View>
    </Box>
  );
}
