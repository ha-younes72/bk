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
            flex: 1,
        },
        containerContent:{
            flex:1,
            justifyContent: 'center',
        },
        inputMainContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
        },
        inputContainer: {
            flex: 1
            //borderRadius: 5,
            //backgroundColor: 'white'
        },
        input: {
            borderRadius: 30,
            backgroundColor: 'white',
            margin: 10,
            paddingHorizontal: 8,
            //width: '100%',
            //flex:1,
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