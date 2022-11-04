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
    Input,
    WarningOutlineIcon,
    Icon,Select,
    useToast,
    View,
    Badge,
    FlatList
  } from 'native-base';
  
import {
    TouchableOpacity,
    Text,
  Dimensions,
} from 'react-native';
import 'react-native-gesture-handler';
const {height, width} = Dimensions.get('window');
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import {
  CardGradientComponent,
  HeaderComponent,
  SuccessModalComponent,
  SuccessModalActivityComponent
} from '../../../components/component';
var Sound = require('react-native-sound');
import Ding from '../../../assets/weldone.mp3'
import WrongSound from '../../../assets/incorrect.mp3'
import {playSound,playSoundIncorrect} from '../../../components/Functions'
//import VideoPlayer from 'react-native-video-player';

export default function Home(props) {
  const [show, setShow] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(0);
  const [string, setString] = useState(null);
  const [wrongAnswer, setwrongAnswer] = useState(false);
  const [activityCompleted, setActivityCompleted] = useState(false);
  const toast = useToast();
 // let options=["Green","Orange","Yellow","Purple","Orange"];
  const Questions=[{question:'- is a carrot',options:["Green","Orange","Yellow","Purple","Red"],answer:'Orange'},
  {question:'- is the grass',options:["Green","Orange","Yellow","Purple","Red"],answer:'Green'},
  {question:'- is a bear',options:["Black","Red","Yellow","Brown","Blue"],answer:'Brown'},
  {question:'- is a plum',options:["Black","Blue","Yellow","Brown","Purple"],answer:'Purple'},
  {question:'- is a whale',options:["Black","Blue","Yellow","Brown","Purple"],answer:'Blue'},
  {question:'- is a witch’s hat',options:["Black","Orange","Yellow","Purple","Orange"],answer:'Black'}]
  //let arr=[1,2,3,4];
  //const arr=['a','A','C', 'Z', 'b', 'B', 'd', 'E', 'z'];
  const setCheckAnswer = (value) => {
   // setShow(false);
    
    if(Questions[currentIndex].answer==value){
        setSelectedOption(value);
        setCorrectAnswer(true);
        playSound();
    
        setTimeout(()=>{
            //setCurrentIndex(currentIndex+1)
           // setCorrectAnswer(false);
          //  setSelectedOption(null);
        },1000)
    }else{
      setwrongAnswer(true)
      playSoundIncorrect();
    }
  };
 const setSuccess=()=>{
  

  if(Questions.length-1 > currentIndex){
    //alert(Questions.length > currentIndex);
 // return;
      setCurrentIndex(currentIndex+1)
      setCorrectAnswer(false);
      setSelectedOption(null);
  }else{
      setActivityCompleted(true)
  }
 }
 const CompletedActivity=()=>{
  setCurrentIndex(0);
  setActivityCompleted(false)
  props.navigation.goBack()
 }
//  let whoosh =new Sound(Ding, error => {
//   if (error) {
//     console.log('failed to load the sound', error);
//     return;
//   }
  
// });

// let IncorrectSound =new Sound(WrongSound, error => {
//   if (error) {
//     console.log('failed to load the sound', error);
//     return;
//   }
 
// });

// Reduce the volume by half
//whoosh.setVolume(0.5);

// Position the sound to the full right in a stereo field
//whoosh.setPan(1);

  useEffect(()=>{
    setString(Questions[currentIndex].question);
    // setTimeout(()=>{
    //   playSound()
    // },3000)
     
   
  })
//  const playSound=()=>{
//   whoosh.play((success) => {
//     if (success) {
//       console.log('successfully finished playing');
//     } else {
//       console.log('playback failed due to audio decoding errors');
//     }
//   })

//  }
//  const playSoundIncorrect=()=>{
//   IncorrectSound.play((success) => {
//     if (success) {
//       console.log('successfully finished playing');
//     } else {
//       console.log('playback failed due to audio decoding errors');
//     }
//   })

//  }

  const modifiedString = () => {
    const splitString = string.split("-");
    var newStr = <Text style={{fontSize:20,color:'#000000',fontWeight:'bold'}}>{currentIndex+1} . </Text>;
    splitString.map((subStr, i) => {
      newStr =  <Text>
                   
                  <Text style={{fontSize:20,color:'#000000',fontWeight:'bold'}}>{newStr}</Text> 
                  <Text style={{fontSize:20,color:'#000000',fontWeight:'bold'}}>{subStr}</Text> 
                  {splitString.length - 1 === i ? null : <Text style={{fontSize:20,color:'#0AB4B6',fontWeight:'bold',fontStyle:'italic',textDecorationLine:'underline',textDecorationColor:'#000'}}>{selectedOption}</Text>}
                </Text>;
    });
    //console.log(newStr);
    return newStr;
  };
const LeftNav=()=>{
  if(currentIndex>0){
    setCurrentIndex(currentIndex-1)
  }
}
const RightNav=()=>{
  if(Questions.length-1 > currentIndex){
    setCurrentIndex(currentIndex+1)
  }
}

  return (
    <Box flex="1" >
      <HeaderComponent
        wrapperColor="#151218"
        bgColor="#273897"
        headerTitle={props.route.params.title}
        nav={props.navigation}
        LeftContent={'goback'}
      />
   
       <View style={{padding:10}}>
          <Text style={{fontSize:18,color:'#0AB4B6',fontWeight:'bold'}}>Click on the correct answer</Text>
       </View>     
       <View style={{
            shadowColor: '#808080',
            backgroundColor:'#f1f1f1',
            margin:10,
            padding:10,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.8,
            shadowRadius: 2,  
            elevation: 5}}>
           
           {correctAnswer?modifiedString():
          string? <Text style={{fontSize:20,color:'#000000',fontWeight:'bold'}}> {currentIndex+1}. <Text>{ string.replace("-", '_______')}</Text></Text>:false}
           
           <View style={{marginTop:10,flexDirection:'row',padding:10}}>
            <FlatList
            data={Questions.length>0?Questions[currentIndex].options:[]}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{flex: 1,
                justifyContent: "space-between"}}

            numColumns={3}
                  style={{marginTop:10,}}
                  renderItem={({item, index}) =>(
                    <Box style={{padding:10}}>
                        <TouchableOpacity onPress={()=>setCheckAnswer(item)}>
                                <Badge size={50} style={{borderRadius:5}} colorScheme={selectedOption==item?"success":"warning"}  variant={selectedOption==item?'solid':'outline'}>
                                <Text style={{fontSize:18,padding:5,color:selectedOption==item?"#fff":'orange'}}>{item}</Text>
                                </Badge>
                        </TouchableOpacity>
                   </Box>
                  )}
                  />
       
            
           </View>
       </View>

       <View style={{marginTop:10}}>
            <View style={{height:50,margin:10,borderRadius:5, shadowColor: '#0AB4B6',
            backgroundColor:'#f3f2f1',
           // margin:10,
           // padding:10,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.8,
            shadowRadius: 2,  
            elevation: 5}}>
            <View style={{flexDirection:'row',padding:5,}}>
            <View  style={{flex:1,flexDirection:'row'}}>
            <Button onPress={()=>LeftNav()} leftIcon={<Icon as={FontAwesomeIcon} name="chevron-left" size="lg" />}>
               <Text style={{fontSize:16,fontStyle:'italic',fontWeight:'bold',color:'#fff'}}>Previous</Text>
            </Button>
           
            </View>
            <View style={{flex:1,justifyContent:'center'}}>
                 <Text style={{fontSize:20,fontStyle:'italic',color:'#000',fontWeight:'bold',alignSelf:'center'}}>{currentIndex+1}/{Questions.length}</Text>
            </View>
         
            <View  style={{flex:1,alignItems:'flex-end',}}>
               
                <Button onPress={()=>RightNav()} endIcon={<Icon as={FontAwesomeIcon} name="chevron-right" size="lg" alignItems={'flex-end'} />}>
                    <Text style={{fontSize:16,fontStyle:'italic',fontWeight:'bold',color:'#fff'}}>Next</Text>
                 </Button>
  
            </View>
            
            </View>
            </View>
         </View>
      <SuccessModalActivityComponent
			title={'Well Done !'}
			subTitle={'Correct Answer.Congratulations!'}
      okText={'NEXT'}
			type={'Success'}
			isVisible={correctAnswer?true:false}
			onPressOk={() => {
				setSuccess();
				
			}}
		/>
      <SuccessModalActivityComponent
			title={'No! Try again.'}
			subTitle={'Incorrect Answer.Please try again.'}
			type={'Error'}
      okText={'TRY AGAIN'}
			isVisible={wrongAnswer?true:false}
			onPressOk={() => {
				setwrongAnswer(false);
			}}
		/>
     <SuccessModalActivityComponent
			title={'Congratulations !'}
			subTitle={''}
			type={'Success'}
			isVisible={activityCompleted?true:false}
			okText={'Submit'}
			onPressOk={() => {
				CompletedActivity();
			}}
		/>
    </Box>
  
  );
}
