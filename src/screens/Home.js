import { useNavigation } from '@react-navigation/core';
import React, { useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAP_KEY } from '../../src/constants/googleMapKey';
import imagePath from '../constants/imagePath';



const Home = () => {
    const navigation = useNavigation();

    const [state, setState] = useState({
        startingCords: {
            latitude: 6.6640,
            longitude: 3.2821,
        },
        destinationCords: {
            // latitude: 6.6018,
            // longitude: 3.3515,
        },
    });

    const mapReference = useRef();

    const { startingCords, destinationCords } = state;

    const onPressLocation = () => {
        navigation.navigate('Location', { getCoordinates: fetchValues })
    }

    const fetchValues = (data) => {

        setState({

            startingCords: {
                latitude: data.pickupCords.latitude,
                longitude: data.pickupCords.longitude,
            },

            destinationCords: {
                latitude: data.destinationCords.latitude,
                longitude: data.destinationCords.longitude,
            }

        })



        // console.log('data====>', data)
    }


    return (
        <View style={{ flex: 1, }}>

            <View style={{ flex: 1, }}>

                <MapView
                    ref={mapReference}
                    provider={PROVIDER_GOOGLE}
                    style={StyleSheet.absoluteFill}
                    initialRegion={startingCords}>

                    <Marker coordinate={startingCords}
                        image={imagePath.isCurrentLocation}
                    />
                    <Marker coordinate={destinationCords}
                        image={imagePath.isDestinationLocation} />

                    <MapViewDirections
                        origin={startingCords}
                        destination={destinationCords}
                        apikey={GOOGLE_MAP_KEY}
                        strokeWidth={5}
                        strokeColor={'hotpink'}
                        optimizeWaypoints={true}
                        onReady={result => {
                            mapReference.current.fitToCoordinates(
                                result.coordinates, {
                                edgePadding: {
                                    right: 30,
                                    bottom: 300,
                                    left: 30,
                                    top: 100,
                                },
                            },
                            );
                        }}
                        onError={e => {
                            console.log('An error occurred')
                        }}
                    />
                </MapView>

            </View>

            <View style={styles.bottomCard}>
                <Text>Where are you going..?</Text>

                <TouchableOpacity
                    onPress={onPressLocation}
                    style={styles.inputStyle}>
                    <Text>Choose your location</Text>
                </TouchableOpacity>
            </View>

        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    bottomCard: {
        backgroundColor: '#C2D0D3',
        padding: 30,
        width: '100%',
        borderTopEndRadius: 24,
        borderTopStartRadius: 24
    },
    inputStyle: {
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        alignItems: 'center',
        height: 48,
        justifyContent: 'center',
        marginTop: 16
    }
});

export default Home;
