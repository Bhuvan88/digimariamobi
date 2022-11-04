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
} from '../components/component';
var Sound = require('react-native-sound');
import Ding from '../assets/weldone.mp3'
import WrongSound from '../assets/incorrect.mp3'
let whoosh =new Sound(Ding, error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    // loaded successfully
    //console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
    
  });
  
  let IncorrectSound =new Sound(WrongSound, error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    // loaded successfully
    //console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
    
  });

export function playSound(props) {
    setTimeout (()=>{
    whoosh.play((success) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      })
    },300)
}

export function playSoundIncorrect(){
    setTimeout (()=>{
    IncorrectSound.play((success) => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    })
      },300)
   }
