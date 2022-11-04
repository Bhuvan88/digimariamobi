import React, { useState, useEffect, useContext, createContext } from 'react';
import { getMethodCall, PostDataCall, Uploadfiles } from '../api/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const detailsProvider = createContext();
//const navigation = React.useContext(NavigationContext);
import {Platform } from 'react-native';
// Provider component that wraps your app and makes table object ..
// ... available to any child component that calls useTable().

export function AllDetail({ children, ...props }) {
	const detail = useProvideDetail(props);
	return <detailsProvider.Provider value={detail}>{children}</detailsProvider.Provider>;
}

// Hook for child components to get the table object ...
// ... and re-render when it changes.

export const useDetailsAll = () => {
	return useContext(detailsProvider);
};

// Provider hook that creates table object and handles state

function useProvideDetail(props) {
	
	const [ loading, setLoading ] = useState(false);
	const [visible, setIsvisible] = useState(false);
	const [ userId, setUserId ] = useState(null);
	const [ success, setSuccess ] = useState(null);
	const [ booksList, setBooksList ] = useState(null);
	const [ chapterList, setChapterList ] = useState([]);
	const [ contentsList, setContents ] = useState([]);

	useEffect(() => {
           //alert('hi')
		},
	[]);

	

		/* MY BOOKS  */
		const getBooks = async (userId) => {
			setLoading(true);
			let resource = 'linkedsubjects?';
			let filter='userid='+userId
			getMethodCall(resource, filter, BooksCallback, errorCallback);
		}
		
		const BooksCallback = async(data) => {
			if (data.errorCode==0){
				console.log('myBooks',data)
				setBooksList(data.result);
			} else {
				alert(data.Message);
			}
			setLoading(false);
		};

		/* MY CHAPTERS  */
		const getChapters = async (userId) => {
			setLoading(true);
			let resource = 'linkedchapters?';
			let filter='subjectid='+userId
			getMethodCall(resource, filter, ChaptersCallback, errorCallback);
		}
		
		const ChaptersCallback = async(data) => {
			if (data.errorCode==0){
				console.log('myChapters',data)
				setChapterList(data.result);
			} else {
				setChapterList([])
				//alert(data.Message);
			}
			setLoading(false);
		};

		const getContents = async (chapterid) => {
			setLoading(true);
			let resource = 'chapter?';
			let filter='chapterid='+chapterid
			getMethodCall(resource, filter, ContentsCallback, errorCallback);
		}
		
		const ContentsCallback = async(data) => {
			if (data.errorCode==0){
				//console.log('contents',data)
				setContents(data.result[0].type);
			} else {
				setContents([])
			}
			setLoading(false);
		};
	/////Link Book Start ////
	
	const linkBook = async (userId,QRValues) => {
		setLoading(true);
		let resource = 'assignedlink?';
		let filter='userid='+userId+'&link='+QRValues
		getMethodCall(resource, filter,linkCallback, errorCallback);
	}

	const linkCallback = async(data) => {
		if (data.errorCode==0){
			console.log('token',data)
			setSuccess(true);
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
		getBooks,
		visible,
		setSuccess,
		success,
		linkBook,
		booksList,
		chapterList,
		getChapters,
		getContents,
		contentsList

	};
}