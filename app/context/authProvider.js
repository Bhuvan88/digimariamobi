import React, { useState, useEffect, useContext, createContext } from 'react';
import { getMethodCall, PostDataCall, Uploadfiles } from '../api/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authProvider = createContext();
//const navigation = React.useContext(NavigationContext);
import {Platform } from 'react-native';
// Provider component that wraps your app and makes table object ..
// ... available to any child component that calls useTable().

export function ProvideDetail({ children, ...props }) {
	const detail = useProvideDetail(props);
	return <authProvider.Provider value={detail}>{children}</authProvider.Provider>;
}

// Hook for child components to get the table object ...
// ... and re-render when it changes.

export const useDetail = () => {
	return useContext(authProvider);
};

// Provider hook that creates table object and handles state

function useProvideDetail(props) {
	
	const [ loading, setLoading ] = useState(false);
	const [visible, setIsvisible] = useState(false);
	const [ oTP, setOTP ] = useState(null);
	const [ success, setSuccess ] = useState(null);
	const [ feedbackData, setFeedbackData ] = useState({subject:'',comment:'',firstname:'',lastname:'',mobile:'',emailid:''});

	const setformData = (childData) =>{
		setFeedbackData({...feedbackData, ...childData});
    }
	useEffect(() => {
           //alert('hi')
		},
	[]);

	

		/* CREATE FEEBACK  */
		const mobileCheck = async (mobileNumber) => {
			setLoading(true);
			let resource = 'getotp?';
			let filter='mobile='+mobileNumber
			getMethodCall(resource, filter, OTPCallback, errorCallback);
		}
		const LoginCheck = async (mobileNumber) => {
			setLoading(true);
			let resource = 'otpverify?';
			let filter='mobile='+mobileNumber
			getMethodCall(resource, filter, loginCallback, errorCallback);
		}
		const loginCallback = async(data) => {
			
			if (data.errorCode==0){
				console.log('token',data.result)
				await AsyncStorage.setItem('token',JSON.stringify(data.result))
				setSuccess(true);
			} else {
				alert(data.Message);
			}
			setLoading(false);
		};
	
		const OTPCallback = (data) => {
			
			if (data.errorCode==0){
				//alert(data.result)
				setIsvisible(true);
				setOTP(data.result)
			} else {
				alert(data.Message);
			}
			setLoading(false);
		};
		const errorCallback = (data) => {
			setLoading(false);
			console.log('errorCallback',data);
		
		};
	
	// Return the user object and table methods
	return {
		loading,
		setLoading,
		mobileCheck,
		oTP,
		visible,
		setSuccess,
		success,
		LoginCheck

	};
}