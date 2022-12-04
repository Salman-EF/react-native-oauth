import Toast from 'react-native-root-toast';

export default class Toasts {

   static SimpleToast = (message:string) => Toast.show(message, {
      duration: 5000,
      position: -100,
      opacity: 1,
      backgroundColor: '#F6F6F6',
      shadow: false,
      textColor: '#242426',
      
   });
}