import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const CustomButton = ({
    onPress = () => { },
    btnStyle = {},
    btnText

}) => {
    return (
        <TouchableOpacity onPress={onPress}
            style={{ ...styles.btnStyle, ...btnStyle }}
        >
            <Text>{btnText}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton

const styles = StyleSheet.create({
    btnStyle: {

        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 16,
        borderWidth: 1

    }

})
