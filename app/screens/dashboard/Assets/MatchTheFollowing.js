import React, {useState, useEffect} from 'react';
import {Box, Button, Icon, useToast, View, Badge, FlatList} from 'native-base';

import {TouchableOpacity, Text, Dimensions} from 'react-native';
import 'react-native-gesture-handler';
const {height, width} = Dimensions.get('window');
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Svg, Circle, Line} from 'react-native-svg';
import {
  HeaderComponent,
  SuccessModalActivityComponent,
} from '../../../components/component';

var Sound = require('react-native-sound');
import {playSound, playSoundIncorrect} from '../../../components/Functions';

export default function MatchTheFollowing(props) {
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [chooseQuestion, setChooseQuestion] = useState(undefined);
  
  const [wrongAnswer, setwrongAnswer] = useState(false);
  const [activityCompleted, setActivityCompleted] = useState(false);

  const [points, setPoints] = useState({
    A: {x1: 0, y1: 0, x2: 0, y2: 0},
    B: {x1: 0, y1: 0, x2: 0, y2: 0},
    C: {x1: 0, y1: 0, x2: 0, y2: 0},
    D: {x1: 0, y1: 0, x2: 0, y2: 0},
    E: {x1: 0, y1: 0, x2: 0, y2: 0},
  });
  //console.log('point', points[4].y2);

  const [pointA, setPointA] = useState({
    0: {x1: 38, y1: 30, x2: 138, y2: 30},
    1: {x1: 38, x2: 30, y1: 138, y2: 90},
    2: {x1: 38, x2: 30, y1: 138, y2: 150},
    3: {x1: 38, x2: 30, y1: 138, y2: 210},
    4: {x1: 38, x2: 30, y1: 138, y2: 260},
  });

  const [pointB, setPointB] = useState({
    0: {x1: 38, y1: 30, x2: 328, y2: -60},
    1: {x1: 38, x2: 30, y1: 138, y2: 30},
    2: {x1: 38, x2: 30, y1: 138, y2: 90},
    3: {x1: 38, x2: 30, y1: 138, y2: 150},
    4: {x1: 38, x2: 30, y1: 138, y2: 210},
  });

  const [pointC, setPointC] = useState({
    0: {x1: 38, y1: 120, x2: 136, y2: 0},
    1: {x1: 38, y1: 120, x2: 136, y2: 70},
    2: {x1: 38, y1: 120, x2: 136, y2: 120},
    3: {x1: 38, y1: 120, x2: 136, y2: 170},
    4: {x1: 38, y1: 120, x2: 136, y2: 230},
  });

 
  const [pointD, setPointD] = useState({
    0: {x1: 38, y1: 158, x2: 138, y2: 0},
    1: {x1: 38, y1: 158, x2: 138, y2: 50},
    2: {x1: 38, y1: 158, x2: 138, y2: 110},
    3: {x1: 38, y1: 158, x2: 138, y2: 160},
    4: {x1: 38, y1: 158, x2: 138, y2: 210},
  });

  const [pointE, setPointE] = useState({
    0: {x1: 38, y1: 210, x2: 138, y2: 0},
    1: {x1: 38, y1: 210, x2: 138, y2: 50},
    2: {x1: 38, y1: 210, x2: 138, y2: 110},
    3: {x1: 38, y1: 210, x2: 138, y2: 160},
    4: {x1: 38, y1: 210, x2: 138, y2: 210},
  });

  const linecolor = ['red', 'green', 'blue', 'brown', 'purple'];
  const Questions = [
    {
      questionsRow: ['Blackboard', 'Uniform', 'Tiffen Box', 'Desk', 'Backpack'],
      answerRow: ['Backpack', 'Desk', 'Uniform', 'Tiffen Box', 'Blackboard'],
      answer: [4, 2, 3, 1, 0],
      answers: {
        Blackboard: 4,
        Uniform: 2,
        'Tiffen Box': 3,
        Desk: 1,
        Backpack: 0,
      },
    },
  ];

  const handleMathlines = (ans, qst) => {
    if (qst == 0) {
      let obj = pointA[ans];
      points.A = obj;
    }
    if (qst == 1) {
      let obj = pointB[ans];
      points.B = obj;
    }
    if (qst == 2) {
      let obj = pointC[ans];
      points.C = obj;
    }
    if (qst == 3) {
      let obj = pointD[ans];
      points.D = obj;
    }
    if (qst == 4) {
      let obj = pointE[ans];
      points.E = obj;
    }
	console.log('points', points);
  };

  const setCheckAnswer = (value, index) => {
    if (chooseQuestion) {
      let obj = Questions[currentIndex].answers;
      let verify = Object.keys(obj).filter(i => obj[i] == index)[0];

      let questionIndex =
        Questions[currentIndex].questionsRow.indexOf(chooseQuestion);
      //alert(index)
      if (verify == chooseQuestion) {
        handleMathlines(index, questionIndex);
        setSelectedOption(value);
        //setCorrectAnswer(true);
        playSound();
      } else {
        setSelectedOption(null);
        setwrongAnswer(true);
        playSoundIncorrect();
      }
    }
    return null;
  };

  const setSuccess = () => {
    if (Questions.length - 1 > currentIndex) {
     
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

  const LeftNav = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const RightNav = () => {
    if (Questions.length - 1 > currentIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePress = (name, i) => {
    setSelectedOption(null);
    setChooseQuestion(name);
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
          Match the Following.Click in the first row the click on the pair in
          second row
        </Text>
      </View>

      <View
        style={{
          width: 380,
          height: 360,
          shadowColor: '#808080',
          backgroundColor: '#f1f1f1',
          margin: 5,
          padding: 5,
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 5,
        }}>
        <View style={{marginTop: 10}}>
          <FlatList
            data={Questions[currentIndex].questionsRow}
            showsVerticalScrollIndicator={false}
            style={{marginTop: 10}}
            renderItem={({item, index}) => (
              <Box
                style={{
                  padding: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <TouchableOpacity
                  key={item}
                  onPress={() => handlePress(item, index)}
                  style={{borderRadius: 5, width: '35%'}}>
                  <Badge
                    size={50}
                    style={{borderRadius: 5}}
                    colorScheme={chooseQuestion == item ? 'success' : 'info'}
                    variant={chooseQuestion == item ? 'solid' : 'outline'}>
                    <Text
                      style={{
                        fontSize: 18,
                        padding: 5,
                        color: chooseQuestion == item ? '#fff' : 'orange',
                      }}>
                      {item}
                    </Text>
                  </Badge>
                </TouchableOpacity>

                <View style={{position: 'absolute', left: '28%', top: 0}}>
                  {index == 0 && points.A && points.A.x1 > 0 && (
                    <Svg height="270" width="180">
                      <Line
                        x1={38}
                        y1={30}
                        x2={138}
                        y2={points.A.y2}
                        stroke="green"
                        strokeWidth="2"
                      />
                    </Svg>
                  )}

                  {index == 1 && points.B && points.B.x1 > 0 && (
                    <Svg height="270" width="180">
                      <Line
                        x1={38}
                        y1={30}
                        x2={128}
                        y2={points.B.y2}
                        stroke="red"
                        strokeWidth="2"
                      />
                    </Svg>
                  )}

                  {index == 2 && points.C && points.C.x1 > 0 && (
                    <View
                    style={{position: 'absolute', left: '28%', top: -90}}>
                      <Svg height="270" width="180" fillOpacity="0.5">
                        <Line
                          x1={38}
                          y1={120}
                          x2={136}
                          y2={points.C.y2}
                          stroke="blue"
                          strokeWidth="2"
                        />
                       
                      </Svg>
                    </View>
                  )}
                  {index == 3 && points.D && points.D.x1 > 0 && (
                    <View
                      style={{position: 'absolute', left: '28%', top: -128}}>
                      <Svg height="270" width="180" fillOpacity="0.5">
                        <Line
                          x1={points.D.x1}
                          y1={points.D.y1}
                          x2={points.D.x2}
                          y2={points.D.y2}
                          stroke="brown"
                          strokeWidth="2"
                        />
                      </Svg>
                    </View>
                  )}

                  {index == 4 && points.E && points.E.x1 > 0 && (
                    <View
                      style={{position: 'absolute', left: '28%', top: -186}}>
                      <Svg height="270" width="180" fillOpacity="0.5">
                        <Line
                          x1={points.E.x1}
                          y1={points.E.y1}
                          x2={points.E.x2}
                          y2={points.E.y2}
                          stroke="orange"
                          strokeWidth="2"
                        />
                      </Svg>
                    </View>
                  )}

                </View>
                <TouchableOpacity
                  onPress={() =>
                    setCheckAnswer(
                      Questions[currentIndex].answerRow[index],
                      index,
                    )
                  }
                  style={{borderRadius: 5, width: '35%'}}>
                  <Badge
                    size={50}
                    style={{borderRadius: 5}}
                    colorScheme={
                      selectedOption == Questions[currentIndex].answerRow[index]
                        ? 'success'
                        : 'warning'
                    }
                    variant={
                      selectedOption == Questions[currentIndex].answerRow[index]
                        ? 'solid'
                        : 'outline'
                    }>
                    <Text
                      style={{
                        fontSize: 18,
                        padding: 5,
                        color:
                          selectedOption ==
                          Questions[currentIndex].answerRow[index]
                            ? '#fff'
                            : 'orange',
                      }}>
                      {Questions[currentIndex].answerRow[index]}
                    </Text>
                  </Badge>
                </TouchableOpacity>
              </Box>
            )}
          />
        </View>
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
                {currentIndex + 1}/{Questions.length}
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
