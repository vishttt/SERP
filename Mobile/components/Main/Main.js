import React, { Component } from 'react';
import {View, Text} from 'react-native';
class Main extends Component {
    state = {  }
    render() {
        return (
            <View style = {{ flex: 1, backgroundColor: 'gray' }} >
                <Text>Main</Text>
            </View>
        );
    }
}

export default Main;