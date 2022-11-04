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
  Actionsheet,
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
  HeaderComponent,
  Loader,
  EmptyComponent
} from '../../components/component';
import Logo from '../../assets/sub1.jpg';
import {useDetailsAll} from '../../context/detailsProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {imageBaseUrl} from '../../../config.json';
export default function Home(props) {
  const [showContent, setShowContent] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [id,setId] = useState(null);
  const {getBooks, booksList,loading} = useDetailsAll();

  useEffect(() => {
    loadResourcesAndDataAsync();
  }, []);
  async function loadResourcesAndDataAsync() {
    let token = await AsyncStorage.getItem('token');
    if (token) {
      let tokenParse = JSON.parse(token);
      getBooks(tokenParse.userid);
    }
  }
const OpenModel=(type,item)=>{
  if(type=='ebook'){
    //props.navigation.navigate('Chapters',{id:item.id,name:item.subject_name})
    props.navigation.navigate('EBookAssets',{assets:'https://digimaria.info/uploads/aspen_english_coursebook/class1/flipbook/mobile/index.html',title:'E- Book'})
  }else{
    props.navigation.navigate('Chapters',{id:item.id,name:item.subject_name})
  }
  setShowContent(false);
}
const onCancel =()=>{
  setShowContent(false);
}
  return (
    <Box flex="1">
      <HeaderComponent
        wrapperColor="#151218"
        bgColor="#fece2e"
        headerTitle={'MY BOOKS'}
        nav={props.navigation}
        LeftContent={'goback'}
      />
      {loading ? <Loader /> : false}
      <View style={{flex:1,margin: 10}}>

      <FlatList
                  data={booksList}
                  showsVerticalScrollIndicator={false}
                  //style={{marginTop:10}}
                  numColumns={2}
                  columnWrapperStyle={{
                    justifyContent: "space-between"}}
                  ListEmptyComponent={() => (
                    <EmptyComponent data={'No Chapters Found'} />
                    )}
                  renderItem={({item, index}) =>
                  booksList.length > 0 ?  (
                    <TouchableOpacity onPress={()=>{setShowContent(true); setId(item)}} style={{width: '48%',marginTop:10, shadowColor: '#808080',
                    backgroundColor:'#f1f1f1',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2, 
                    borderRadius: 10,
                    elevation: 5}}>
                      <View style={{flex:1}} >
                    <Image loadingIndicatorSource={<Loader /> }
                      source={{uri: imageBaseUrl + item.coverimage}}
                      style={{
                        flex:1,
                      //  width:'100%',
                        height: 180,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                      }}
                      resizeMode='stretch'
                    />
                    </View>
                    <View style={{ padding:10}}>
                    <Text numberOfLines={2}
                            style={{
                              fontSize: 18,
                              color: '#000000',
                              fontWeight: 'bold',
                             
                            }}>
                            {item.subject_name}
                          </Text>
                          <Text style={{fontSize: 16,color:'#808080'}}>{item.class_name}</Text>
                    </View>
                   
{/*     
                    <Box
                      style={[
                        {
                          backgroundColor: '#31305E',
                          width: '70%',
                          borderTopRightRadius: 20,
                          borderBottomRightRadius: 20,
                          padding: 10,
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
                            {item.subject_name}
                          </Text>
                        </Text>
                        <Text style={{color: '#fff', paddingTop: 10}}>
                          <Text style={{fontSize: 16}}>{item.class_name}</Text>
                        </Text>
                      </View>
                    </Box> */}
                  </TouchableOpacity>
                    ) : (
                      false
                    )
                  }
                  keyExtractor={(item, index) => index.toString()}
                />

<Actionsheet isOpen={showContent} onClose={onCancel}>
			<Actionsheet.Content style={{ backgroundColor: '#FFFFFF' }}>
            <Text style={{fontSize:18,fontWeight:'bold',color:'#000',alignSelf:'flex-start',paddingLeft:10}}>CONTENTS</Text>
            <View style={{width:'100%',marginTop:10}} >
            <TouchableOpacity onPress={()=>OpenModel('ebook')}
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
                         E - BOOK
                      </Text>
                    </Text>
                   
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>OpenModel('chapters',id)}
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
                         CHAPTERS
                      </Text>
                    </Text>
                   
                  </View>
                </TouchableOpacity>
                </View>
			</Actionsheet.Content>
		</Actionsheet>
        {/* {booksList &&
          booksList.length > 0 &&
          booksList.map((item, i) => {
            return (
              <TouchableOpacity onPress={()=>props.navigation.navigate('Chapters',{id:item.id,name:item.subject_name})} style={{flexDirection: 'row', height: 100, marginTop: 5}}>
                <Image loadingIndicatorSource={<Loader /> }
                  source={{uri: imageBaseUrl + item.coverimage}}
                  style={{
                    width: '30%',
                    height: 100,
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                  }}
                  resizeMode={'stretch'}
                />

                <Box
                  style={[
                    {
                      backgroundColor: '#31305E',
                      width: '70%',
                      borderTopRightRadius: 20,
                      borderBottomRightRadius: 20,
                      padding: 10,
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
                        {item.subject_name}
                      </Text>
                    </Text>
                    <Text style={{color: '#fff', paddingTop: 10}}>
                      <Text style={{fontSize: 16}}>{item.class_name}</Text>
                    </Text>
                  </View>
                </Box>
              </TouchableOpacity>
            );
          })} */}
      </View>
    </Box>
  );
}
