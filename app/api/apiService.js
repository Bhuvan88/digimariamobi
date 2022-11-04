import React from 'react';
import {apiUrl} from '../../config.json';
const headerData = { 'Content-Type': 'application/json' };
let archived = 'filter={"status":{"_neq":"archived"}}';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

/************************************* Get method ******************************/

/*************************************  USER LOGIN  ****************************/
export const userLogin = async (url, params, successCallback, errorCallback) => {
	console.log('userLoginparams',params);
	//console.log(apiUrl + '/auth/login');
	//let filter='filter={"status":{"_neq":"archived"}}'
	let email=params.email;
	let password=params.password;
	params.email=email.toLowerCase().trim();
	params.password=password.trim();
	console.log('tech',params);

	try {
		fetch(apiUrl+url+archived, {
			method: 'POST',
			body: JSON.stringify(params),
			headers: new Headers(headerData)
		})
			.then((response) => response.json())
			.then((response) => {
				console.log('Login log',response);
				//console.log(response);

				if (successCallback != null) {
					successCallback(response);
				}
				//dispatch({ type: 'getSingleproperty', data: response });
			})
			.catch(function(error) {
				//alert(error.message)
				console.log('There has been a problem with your fetch operation: ' + error.message);
				 // ADD THIS THROW error
				 if(error && error.message=='Network request failed'){
					errorCallback(error);
					//CodePush.restartApp()
				 }
				
				  throw error;
				});
	} catch (e) {
		alert(e);
		if (errorCallback != null) {
		
			errorCallback(e);
		}
	}
};

export const userLogout = async (successCallback, errorCallback) => {
	//console.log('userLoginparams',params);
	let token = await AsyncStorage.getItem('token');
	
	let params={refresh_token:token};
	console.log('tech',params);

	try {
		fetch(apiUrl+'/auth/logout', {
			method: 'POST',
			body: JSON.stringify(params),
			headers: new Headers(headerData)
		})
			.then((response) => response.text())
			.then((response) => {
				console.log('Logout log',response);
			
			})
			.catch(function(error) {
				//alert(error.message)
				console.log('There has been a problem with your fetch operation: ' + error.message);
				 // ADD THIS THROW error
				 if(error && error.message=='Network request failed'){
					errorCallback(error);
					//CodePush.restartApp()
				 }
				
				  throw error;
				});
	} catch (e) {
		if (errorCallback != null) {
			errorCallback(e);
		}
	}
};

export const getResourceData = async (url, params, successCallback, errorCallback) => {

	try {
		let path = apiUrl+url+params;
		console.log(path);
		fetch(path, {
			method: 'GET', 
			headers: {
				headers: new Headers(headerData)
			}
		}) 
			.then((response) => response.json())
			.then((response) => {
				console.log('Resource data log',response);
				if (successCallback != null) {
					let res = response.errors ? response : response.data;
					successCallback(res);
				}
			});
	} catch (e) {
		
		if (errorCallback != null) {
			errorCallback();
		}
	}
};


export const getAllData = async (url, params, successCallback, errorCallback) => {

	try {
		let path = apiUrl+url+params;
		console.log(path);
		fetch(path, {
			method: 'GET', 
			headers: {
				headers: new Headers(headerData)
			}
		}) 
			.then((response) => response.json())
			.then((response) => {
				//console.log('Resource data log',response);
				if (successCallback != null) {
					let res = response;
					successCallback(res);
				}
			});
	} catch (e) {
		
		if (errorCallback != null) {
			errorCallback();
		}
	}
};


export const getCall = async (url,filter, successCallback, errorCallback) => {
	
	try {
		let token = await AsyncStorage.getItem('token');
		let path = apiUrl+url+filter;
		console.log('path',path);
		fetch(path, {
			method: 'GET', 
			headers: {
				Authorization: `Bearer ${token}`
			}
		}) 
			.then((response) => response.json())
			.then((response) => {
				console.log(url+'setUser log',response);
				if (successCallback != null) {
					let res = response;
					successCallback(res);
				}
				
			});
	} catch (e) {
		
		if (errorCallback != null) {
			errorCallback();
		}
	}
};

export const getCallParams = async (url,filter, successCallback, errorCallback,type) => {
	
	try {
		let token = await AsyncStorage.getItem('token');
		let path = apiUrl+url+filter;
		console.log(path);
		fetch(path, {
			method: 'GET', 
			headers: {
				Authorization: `Bearer ${token}`
			}
		}) 
			.then((response) => response.json())
			.then((response) => {
				console.log(url+'setUser log',response);
				if (successCallback != null) {
					let res = response.errors ? response : response;
					successCallback(res,type);
				}
				
			});
	} catch (e) {
		
		if (errorCallback != null) {
			errorCallback();
		}
	}
};



export const getUserByMobile = async (mobile,successCallbackMobile,errorCallback) => {
	

	console.log(apiUrl + '/actions/getUserByMobile?mobile='+mobile);	
	try {
		fetch(apiUrl + '/actions/getUserByMobile?mobile='+mobile, {
			method: 'GET',
			headers: new Headers(headerData)
		})
			.then((response) => response.json())
			.then((response) => {
				console.log('Login log',response);
				//console.log(response);

				if (successCallbackMobile != null) {
					successCallbackMobile(response);
				}
				//dispatch({ type: 'getSingleproperty', data: response });
			})
			.catch(function(error) {
				//alert(error.message)
				console.log('There has been a problem with your fetch operation: ' + error.message);
				 // ADD THIS THROW error
				 if(error && error.message=='Network request failed'){
					errorCallback(error);
					//CodePush.restartApp()
				 }
				
				  throw error;
				});
	} catch (e) {
		if (errorCallback != null) {
			errorCallback(e);
		}
	}
};

/************************************* Post method ******************************/
export const getMethodCall = async (url,filter, successCallback, errorCallback) => {
	
	try {
		//let token = await AsyncStorage.getItem('token');
		let path = apiUrl+url+filter;
		console.log('token',path);
		fetch(path, {
			method: 'GET', 
			headers : {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				
			}
		}) 
			.then((response) => response.json())
			.then((response) => {
				console.log('response',response);
				if (successCallback != null) {
					successCallback(response);
				}
				
			}).catch(function(error) {
				//alert(error.message)
				console.log('There has been a problem with your fetch operation: ' + error.message);
				   errorCallback(error);
				 if(error && error.message=='Network request failed'){	
					//CodePush.restartApp()
				 }
				
				  throw error;
				});
	} catch (e) {
		
		if (errorCallback != null) {
			errorCallback();
		}
	}
};
export const getSearchCall = async (url,filter, successCallback, errorCallback) => {
	try {
		let token = await AsyncStorage.getItem('token');
		let path = apiUrl+url;
		console.log('token',token);
		fetch(path, {
			method: 'GET', 
			headers: {
				Authorization: `Bearer ${token}`
			}
		}) 
			.then((response) => response.json())
			.then((response) => {
				console.log(apiUrl+url+filter,response);
				if (successCallback != null) {
					let res = response.errors ? response : response.data;
					successCallback(res);
				}
				
			});
	} catch (e) {
		
		if (errorCallback != null) {
			errorCallback();
		}
	}
};
export const PostDataCall = async (url,params,successCallback,errorCallback) => {

	try {
		let token = await AsyncStorage.getItem('token');
		let header = {};
		if (token) {
			header = {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			};
		}else{
			header = {
				Accept: 'application/json, text/plain, */*',
				'Content-Type': 'application/json;charset=UTF-8'
			};
		}

		let Dataparams=JSON.stringify(params)
		//console.log('Dataparams',Dataparams);
		let path = apiUrl + url;
		console.log('pathUrl',path);

		fetch(path, {
			method: 'POST',
			mode: 'no-cors',
			headers:header,
			body: Dataparams
		})
			.then((response) => response.json())
			.then((response) => {
				console.log('Data log',response);
				if (successCallback != null) {
					let res = response.errors ? response : response.data;
					successCallback(res);
				}
			});
	} catch (e) {
		if (errorCallback != null) {
			alert('hhhhh')
			errorCallback(e);
		}
	}
};
export const PostDataCallExtraParams = async (url,params,successCallback,errorCallback,extraParams) => {

	try {
		let token = await AsyncStorage.getItem('token');
		let header = {};
		if (token) {
			header = {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			};
		}else{
			header = {
				Accept: 'application/json, text/plain, */*',
				'Content-Type': 'application/json;charset=UTF-8'
			};
		}

		let Dataparams=JSON.stringify(params)
		//console.log('Dataparams',Dataparams);
		let path = apiUrl + url;
		console.log('pathUrl',path);

		fetch(path, {
			method: 'POST',
			mode: 'no-cors',
			headers:header,
			body: Dataparams
		})
			.then((response) => response.json())
			.then((response) => {
				console.log('Data log',response);
				if (successCallback != null) {
					let res = response.errors ? response : response.data;
					successCallback(res,extraParams);
				}
			});
	} catch (e) {
		if (errorCallback != null) {
			alert('hhhhh')
			errorCallback(e);
		}
	}
};



export const PostAttendanceDataCheckinByfile = async (url,params,successCallback,errorCallback,fileparams) => {
	
	try {
		let token = await AsyncStorage.getItem('token');
		let header = {};
		if (token) {
			header = {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			};
		}else{
			header = {
				Accept: 'application/json, text/plain, */*',
				'Content-Type': 'application/json;charset=UTF-8'
			};
		}

		let Dataparams=JSON.stringify(params)
		//console.log('Dataparams',Dataparams);
		let path = apiUrl + url;
		console.log('pathUrl',path);

		fetch(path, {
			method: 'POST',
			mode: 'no-cors',
			headers:header,
			body: Dataparams
		})
			.then((response) => response.json())
			.then((response) => {
				console.log('Data log',response);
				if (successCallback != null) {
					let res = response.errors ? response : response.data;
					successCallback(res,fileparams);
				}
			});
	} catch (e) {
		if (errorCallback != null) {
			errorCallback(e);
		}
	}

}

export const PostAttendanceDataCall = async (url,params,successCallback,errorCallback,jobId) => {

	try {
		let token = await AsyncStorage.getItem('token');
		let header = {};
		if (token) {
			header = {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			};
		}else{
			header = {
				Accept: 'application/json, text/plain, */*',
				'Content-Type': 'application/json;charset=UTF-8'
			};
		}

		let Dataparams=JSON.stringify(params)
		//console.log('Dataparams',Dataparams);
		let path = apiUrl + url;
		console.log('pathUrl',path);

		fetch(path, {
			method: 'POST',
			mode: 'no-cors',
			headers:header,
			body: Dataparams
		})
			.then((response) => response.json())
			.then((response) => {
				console.log('Data log',response);
				if (successCallback != null) {
					let res = response.errors ? response : response.data;
					successCallback(res,jobId);
				}
			});
	} catch (e) {
		if (errorCallback != null) {
			alert('hhhhh')
			errorCallback(e);
		}
	}
}
export const UpdateDataCall = async (url, params,successCallback,errorCallback) => {
	try {
		let token = await AsyncStorage.getItem('token');
		console.log(apiUrl + url);

		fetch(apiUrl + url, {
			method: 'PATCH',
			headers: {
				Accept: 'application/json, text/plain, */*',
				'Content-Type': 'application/json;charset=UTF-8',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(params)
		})
			.then((response) => response.json())
			.then((response) => {
				console.log('patch log',response);
				if (successCallback != null) {
					let res = response.errors ? response : response.data;
					successCallback(res);
				}
			});
	} catch (e) {
		if (errorCallback != null) {
		    errorCallback();
		}
	}
};
export const UpdateDataTextCall = async (url, params,successCallback,errorCallback) => {
	try {
		let token = await AsyncStorage.getItem('token');
		console.log(apiUrl + url);

		fetch(apiUrl + url, {
			method: 'PATCH',
			headers: {
				Accept: 'application/json, text/plain, */*',
				'Content-Type': 'application/json;charset=UTF-8',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(params)
		})
			.then((response) => response.text())
			.then((response) => {
				successCallback(response);
			});
	} catch (e) {
		if (errorCallback != null) {
		    errorCallback();
		}
	}
};

export const UpdateCheckoutByfile = async (url, params,successCallback,errorCallback,fileparams) => {
	try {
		let token = await AsyncStorage.getItem('token');
		console.log(apiUrl + url);

		fetch(apiUrl + url, {
			method: 'PATCH',
			headers: {
				Accept: 'application/json, text/plain, */*',
				'Content-Type': 'application/json;charset=UTF-8',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(params)
		})
			.then((response) => response.json())
			.then((response) => {
				console.log('patch log',response);
				if (successCallback != null) {
					let res = response.errors ? response : response.data;
					successCallback(res,fileparams);
				}
			});
	} catch (e) {
		if (errorCallback != null) {
		    errorCallback();
		}
	}
};

/*************************************  AUTH upload files *****************************************************/
export const Uploadfiles = async (params,successCallback,errorCallback) => {
	
	console.log(apiUrl + '/files');
	console.log('params',params);
	try {
		let token = await AsyncStorage.getItem('token');
		let header = {} ;
		if (token) {
			header = {
				Authorization: `Bearer ${token}`
			};
		}else{
			header = new Headers(headerData);
		}

		fetch(apiUrl + '/files', {
			method: 'POST',
			headers: header,
			body:params
		})
			.then((response) => response.json())
			.then((response) => {
				console.log('get upload file response',response);
				let res =response.errors ? [] : response.data;
				if (successCallback != null) {
					successCallback(res);
				} 

			});
	} catch (e) {

		if (errorCallback != null) {
			errorCallback();
		}
	}
};

export const UploadfilesNew = async (params,successCallback,errorCallback,id) => {
	
	console.log(apiUrl + '/files');
	console.log('params',params);
	try {
		let token = await AsyncStorage.getItem('token');
		let header = {} ;
		if (token) {
			header = {
				Authorization: `Bearer ${token}`
			};
		}else{
			header = new Headers(headerData);
		}

		fetch(apiUrl + '/files', {
			method: 'POST',
			headers: header,
			body:params
		})
			.then((response) => response.json())
			.then((response) => {
				console.log('get upload file response',response);
				let res =response.errors ? [] : response.data;
				if (successCallback != null) {
					successCallback(res,id);
				} 

			});
	} catch (e) {

		if (errorCallback != null) {
			errorCallback();
		}
	}
};





export const postCall = async (url, params, successCallback, errorCallback) => {
	try {
		let path = apiUrl + url;

		fetch(path, {
			method: 'POST',
			mode: 'no-cors',
			headers: new Headers(headerData),
			body: JSON.stringify(params)
		})
			.then((response) => response.json())
			.then((response) => {
				console.log(response);

				if (successCallback != null) {
					let res = response.errors ? response : response.data;
					successCallback(response);
				}
			})
			.catch((err) => {
				if (errorCallback != null) {
					errorCallback(err);
				}
			});
	} catch (e) {
		if (errorCallback != null) {
			errorCallback();
		}
	}
};


/************************************* Put method ******************************/
export const putCall = async (url, params, filter, successCallback, errorCallback) => {
	try {
		let path = apiUrl + url;

		fetch(path, {
			method: 'PUT',
			headers: new Headers(headerData)
		})
			.then((response) => response.json())
			.then((response) => {
				//console.log(response);

				if (successCallback != null) {
					let res = response.errors ? response : response.data;
					successCallback(response);
				}
			})
			.catch((err) => {
				if (errorCallback != null) {
					errorCallback(err);
				}
			});
	} catch (e) {
		if (errorCallback != null) {
			errorCallback();
		}
	}
};


/************************************* Delete method ******************************/
export const deleteCall = async (url, successCallback, errorCallback) => {
	try {
		let path = apiUrl + url;
		let token = await AsyncStorage.getItem('token');
		console.log('deletepath',path);
		fetch(path, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then((response) => response.text())
			.then((response) => {
				console.log('ggggg',response);

				if (successCallback != null) {	
					successCallback(response);
				}
			})
			.catch((err) => {
				if (errorCallback != null) {
					errorCallback(err);
				}
			});
	} catch (e) {
		//alert(e)
		if (errorCallback != null) {
			errorCallback();
		}
	}
};
export const objectToQueryString = (obj) => {
	var str = [];
	for (var p in obj)
	  if (obj.hasOwnProperty(p)) {
		str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	  }
	return str.join("&");
}

export const forgotEmailPassword = async (url, params,successCallback,errorCallback) => {
	
	try {
		//alert(apiUrl + url);

		fetch(apiUrl + url, {
			method: 'POST',
			body: JSON.stringify(params),
			headers: {
				Accept: 'application/json, text/plain, */*',
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
		.then((response) => response.text())
		.then((response) => {
			//alert(response); 
			// Will show you the status
			if (!response) {
				successCallback('success');
			}else{
				errorCallback('error');
			}
			//return response.json();

		})
		
	} catch (e) {
		if (errorCallback != null) {
			//errorCallback();
		}
	}
};

export const getInitials = (fullString,delimiter,maxCount) => {
    let names = fullString.split(delimiter).slice(0, maxCount);
    let initials = names[0].substring(0, 1).toUpperCase();
    for(let i = 1; i < names.length; i++) {
        initials += names[i].substring(0, 1).toUpperCase();
    }
    return initials;
};