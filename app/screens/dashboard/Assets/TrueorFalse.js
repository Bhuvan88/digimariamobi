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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  SuccessModalActivityComponent,
  HeaderComponent,
  SuccessModalComponent,
} from '../../../components/component';
import {playSound,playSoundIncorrect} from '../../../components/Functions'

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
  const Questions=[{question:'A spider has eight legs.',answer:'True'},
  {question:'Anything that crawls is an insect.',answer:'False'},
  {question:'Bees and butterflies are insects.',answer:'True'},
  {question:'Butterflies can fly.',answer:'True'},
  {question:'Ants are not insects.',answer:'True'}]
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
  useEffect(()=>{
    setString(Questions[currentIndex].question);

  })
 

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
          <Text style={{fontSize:18,color:'#0AB4B6',fontWeight:'bold'}}>Select True OR False</Text>
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
           
          <Text style={{fontSize:18,color:'#000000',fontWeight:'bold'}}> {currentIndex+1}. {string}</Text>
           
           <View style={{marginTop:20,flexDirection:'row',justifyContent:'space-around'}}>
           
           
                <Button colorScheme={'success'} onPress={()=>setCheckAnswer('True')}  leftIcon={<Icon as={FontAwesomeIcon} name="check-circle" size="lg" />}>
                    <Text style={{fontSize:18,fontStyle:'italic',fontWeight:'bold',color:'#fff'}}>True</Text>
                </Button>
          
                <Button colorScheme={'danger'} onPress={()=>setCheckAnswer('False')} leftIcon={<Icon as={FontAwesomeIcon} name="times-circle" size="lg" />}>
                    <Text style={{fontSize:18,fontStyle:'italic',fontWeight:'bold',color:'#fff'}}>False</Text>
                </Button>
            
          
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
