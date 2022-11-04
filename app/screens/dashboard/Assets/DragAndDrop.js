import React, {useState, useEffect} from 'react';
import {Box, Button, Icon, useToast, View, Badge, FlatList} from 'native-base';

import {TouchableOpacity, Text, Dimensions, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {DraxProvider, DraxView, DraxList} from 'react-native-drax';

const {height, width} = Dimensions.get('window');
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {
  CardGradientComponent,
  HeaderComponent,
  SuccessModalComponent,
  SuccessModalActivityComponent,
} from '../../../components/component';
var Sound = require('react-native-sound');

import Ding from '../../../assets/weldone.mp3';
import WrongSound from '../../../assets/incorrect.mp3';
import {playSound, playSoundIncorrect} from '../../../components/Functions';
const gestureRootViewStyle = {flex: 1};

export default function DragandDrop(props) {
  const [show, setShow] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(0);
  const [string, setString] = useState(null);
  const [wrongAnswer, setwrongAnswer] = useState(false);
  const [activityCompleted, setActivityCompleted] = useState(false);
  const toast = useToast();

  const questions = [
	 {
      id: '1',
      question: 'The dog is_',
      options: ['reading', 'walking', 'driving', 'crying', 'barking'],
      answer: 'barking',
      result: 'The dog is__barking_____',
    },
	 {
      id: '2',
      question: 'The boy is_',
      options: ['reading', 'walking', 'crying', 'barking', 'driving',],
      answer: 'reading',
      result: 'The boy is__reading_____',
    },
	 {
      id: '3',
      question: 'The man is_',
      options: ['reading', 'driving', 'crying','walking', 'barking'],
      answer: 'driving',
      result: 'The man is__driving_',
    },
	 {
      id: '4',
      question: 'The baby is_',
      options: ['reading', 'crying', 'walking', 'driving',  'barking'],
      answer: 'crying',
      result: 'The baby is__crying_____',
    },
	 {
      id: '5',
      question: 'The girl is_',
      options: ['reading',  'driving','walking', 'crying', 'barking'],
      answer: 'walking',
      result: 'The girl is__walking_____',
    },
  ];
  	const [answer, setAnswer] = React.useState(questions[currentIndex].answer);
   const [dragAnswer, setDragAnswer] = React.useState(null);
  

  const setSuccess = () => {
	setDragAnswer(null);
    if (questions.length - 1 > currentIndex) {
      setCurrentIndex(currentIndex + 1);
      setCorrectAnswer(false);
      setSelectedOption(null);
    } else {
      setActivityCompleted(true);
    }
  };

  const CompletedActivity = () => {
    setCurrentIndex(0);
    setActivityCompleted(false);
    props.navigation.goBack();
  };

  useEffect(() => {
    setString(questions[currentIndex].question);
  });

  const LeftNav = () => {
	setDragAnswer(null);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const RightNav = () => {
	setDragAnswer(null);
    if (questions.length - 1 > currentIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  
  const ReceivingZoneUIComponent = (item) => {
	
	return (
		 <DraxView
			  style={[styles.centeredContent, styles.receivingZone]}
			  //receivingStyle={styles.receiving}
			  renderContent={({ viewState }) => {
					const receivingDrag = viewState && viewState.receivingDrag;
					const payload = receivingDrag && receivingDrag.payload;
					return (
						 <View>
							  {dragAnswer ? 
                  <Text style={styles.textStyleQuestion}> {item.question.replace("_", '')} <Text style={styles.dragAnswerStyle}>{item.answer}</Text></Text>
                  :
                  <Text style={styles.textStyleQuestion}> {item.question.replace("_", '_________')}</Text>
                }
						 </View>
					);
			  }}
	
			  onReceiveDragDrop={({ dragged: { payload } }) => {
					//console.log(`received ${payload}`);
					if (payload == item.answer) {
						 //alert("Wright answer");
						 setDragAnswer(payload);
						 setCorrectAnswer(true);
						 playSound();
					} else {
						 //alert("Wrong answer !!!");
						 setDragAnswer(null);
						 setwrongAnswer(true)
      				playSoundIncorrect();
					}
			  }}

		 />
	);
};

  return (
    <Box flex="1">
      <HeaderComponent
        wrapperColor="#151218"
        bgColor="#273897"
        headerTitle={props.route.params.title}
        nav={props.navigation}
        LeftContent={'goback'}
      />

      <View style={{padding: 10}}>
        <Text style={{fontSize: 18, color: '#0AB4B6', fontWeight: 'bold'}}>
          Drag your answer and drop it into the question.
        </Text>
      </View>
      <View
        style={{
          shadowColor: '#808080',
          backgroundColor: '#f1f1f1',
          margin: 5,
          padding: 5,
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 5,
			 height:350
        }}>

		<GestureHandlerRootView style={gestureRootViewStyle}>
            <DraxProvider>
                <View style={styles.container}>
                    <View style={styles.receivingContainer}>
                        { ReceivingZoneUIComponent(questions[currentIndex])}
                    </View>

                    <View style={styles.draxListContainer}>
                        {questions[currentIndex]?.options.map((item, index) => {
                            if (dragAnswer != item) {
                                return (
                                    <DraxView
                                        style={[styles.draggableBox, { marginBottom: 20 }]}
                                        draggingStyle={styles.dragging}
                                        dragReleasedStyle={styles.dragging}
                                        hoverDraggingStyle={styles.hoverDragging}
                                        dragPayload={item}
                                        longPressDelay={150}
                                        key={index}
													 onDragStart={() => {
														console.log("start drag", item);
														setAnswer(item.answer);
												  }}
                                    >
                                        <Text style={styles.textStyle}>{item}</Text>
                                    </DraxView>
                                );
                            }
                        })}
                        
                    </View>
                </View>
            </DraxProvider>
        </GestureHandlerRootView>
       
      </View>

      <View style={{marginTop: 10}}>
        <View
          style={{
            height: 50,
            margin: 10,
            borderRadius: 5,
            shadowColor: '#0AB4B6',
            backgroundColor: '#f3f2f1',
            // margin:10,
            // padding:10,
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 5,
          }}>
          <View style={{flexDirection: 'row', padding: 5}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Button
                onPress={() => LeftNav()}
                leftIcon={
                  <Icon as={FontAwesomeIcon} name="chevron-left" size="lg" />
                }>
                <Text
                  style={{
                    fontSize: 16,
                    fontStyle: 'italic',
                    fontWeight: 'bold',
                    color: '#fff',
                  }}>
                  Previous
                </Text>
              </Button>
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text
                style={{
                  fontSize: 20,
                  fontStyle: 'italic',
                  color: '#000',
                  fontWeight: 'bold',
                  alignSelf: 'center',
                }}>
                {currentIndex + 1}/{questions.length}
              </Text>
            </View>

            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Button
                onPress={() => RightNav()}
                endIcon={
                  <Icon
                    as={FontAwesomeIcon}
                    name="chevron-right"
                    size="lg"
                    alignItems={'flex-end'}
                  />
                }>
                <Text
                  style={{
                    fontSize: 16,
                    fontStyle: 'italic',
                    fontWeight: 'bold',
                    color: '#fff',
                  }}>
                  Next
                </Text>
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
        isVisible={correctAnswer ? true : false}
        onPressOk={() => {
          setSuccess();
        }}
      />

      <SuccessModalActivityComponent
        title={'No! Try again.'}
        subTitle={'Incorrect Answer.Please try again.'}
        type={'Error'}
        okText={'TRY AGAIN'}
        isVisible={wrongAnswer ? true : false}
        onPressOk={() => {
          setwrongAnswer(false);
        }}
      />
      <SuccessModalActivityComponent
        title={'Congratulations !'}
        subTitle={''}
        type={'Success'}
        isVisible={activityCompleted ? true : false}
        okText={'Submit'}
        onPressOk={() => {
          CompletedActivity();
        }}
      />
    </Box>
  );
}
const styles = StyleSheet.create({
	container: {
		 flex: 1,
		 padding: 12,
		 paddingTop: 0,
		 justifyContent: "space-evenly",
	},
	centeredContent: {
		 borderRadius: 10,
	},
	receivingZone: {
		 height: Dimensions.get("window").width / 4 - 12,
		 borderRadius: 10,
		 width: "99%", //(Dimensions.get('window').width / 4) - 12,
		 justifyContent: "center",
		 alignItems: "center",
		 marginRight: 5,
	},

	receiving: {
		 borderColor: "red",
		 borderWidth: 2,
	},
	
	draggableBox: {
		 width: 100, //(Dimensions.get('window').width / 4) - 12,
		 height: 40, //(Dimensions.get('window').width / 4) - 12,
		 borderRadius: 6,
		 display: "flex",
		 flexDirection: "row",
		 justifyContent: "space-evenly",
		 alignItems: "center",
		 marginRight: 5,
		 backgroundColor:'#fff',
		
	},
	
	textStyleAnswer: {
		 width: 100, //(Dimensions.get('window').width / 4) - 12,
		 height: 40, //(Dimensions.get('window').width / 4) - 12,
		 borderRadius: 6,
		 backgroundColor: "#fff",
		 color: "#000",
		 fontSize: 18,
		 padding: 5,
	},

	dragging: {
		 opacity: 0.2,
	},

	hoverDragging: {
		 borderColor: "magenta",
		 borderWidth: 2,
	},

	receivingContainer: {
		 flexDirection: "row",
		 justifyContent: "space-evenly",
	},

	itemSeparator: {
		 height: 15,
	},
	draxListContainer: {
		
		 display: "flex",
		 flexDirection: "row",
		 flexWrap: "wrap",
		 justifyContent:'space-between',
		 alignItems: "center",
		 padding: 5,
		// height: 200,
	},
	receivingZoneContainer: {
		 padding: 5,
		 height: 100,
	},
	textStyle: {
		 fontSize: 18,
		 fontWeight:'500',
		
	},
	textStyleQuestion: {
		 fontSize: 20,
		 fontWeight : 'bold'
		// color: "#ffffff",
	},
  dragAnswerStyle:{
    fontSize: 20,
		 fontWeight : 'bold',
     color:'#0AB4B6',fontWeight:'bold',fontStyle:'italic',textDecorationLine:'underline',textDecorationColor:'#000'
  }

});