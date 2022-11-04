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
  const [showContent, setShowContent] = useState(false);
  const [showActivities, SetshowActivities] = useState(false);
  const [title, SetTitle] = useState(null);
  const {getChapters,chapterList,getContents,loading,contentsList} = useDetailsAll();

  useEffect(() => {
    //loadResourcesAndDataAsync();
    getChapters(props.route.params.id);
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
    if(type=='flipbook'){
        SetshowActivities(false);
        props.navigation.navigate('EBookAssets',{assets:data.asset,title:data.title})
    }else if(type=='audio'){
        props.navigation.navigate('VideoAsset',{assets:data.asset,title:data.title})
    }else{
        props.navigation.navigate('SelectActivity',{assets:data.asset,title:data.title})
    }

}
const OpenContent=(data)=>{
  getContents(data.id);
  setShowContent(true);
  SetTitle(data.chapter)
  //props.navigation.navigate('Content',{title:data.chapter})
}
  return (
    <Box flex="1">
      <HeaderComponent
        wrapperColor="#151218"
        bgColor="#fece2e"
        headerTitle={'CHAPTERS LIST'}
        nav={props.navigation}
        LeftContent={'goback'}
      />
      <View style={{margin: 10,flex:1}}>
      <Text style={{fontSize:18,fontWeight:'bold',color:'#000',alignSelf:'flex-start'}}>{props.route.params.name}</Text>
      <FlatList
                  data={chapterList}
                  showsVerticalScrollIndicator={false}
                  style={{marginTop:10}}
                  ListEmptyComponent={() => (
                    <EmptyComponent data={'No Chapters Found'} />
                    )}
                  renderItem={({item, index}) =>
                  chapterList.length > 0 ?  (
              <TouchableOpacity onPress={()=>{OpenContent(item);}} style={{ marginTop: 5}}>
              

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
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#fff',
                          fontWeight: 'bold',
                        }}>
                         {index+1}.{item.chapter}
                      </Text>
                    </Text>
                    {/* <Text style={{color: '#fff', paddingTop: 10}}>
                      <Text style={{fontSize: 16}}>{item.class_name}</Text>
                    </Text> */}
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
     
      <Actionsheet isOpen={showActivities} onClose={onCancel}>
			<Actionsheet.Content style={{ backgroundColor: '#FFFFFF' }}>
            <Text style={{fontSize:18,fontWeight:'bold',color:'#000',alignSelf:'flex-start',paddingLeft:10,fontStyle:'italic'}}>CONTENTS</Text>
            <FlatList
                  data={contentsList}
                  showsVerticalScrollIndicator={false}
                  style={{width:'100%',marginTop:10}}
                  renderItem={({item, index}) =>
                  contentsList.length > 0 ?  (
              <TouchableOpacity onPress={()=>showActivity(item.type,item)} style={{ marginTop: 5,width:'100%'}}>
              

                <Box
                  style={[
                    {
                      backgroundColor: '#31305E',
                      borderRadius: 10,
                     // borderBottomRightRadius: 20,
                      padding: 15,
                    },
                  ]}>
                  <View style={{justifyContent: 'center'}}>
                    <Text fontSize="md" style={{color: '#fff'}}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#fff',
                          fontWeight: 'bold',
                        }}>
                         {index+1}.{item.title}
                      </Text>
                    </Text>
                    {/* <Text style={{color: '#fff', paddingTop: 10}}>
                      <Text style={{fontSize: 16}}>{item.class_name}</Text>
                    </Text> */}
                  </View>
                </Box>
              </TouchableOpacity>
           ) : (
            false
          )
        }
        keyExtractor={(item, index) => index.toString()}
      />
			</Actionsheet.Content>
		</Actionsheet>


    <Actionsheet isOpen={showContent} onClose={onCancel}>
			<Actionsheet.Content style={{ backgroundColor: '#FFFFFF' }}>
            <Text style={{fontSize:18,fontWeight:'bold',color:'#000',alignSelf:'flex-start',paddingLeft:10}}>CONTENTS</Text>
            <View style={{width:'100%',marginTop:10}} >
            <TouchableOpacity onPress={()=>{ setShowContent(false);props.navigation.navigate('VideoAsset',{assets:null,title:title})}}
                  style={[
                    {
                      backgroundColor: '#31305E',
                      borderRadius: 10,
                     // borderBottomRightRadius: 20,
                      padding: 15,
                    },
                  ]}>
                  <View style={{justifyContent: 'center'}}>
                    <Text fontSize="md" style={{color: '#fff'}}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#fff',
                          fontWeight: 'bold',
                        }}>
                        Animated Videos
                      </Text>
                    </Text>
                   
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{ setShowContent(false);props.navigation.navigate('Content',{title:title})}}
                  style={[
                    {
                      backgroundColor: '#31305E',
                      borderRadius: 10,
                      marginTop:10,
                      padding: 15,
                    },
                  ]}>
                  <View style={{justifyContent: 'center'}}>
                    <Text fontSize="md" style={{color: '#fff'}}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#fff',
                          fontWeight: 'bold',
                        }}>
                         Interactive Tasks
                      </Text>
                    </Text>
                   
                  </View>
                </TouchableOpacity>
                </View>
			</Actionsheet.Content>
		</Actionsheet>
    </Box>
  );
}
