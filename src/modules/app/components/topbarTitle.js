import React from "react";


import { Icon } from "react-native-vector-icons/Ionicons";

import {
    View,
    Text,
    Platform
} from "react-native";
import IconWithBadge from "../../_global/Icons";


class Title extends React.Component {
    render() {
        return (
            <View style={{
                ...Platform.select({
                    android:{
                        paddingRight: 16,
                        //marginLeft: 8
                    }
                }),
                backgroundColor: 'green',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center'

                ,//marginRight: 10,
                //paddingRight: 10
            }}>
               <Text>
                   Title
               </Text>
            </View>

        )
    }
}


export default Title 