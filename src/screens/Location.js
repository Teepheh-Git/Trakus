import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import AddressPickup from '../components/AddressPickup';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/core';
import { showError, showSuccess } from '../helper/helperFunction';



const Location = (props) => {

    const navigation = useNavigation()
    const [state, setState] = useState({
        pickupCords: {},
        destinationCords: {},
    });

    const { pickupCords, destinationCords } = state;


    const checkValid = () => {

        if (Object.keys(pickupCords).length === 0) {
            showError('Please enter your starting location')
            return false
        }
        if (Object.keys(destinationCords).length === 0) {
            showError('Please enter your destination location')
            return false
        }

        return true;

    }


    const onDone = () => {

        const isValid = checkValid()

        console.log('is valid..?', isValid)


        if (isValid) {
            props.route.params.getCoordinates({
                pickupCords,
                destinationCords
            })
            showSuccess('Now showing direction')
            navigation.goBack();
        }

    }

    const fetchAddressCords = (lat, lng) => {
        setState({
            ...state, pickupCords: {
                latitude: lat,
                longitude: lng,
            }
        })
    }

    const fetchDestinationCords = (lat, lng) => {
        setState({
            ...state, destinationCords: {
                latitude: lat,
                longitude: lng,
            }
        })
    }

    // console.log('props==>>', props)


    // console.log('pickUp', pickupCords)
    // console.log('destination', destinationCords)


    return (
        <View style={styles.container}>

            <View
                keyboardShouldPersistTaps='handled'
                style={{ backgroundColor: 'white', flex: 1, padding: 24 }}>
                <AddressPickup
                    fetchAddress={fetchAddressCords}
                    placeholderText="Enter Pickup Location" />
                <View style={{ marginBottom: 16 }}></View>
                <AddressPickup
                    fetchAddress={fetchDestinationCords}
                    placeholderText="Enter Destination Location" />

                <CustomButton
                    btnText="Done"
                    btnStyle={{ marginTop: 25 }}
                    onPress={onDone}


                />
            </View>

        </View>
    );
};

export default Location;


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
