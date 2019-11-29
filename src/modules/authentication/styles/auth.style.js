import {
    StyleSheet
} from 'react-native'
import { colors } from '../../_global/theme'
const styles = StyleSheet.create(
    {
        container: {
            flex:1,
            justifyContent:'center',
            alignItems: 'center',
            padding:7,
            backgroundColor:colors.primaryBackGround,
            margin:0
        },
        btnHolder:{
            //flex:1,
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'black'
        },
    }
)
export default styles