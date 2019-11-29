import { Alert, StyleSheet, Platform } from 'react-native';
import { colors } from '../../_global/theme';

export default styles = StyleSheet.create({
    progressBar: {
        flex: 1,
    },
    mainContainer: {
        flex: 1,
        //backgroundColor: colors.primary,
        //padding: 7,
        //justifyContent: 'center',
        //alignItems: 'center'
    },
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    flatList: {
        flex: 1,
        padding: 7
    },
    header: {
      position:'relative',
      top: 10,
      left: 0,
      //backgroundColor: 'white', //"#00BFFF",
      width : '50%',
      height: 100,
      justifyContent: 'center',
      alignItems:"center",
      opacity: 1
    },
    footer: {
      position:'absolute',
      bottom: 0,
      left: 0,
      //backgroundColor: 'white', //"#00BFFF",
      width : '100%',
      //height: '200',
      opacity: 1
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 30
    },
    name: {
        fontSize: 22,
        color: "#FFFFFF",
        fontWeight: '600',
    },
    body: {
        marginTop: 40,
    },
    infoContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
        paddingBottom: 10
    },
    name: {
        fontSize: 28,
        color: "#696969",
        fontWeight: "600"
    },
    job: {
        fontSize: 16,
        color: "#00BFFF",
        marginTop: 10
    },
    description: {
        fontSize: 16,
        color: "#696969",
        marginTop: 10,
        textAlign: 'center'
    },
    row:{
        //flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent:'center'
    },
    left:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    right:{
        flex: 3,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    leftText:{
        fontSize: 16,
        color: "#696969",
        marginTop: 10,
        textAlign: 'left'
    },
    rightText:{
        fontSize: 16,
        color: "#696969",
        marginTop: 10,
        textAlign: 'right'
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: colors.primary,
        alignSelf: 'center'
    },
    buttonContainerDisabled: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#00BFFF",
        opacity: 0.5,
        alignSelf: 'center'
    },
    buttontext: {
        color: 'white',
        fontSize: 14
    },
    buttontextDisabled: {
        color: 'white',
        fontSize: 14
    },
    prfContent: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        //padding: ,
        //paddingLeft: 10
    },
    seperator: {
        backgroundColor: colors.primary,
        height: 1,
        width: '15%',
        marginTop: 3
        //flex:1
    },
    textInput: {
        margin: 1.5,
        borderWidth: 1,
        paddingHorizontal: 5,
        padding: 7,
        borderColor: colors.primary,
        borderRadius: 50,
        backgroundColor: 'white',
        ...Platform.select({
            ios: {
                height: 20
            },
            android: {
                height: 30
            }
        })
    },
    searchboxBorder: {
        borderRadius: 50,
        borderColor: colors.primary,
        borderWidth: 2,
        backgroundColor: 'white',
        //paddingHorizontal: 3
    },
    searchbox: {
        flex: 1,
        marginRight: 5,
        backgroundColor: 'white',
        //paddingHorizontal: 16,
        //paddingVertical: 8,
        //marginBottom: 16,
        borderRadius: 50,
    },
    flatListCats: {
        flex: 1,
        marginTop: 5,

    },
});
