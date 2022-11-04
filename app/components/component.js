import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {
  TouchableHighlight,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import {
  NativeBaseProvider,
  Button,
  Text,
  Box,
  Center,
  Avatar,
  IconButton,
  HStack,
  StatusBar,
  Badge,
  Pressable,Actionsheet
} from 'native-base';
//import LinearGradient from 'react-native-linear-gradient';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import logo from '../assets/mariaLogo.png';
import mariaLogo from '../assets/logo.png'
import Happy_icon from '../assets/Correct.gif';
import Sad_icon from '../assets/Wrong.gif';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import greenUserIcon from '../../../src/assets/user-green-edit.png';
import {getInitials} from '../api/apiService';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export function ButtonComponent({onPress, label, colorType, textColor}) {
  return (
    <NativeBaseProvider>
      <Button onPress={onPress} colorScheme={colorType} size="lg">
        <Text style={{color: textColor ? textColor : '#000'}}>{label}</Text>
      </Button>
    </NativeBaseProvider>
  );
}
export function IconButtonComponent({onPress, label, icon, buttonColor}) {
  return (
    <NativeBaseProvider>
      <Button
        iconLeft
        onPress={onPress}
        leftIcon={icon}
        //colorScheme="dark"
        style={{backgroundColor: buttonColor, borderRadius: 10, height: 40}}>
        <Text
          style={{color: '#fff', fontFamily: 'JosefinSans-Bold', fontSize: 15}}>
          {label}
        </Text>
      </Button>
    </NativeBaseProvider>
  );
}

export function CardGradientComponent(props) {
  const {
    textValue,
    buttonBackground,
    onPress,
    accessId,
    accessLabel,
    extraComponent,
    iconType,
  } = props;
  const {icon, iconFamily, iconColor} = iconType;
 
  if (iconFamily == 'FontAwesome') {
    iconContent = (
      <Icon
        active
        name={icon}
        size={25}
        style={{
          color: iconColor ? iconColor : '#FFFFFF',
         // alignSelf: 'flex-end',
        //  position: 'absolute',
         // top: 10,
          //right: 10,
        }}
      />
    );
  } else if (iconFamily == 'MaterialCommunity') {
    iconContent = (
      <MaterialCommunityIcon
        active
        name={icon}
        size={25}
        style={{
          color: iconColor ? iconColor : '#FFFFFF',
         // alignSelf: 'flex-end',
         // position: 'absolute',
         // top: 10,
          //right: 10,
        }}
      />
    );
  }

  return (
    <NativeBaseProvider>
      <TouchableOpacity
        id={accessId}
        accessibilityLabel={accessLabel}
        onPress={onPress}
        style={{
         // borderBottomWidth: 15,
        //  borderColor: buttonBackground,
          backgroundColor:buttonBackground,
          height: 120,
          borderRadius: 15,
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 'bold',
          fontSize: 18,
        }}>
          <View style={{
            height: 120,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: 0,
            width: '100%',
          }}>
       
          {iconContent}
          <View style={{padding: 5, width: '100%'}}>
            <Text
              style={{ 
               // fontFamily: 'JosefinSans-Bold',
               // paddingTop: 10,
                color:  '#fff',
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              {textValue}
            </Text>
            {extraComponent}
          </View>
          </View>
      </TouchableOpacity>
    </NativeBaseProvider>
  );
}

export function CardLeftAvatarComponent({
  cardLeftComponent,
  buttonBackground,
  extraComponent,
}) {
  return (
    
      <Box
        style={[
          appstyles.cardContainer,
          {backgroundColor: buttonBackground ? buttonBackground : '#000'},
        ]}>
        <View style={{flexDirection: 'row', width: '100%'}}>
          {cardLeftComponent && cardLeftComponent}
          {extraComponent && extraComponent}
        </View>
      </Box>
  
  );
}
export function HeaderComponent(props) {
  const {nav, children, bgColor, wrapperColor, headerTitle, LeftContent,rightContent} =
    props;
  

  return (

    <HStack
    bg={'#fece2e'}
    justifyContent="space-between"
    alignItems="center"
    w="100%"
    style={{height: 80}}>
        <HStack alignItems="center" style={{paddingLeft: 15}}>
          {LeftContent && (
            <TouchableOpacity
              onPress={() => nav.goBack()}
              id={'goback'}
              accessibilityLabel={'goback'}
              style={{width: 25}}>
             
                <Icon
                  name={'chevron-left'}
                  style={{color: '#000', fontSize: 22}}
                  type="FontAwesome"
                />
            
            </TouchableOpacity>
          )}

          <Text
            fontSize="18"
            fontWeight="bold"
            style={{
              color: '#000',
              padding: 10,
             // fontFamily: 'JosefinSans-Bold',
            }}>
            {headerTitle}
          </Text>
        </HStack>
        {rightContent && 
          <HStack>
            {rightContent}
          </HStack>}
      </HStack>

  );
}

export function HeaderWithLogoComponent(props) {
  const {
    nav,
    children,
    bgColor,
    wrapperColor,
    headerTitle,
    Logo,
    LeftContent,
    rightContent
  } = props;
  const [lng, setLng] = useState(false);
  useEffect(() => {
  
    getLanguage();
  }, []);
  const getLanguage = async () => {
    let language = await AsyncStorage.getItem('language');
    if (language != null) {
      setLng(language);
    }
  };

  return (
    
      <Box flex="1" bg={bgColor}>
        <HStack
          bg={bgColor}
          justifyContent="space-between"
          alignItems="center"
          w="100%"
          p={2}
          style={{height: 70}}>
          <HStack  style={{padding: 10}}>
            
            <Image source={mariaLogo} style={{width:250,height:60}} resizeMode={'contain'} />
          </HStack>
          {rightContent?
          <HStack>
            {rightContent}
          </HStack>:false}
        </HStack>
        <Box
          style={{
            height: '100%',
            flex: 1,
            backgroundColor: '#f1f1f1',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            marginTop:10
          }}>
          {/* <Center
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: -30,
              zIndex: 1,
            }}>
            <Avatar
             // borderColor={'#000'}
              borderWidth={1}
              bg={'#000'}
              alignSelf="center"
              size="lg"
              source={logo}>
              Digimaria
            </Avatar>
          </Center> */}
          {children}
        </Box>
      </Box>
  
  );
}
export function ListItemComponent(props) {
  const {
    textValue,
    buttonBackground,
    onPress,
    image,
    extraComponent,
    showIcon,
    callBack,
    employeeId,
  } = props;
  return (
    
      <View
        onPress={onPress}
        style={{
          width: '100%',
          height: 50,
          borderRadius: 30,
          borderColor: '#8F98C2',
          borderWidth: 0.75,
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 0,
          backgroundColor: buttonBackground ? buttonBackground : '#000',
        }}>
        <View style={[{flexDirection: 'row', padding: 10}]}>
          <View style={{flex: 1, paddingTop: 2, right: 10}}>
            {image ? (
              <Avatar
                bg="green.500"
                key={employeeId}
                source={{
                  uri: image,
                }}>
                {getInitials(textValue, ' ', 2)}
              </Avatar>
            ) : (
              <Avatar bg="green.500">
                {textValue ? getInitials(textValue, ' ', 2) : ''}
              </Avatar>
            )}
          </View>
          <View
            style={{
              //width: '77%',
              //marginLeft: 10,
              //alignItems: 'flex-start',
              flex: 3,
              //backgroundColor:'red'
            }}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 16,
                marginTop: 5,
                color: '#FFFFFF',
                fontFamily: 'JosefinSans-Bold',
              }}>
              {textValue}
            </Text>
            {extraComponent}
          </View>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
            {employeeId ? (
              <Badge colorScheme="success">
                <Text style={{fontFamily: 'JosefinSans-Bold'}}>
                  {employeeId}
                </Text>
              </Badge>
            ) : null}
            {showIcon == 'show' ? (
              <TouchableOpacity
                style={[{justifyContent: 'flex-end', alignItems: 'flex-end'}]}
                onPress={callBack}>
                {/* <Image alt="user" source={greenUserIcon} /> */}
              </TouchableOpacity>
            ):showIcon == 'showTick' ? (
				<View>
					<TouchableOpacity
							style={[ { justifyContent: 'flex-end', alignItems: 'flex-end'} ]}
						>
							<MaterialCommunityIcon name={'check'} size={25} color="green" />
						</TouchableOpacity>
					
				</View>):false}
          </View>
        </View>
      </View>
   
  );
}

export function DataTableComponent({onPress, label, height, tableData}) {
  return (
    <NativeBaseProvider>
      <Box style={{backgroundColor: '#262A30', borderRadius: 10}}>
        {tableData
          ? tableData.map((item, i) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    margin: 8,
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row'}}>
                      {item.icon}
                      <Text
                        style={{
                          color: '#FFFFFF',
                          fontFamily: 'JosefinSans-Bold',
                          paddingLeft: 10,
                        }}>
                        {item.label}
                      </Text>
                    </View>
                  </View>
                  <View style={{flex: 1}}>
                    <Text
                      numberOfLines={1}
                      style={{
                        alignSelf: 'flex-end',
                        fontFamily: 'JosefinSans-Bold',
                        color: '#FFFFFF',
                        color:  (item.value=='Approved')  ? 'green': item.value=='Rejected' ? '#D64D41': item.value=='Pending'? '#37bcf8':'#fff'
                      }}>
                      {item.value}
                    </Text>
                  </View>
                </View>
              );
            })
          : false}
      </Box>
    </NativeBaseProvider>
  );
}
export function CardDataComponent({headerData, tableData}) {
  return (
    <NativeBaseProvider>
      <View
        style={{
          backgroundColor: '#262A30',
          borderRadius: 20,
          width: '100%',
        }}>
        <View style={{flexDirection: 'row'}}>{headerData}</View>
        <View style={{flexDirection: 'row'}}>{tableData}</View>
      </View>
    </NativeBaseProvider>
  );
}
export function SuccessModalComponent(props) {
  const {title, subTitle, onPressOk, isVisible, type, okText} = props;
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  useEffect(() => {
    //alert(title)

    if (isVisible) {
      setStatusModalVisible(true);
    } else {
      setStatusModalVisible(false);
    }
  }, [isVisible, title]);
  const okConfirm =() =>{
	onPressOk();
	setStatusModalVisible(false);

  }
  return (
  
      <Modal
        animationType="slide"
        transparent={true}
        visible={statusModalVisible}
        onRequestClose={() => {
          setStatusModalVisible(!statusModalVisible);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
           // alignItems: 'center',
            marginTop: 22,
		      	margin:10
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 20,
              shadowColor: 'red',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}>
            <View style={{alignItems: 'center', bottom: 20}}>
              <View
                style={{
                  backgroundColor: '#fece2e',
                  width: 50,
                  height: 50,
                  color: '#fff',
                  borderRadius: 15,
                  zIndex: 1,
                  position: 'absolute',
                  justifyContent: 'center',
                }}>
                {type == 'Success' ? (
                  <MaterialCommunityIcon
                    name="check-circle"
                    size={50}
                    color="#fff"
                  />
                ) : (
                  <MaterialCommunityIcon
                    name='close-circle'
                    size={50}
                    color="#D64D41"
                  />
                )}
              </View>
            </View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                paddingTop: 35,
                color:type == 'Success'? 'green':'red',
                textAlign: 'center',
              }}>
              {title}
            </Text>
            {subTitle ? (
              <Text
                style={{
                  paddingTop: 10,
                  marginBottom: 10,
                  textAlign: 'center',
                  color: '#000',
                }}>
                {subTitle}
              </Text>
            ) : (
              false
            )}

            <Pressable
              style={{
                marginTop: 5,
                marginBottom: 5,
                borderTopColor: '#808080',
                paddingVertical: 0.5,
                borderTopWidth: 1,
               // width: deviceWidth - 100,
              }}
              onPress={() => okConfirm()}
             >
              <View style={{alignItems:'center',marginTop:10}}>
                <Badge variant={'solid'} colorScheme="success" width={'40%'} borderRadius={5} >
                <Text style={{color:'#fff',padding:5,fontWeight:'bold'}}>
                {okText ? okText : 'OK'}
                </Text>
              </Badge>
              </View>
              {/* <Text
                style={{
                 // fontFamily: 'JosefinSans-Bold',
                  fontSize: 16,
                  color: '#00875A',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  padding: 10,
                }}>
                {okText ? okText : 'OK'}
              </Text> */}
            </Pressable>
          </View>
        </View>
      </Modal>

  );
}
export function SuccessModalActivityComponent(props) {
  const {title, subTitle, onPressOk, isVisible, type, okText} = props;
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  useEffect(() => {
    //alert(title)

    if (isVisible) {
      setStatusModalVisible(true);
    } else {
      setStatusModalVisible(false);
    }
  }, [isVisible, title]);
  const okConfirm =() =>{
	onPressOk();
	setStatusModalVisible(false);

  }
  return (
  
      <Modal
        animationType="slide"
        transparent={true}
        visible={statusModalVisible}
        onRequestClose={() => {
          setStatusModalVisible(!statusModalVisible);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
           // alignItems: 'fdf7f7',
            marginTop: 22,
		      	margin:10,
            height:'100%'
          }}>
    
          <View
            style={{
              backgroundColor: type == 'Success' ?'#fffdee':'#fdf7f7',
              borderRadius: 20,
              shadowColor: 'red',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}>
            <View style={{alignItems: 'center', bottom: 20}}>
              <View
                style={{
                  //bottom:20
                 // justifyContent: 'center',
                }}>
                {type == 'Success' ? (
                  <Image source={Happy_icon} style={{width:100,height:100}} />
                ) : (
                  <Image source={Sad_icon} style={{width:100,height:100}} />
                )}
              </View>
              <Text
              style={{
                paddingTop:10,
                fontSize: 18,
                fontWeight: 'bold',
                //paddingTop: 35,
                color:type == 'Success'? 'green':'red',
                textAlign: 'center',
              }}>
              {title}
            </Text>
            </View>
          
            {subTitle ? (
              <Text
                style={{
                  paddingTop: 15,
                  //marginBottom: 10,
                  textAlign: 'center',
                  color: '#000',
                }}>
                {subTitle}
              </Text>
            ) : (
              false
            )}

            <Pressable
              style={{
                marginTop: 5,
                marginBottom: 5,
                borderTopColor: '#808080',
                paddingVertical: 0.5,
               // borderTopWidth: 1,
               // width: deviceWidth - 100,
              }}
              onPress={() => okConfirm()}
             >
              <View style={{alignItems:'center',marginTop:10}}>
                <Badge variant={'solid'} backgroundColor={type == 'Success' ?'#3ccc9f':'#e85f71'}  width={'40%'} borderRadius={5} >
                <Text style={{color:'#fff',padding:5,fontWeight:'bold'}}>
                {okText ? okText : 'OK'}
                </Text>
              </Badge>
              </View>
              {/* <Text
                style={{
                 // fontFamily: 'JosefinSans-Bold',
                  fontSize: 16,
                  color: '#00875A',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  padding: 10,
                }}>
                {okText ? okText : 'OK'}
              </Text> */}
            </Pressable>
          </View>
        </View>
      </Modal>

  );
}

export function ConfirmModalComponent(props) {
	const {
		title,
		subTitle,
		onPressOk,
		onPressCancel,
		isVisible,
		modalClose,
		okText,
		cancelText,
		isDisableOkButton,

	  } = props;
	const [statusModalVisible, setStatusModalVisible] = useState(false);
	useEffect(() => {
	  //alert(title)
  
	  if (isVisible) {
		setStatusModalVisible(true);
	  } else {
		setStatusModalVisible(false);
	  }
	}, [isVisible, title]);
	const okConfirm =() =>{
	  onPressOk();
	  setStatusModalVisible(false);
  
	}
	return (
	  <NativeBaseProvider>
		<Modal
		  animationType="slide"
		  transparent={true}
		  visible={statusModalVisible}
		  onRequestClose={() => {
			setStatusModalVisible(!statusModalVisible);
		  }}>
		  <View
			style={{
			  flex: 1,
			  justifyContent: 'center',
			//  alignItems: 'center',
			  marginTop: 22,
			 // width:'100%',
			 margin:10
			}}>
			<View
			  style={{
				backgroundColor: '#262A30',
				backgroundColor: '#262A30',
				borderRadius: 20,
				shadowColor: '#000',
				shadowOffset: {
				  width: 0,
				  height: 2,
				},
				shadowOpacity: 0.25,
				shadowRadius: 4,
				elevation: 5,
			  }}>
			  <View style={{alignItems: 'center', bottom: 20}}>
				<View
				  style={{
					backgroundColor: '#EAF9EE', width: 40, height: 40,
					color: '#fff',
					borderRadius: 15,
					zIndex: 1,
					position: 'absolute',
					justifyContent: 'center',
				  }}>
				   <MaterialCommunityIcon
              name="progress-alert"
              size={40}
              color="#D64D41"
            />
				</View>
				
			  </View>
			  <View  style={{justifyContent:'flex-end',alignItems:'flex-end'}}>
          
          <TouchableOpacity onPress={modalClose?modalClose:onPressCancel}
            style={{ padding:5
            
            }}>
            <MaterialCommunityIcon
              name="close-circle-outline"
              size={35}
              color="#D64D41"
            />
          </TouchableOpacity>
          </View>
			  <Text
				style={{
				  fontSize: 18,
				  fontWeight: 'bold',
				 // paddingTop: 10,
				  color: '#fff',
				  textAlign: 'center',
				  fontFamily:'JosefinSans-Bold'
				}}>
				{title}
			  </Text>
			  {subTitle ? (
				<Text
				  style={{
					paddingTop: 10,
					marginBottom: 10,
					textAlign: 'center',
					color: '#fff',
					fontFamily:'JosefinSans-Regular'
				  }}>
				  {subTitle}
				</Text>
			  ) : (
				false
			  )}

			  <View
				style={{
				  marginTop: 5,
				  marginBottom: 5,
				  borderTopColor: '#fff',
				  paddingVertical: 1,
				  borderTopWidth: 2,
				 // width: deviceWidth - 100,
				  flexDirection: 'row',
                  justifyContent: 'space-between',
				 // alignItems:'center'
				}}
				>
				 <View style={{flex:okText?2:1,padding:10}}>
                {isDisableOkButton?
                <View
                style={{backgroundColor:'#808080',borderRadius:10}}
               // onPress={onPressOk}
                id={'btnOk'}
                accessibilityLabel={'btnOk'}>
                <Text style={{fontFamily:'JosefinSans-Bold',fontSize:14,color:'#fff',fontWeight:'bold',textAlign:'center',padding:6,}}>{okText?okText:i18n.t('Yes')}</Text>
              </View>:
            <TouchableOpacity
              style={{backgroundColor:'#00875A',borderRadius:10}}
              onPress={onPressOk}
              id={'btnOk'}
              accessibilityLabel={'btnOk'}>
              <Text style={{fontFamily:'JosefinSans-Bold',fontSize:14,color:'#fff',fontWeight:'bold',textAlign:'center',padding:6,}}>{okText?okText:i18n.t('Yes')}</Text>
            </TouchableOpacity>}
            </View>
            <View style={{flex: 1, padding:10}}>
            <TouchableOpacity
              style={{backgroundColor:'#D64D41',borderRadius:10}}
              onPress={onPressCancel}
              id={'btnOk'}
              accessibilityLabel={'btnOk'}>
              <Text style={{fontFamily:'JosefinSans-Bold',fontSize:14,color:'#fff',fontWeight:'bold',textAlign:'center',padding:6,}}>{cancelText?cancelText:i18n.t('No')}</Text>
            </TouchableOpacity>
            </View>
			  </View>
			  </View>
			</View>
	
		</Modal>
	  </NativeBaseProvider>
	);
  }


export function BottomSheetComponent({children,isVisible,bgcolor,closeCallback}) {
	
	const [showActionSheet, setShowActionSheet] = useState(false);
	useEffect(() => {
	  //alert(title)
  
	  if (isVisible) {
		setShowActionSheet(true);
	  } else {
		setShowActionSheet(false);
	  }
	}, [isVisible]);
	const onConfirmClose=()=>{
		
		closeCallback()
		setShowActionSheet(false)
	}
	return (
	 
		<Actionsheet isOpen={showActionSheet} onClose={() =>onConfirmClose() }>
              <Actionsheet.Content style={{backgroundColor:bgcolor?bgcolor:'#000'}}>
                       {children}
			  </Actionsheet.Content>
		</Actionsheet>
	
	);
  }
  export function Loader(props) {
    return (
      <View style={ovstyles.outerstyle}>
         <ActivityIndicator size="large" color="#462780" style={{ fontSize:40 }} />
      </View>
    );
  }
  export  function EmptyComponent(props) {
    const {data} = props;
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',paddingTop:10}}>
          <Text style={{fontSize: 16,color:'#808080'}}>
            {data?data:' No data found'} 
          </Text>
     </View>
    )
}
  const ovstyles = StyleSheet.create({
    innerstyle: {
      justifyContent: 'center',
      alignItems: 'center',
      zIndex:2,
      //position: 'absolute',
  
      //marginTop: '10%'
    },
    outerstyle: {
      backgroundColor: '#00000055',
      position: 'absolute',
      height: deviceHeight,
      width: deviceWidth,
      zIndex: 2,
  elevation:4,
      justifyContent: 'center',
      alignItems: 'center',
  
      //marginTop: '15%'
    }
  });
  
const appstyles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    padding:5,
   // height: 120,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  cardLeft: {
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 10,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#462780',
  },
});

Button.defaultProps = {
  children: null,
  onPress: () => {},
};

Button.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
};
