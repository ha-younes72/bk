import {
  StyleSheet
} from 'react-native'
import { colors } from '../../_global/theme'

const styles = StyleSheet.create(
  {
    progressBar: {
      backgroundColor: colors.primary,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    container: {
      backgroundColor: colors.primary,
      //backgroundOpacity: 0.5,
      //opacity: 0.5,
      flex: 1,
      justifyContent: 'center',
    },
    heading: {
      //position: 'absolute',
      //top: 0,
      fontSize: 40,
      justifyContent: 'center',
      marginBottom: 100,
      margin: 10
      //flex: 8
    },
    headingText: {
      color: 'white',
      fontSize: 40,
      textAlign: 'center',
    },
    inputMainContainer: {
      //backgroundColor: 'gray',
      //flex: 4,
      justifyContent: 'center',
      marginBottom: 20,
      //borderRadius: 5,
      //minHeight: 90,
    },
    inputContainer: {
      //borderRadius: 5,
      //backgroundColor: 'white'
    },
    input: {
      borderRadius: 30,
      backgroundColor: 'white',
      margin: 10,
      paddingHorizontal: 8,
      //flex:1
      height: 50
    },
    buttonContainer: {
      //flex:1.5,
      justifyContent: 'center',
      flexDirection: 'row',
      margin: 10,
      height: 50
      //minHeight: 50
      //width: '100%'
    },
    button: {
      height: 50,
      width: '100%',
      backgroundColor: 'gray',
      justifyContent: 'center',
      //alignItems: 'center',
      //margin: 30,
      //marginBottom: 60,
      //flex:1,
      borderLeftWidth: 2,
      borderLeftColor: 'white',
    },
    buttonInner: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttontext: {
      fontSize: 20,
      color: 'white'
    }
  }
)

export default styles