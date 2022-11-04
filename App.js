import React, { useState,useEffect,useRef} from "react";
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
	WarningOutlineIcon,Center,Button,Actionsheet,Spinner, AlertDialog,
} from "native-base";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,I18nManager,Platform
} from "react-native";
import "react-native-gesture-handler";
import Logo from "./app/assets/maria_splash.png";
import Login from "./app/screens/auth/login";
import HomeScreen from "./app/screens/dashboard/Home";
import QRScan from "./app/screens/dashboard/QRScan";
import MyBooksDashoboard from "./app/screens/dashboard/MyBooks";
import Profile from "./app/screens/dashboard/Profile";
import Chapters from "./app/screens/dashboard/Chapters";
import Content from "./app/screens/dashboard/Content";
import VideoAsset from "./app/screens/dashboard/Assets/VideoAsset";
import EBookAssets from "./app/screens/dashboard/Assets/EBookAssets";
import SelectActivity from "./app/screens/dashboard/Assets/SelectActivity";
import TrueorFalse from "./app/screens/dashboard/Assets/TrueorFalse";
import DragAndDrop from "./app/screens/dashboard/Assets/DragAndDrop";
import MatchTheFollowing from "./app/screens/dashboard/Assets/MatchTheFollowing";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProvideDetail, useDetail, authProvider } from './app/context/authProvider';
import { AllDetail} from './app/context/detailsProvider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TRANSITIONS = [ 'fade', 'slide', 'none' ];
const STYLES = [ 'default', 'dark-content', 'light-content' ];
function DashboardNavigator(){
  const [ baseRoot, setBaseRoot ] = useState('Splash');
	const [ loading, setLoading ] = useState(true);
  return (
    <Stack.Navigator initialRouteName={HomeScreen}>
     
    <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="QRScan"
        component={QRScan}
        options={{
          headerShown: false,
        }}
      />
      
       <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
     
{/*       
        <Stack.Screen
        name="Chapters"
        component={Chapters}
        options={{
          headerShown: false,
        }}
      /> */}
      
    </Stack.Navigator>
  )
 
     
}
function BooksNavigator(){
  const [ baseRoot, setBaseRoot ] = useState('Splash');
	const [ loading, setLoading ] = useState(true);
  useEffect(() => {
		loadResourcesAndDataAsync();
	}, []);
	async function loadResourcesAndDataAsync() {
		let token = await AsyncStorage.getItem('userDetails');
		if (token) {
      setBaseRoot('Home')
			setLoading(false);
		}else{
			setBaseRoot('Login');
			setLoading(false);
		}
		//console.log('token', token);
		
	}

 
  return (
    <Stack.Navigator initialRouteName={MyBooksDashoboard}>
       <Stack.Screen
        name="MyBooksDashoboard"
        component={MyBooksDashoboard}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="Chapters"
        component={Chapters}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Content"
        component={Content}
        options={{
          headerShown: false,
        }}
      />
      
       <Stack.Screen
        name="EBookAssets"
        component={EBookAssets}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="VideoAsset"
        component={VideoAsset}
        options={{
          headerShown: false,
        }}
      />
      
       <Stack.Screen
        name="SelectActivity"
        component={SelectActivity}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TrueorFalse"
        component={TrueorFalse}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DragAndDrop"
        component={DragAndDrop}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="MatchTheFollowing"
        component={MatchTheFollowing}
        options={{
          headerShown: false,
        }}
      />
      
      
    </Stack.Navigator>
  )
 
     
}

function Home(props) {
	const [ showActionSheet, setShowActionSheet ] = useState(false);
	const onPressEmployeeList = () => {
		setShowActionSheet(true);
	};

	const sendDataToParent = () => {
		setShowActionSheet(false);
	};

	return (
		<Tab.Navigator
			initialRouteName="DashboardNavigator"
			screenOptions={{
				tabBarActiveTintColor: '#e91e63',
				tabBarInactiveTintColor: '#606FCB',
				tabBarStyle: {
					backgroundColor: '#1A1736',
					paddingVertical: 6
				}
			}}
		>
			<Tab.Screen
				name="DashboardNavigator"
				component={DashboardNavigator}
				options={{
					headerShown: false,
					gestureEnabled: false,
					tabBarLabel: '',
					tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" color={color} size={30} />
				}}
			/>
			
			<Tab.Screen
				name="MyBooks"
				component={BooksNavigator}
				options={{
					headerShown: false,
					tabBarLabel: '',
					tabBarIcon: ({ color, size }) => (
						<FontAwesomeIcons name="book" color={color} size={30} />
					)
				}}
			/>
			<Tab.Screen
				name="profile"
				component={HomeScreen}
				options={{
					headerShown: false,
					tabBarLabel: '',
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="brightness-5" color={color} size={30} />
					)
				}}
			/>
		</Tab.Navigator>
	);
}

  function MyStack(){
  const [ baseRoot, setBaseRoot ] = useState('Splash');
	const [ loading, setLoading ] = useState(true);
  
 
  return (
    <Stack.Navigator initialRouteName={Home}>
       <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
        <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      /> 
    <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      {/*  <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{
          headerShown: false,
        }}
      /> */}
    </Stack.Navigator>
  )
 
     
}

 export default function App() {
  const [ statusBarTransition, setStatusBarTransition ] = useState(TRANSITIONS[1]);
  const [ hidden, setHidden ] = useState(false);
  return (
    <NativeBaseProvider>
    <NavigationContainer>
      <ProvideDetail>
         <AllDetail>
            <SafeAreaView style={styles.container}>
                 <StatusBar
									animated={true}
									backgroundColor="#fece2e"
									barStyle={Platform.OS === 'ios' ? STYLES[2] : STYLES[2]}
									showHideTransition={statusBarTransition}
									hidden={hidden}
								/>
                 <MyStack />
              </SafeAreaView>
          </AllDetail>
      </ProvideDetail>
    </NavigationContainer>
    </NativeBaseProvider>
  );
}


const  Splash=(props)=>{
  const [ loading, setLoading ] = useState(true);
  useEffect(() => {
		loadResourcesAndDataAsync();
	}, []);
	async function loadResourcesAndDataAsync() {
		let token = await AsyncStorage.getItem('token');
    
    //alert(JSON.parse(token))
		if (token) {
      let tokenParse=JSON.parse(token);
       setTimeout(()=>{
        props.navigation.reset({ routes: [ { name: 'Home' } ] });
       },1000)
			
		}else{
      setTimeout(()=>{
        props.navigation.reset({ routes: [ { name: 'Login' } ] });
       },1000)
			
			setLoading(false);
		}
		
	}
  useEffect(() => {
    setTimeout(()=>{
   // props.navigation.reset({ routes: [ { name: 'Login' } ] });
    },1500)
  }, [])

  return (
    <NativeBaseProvider>
      <View style={{flex:1,backgroundColor:'#fece2e'}}>
          <View style={{flex:1,justifyContent:'center'}}>
              <Image
                  resizeMode="contain"
                  source={Logo}
                  style={{ width: '100%', height: 70 }}
                />
            </View>
      </View>
    
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#fece2e'
	}
});
