import { useNavigation } from '@react-navigation/core';
import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import MapView, { Marker, AnimatedRegion, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAP_KEY } from '../../src/constants/googleMapKey';
import imagePath from '../constants/imagePath';

import Loader from '../components/Loader';
import { locationPermission, getCurrentLocation } from '../helper/helperFunction';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;



const Home = () => {
    const navigation = useNavigation();

    const [state, setState] = useState({
        curLoc: {
            latitude: 6.6640,
            longitude: 3.2821,
        },
        destinationCords: {},
        isLoading: false,
        coordinate: new AnimatedRegion({
            latitude: 6.6640,
            longitude: 3.2821,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        }),
        time: 0,
        distance: 0,

    });

    const mapReference = useRef();
    const markerRef = useRef()
    const { curLoc, time, distance, destinationCords, isLoading, coordinate } = state

    useEffect(() => {
        getLiveLocation()

    }, [])

    const getLiveLocation = async () => {

        const locPermissionDenied = await locationPermission()
        if (locPermissionDenied) {
            const { latitude, longitude } = await getCurrentLocation()
            console.log("get live location after 6 second")
            animate(latitude, longitude);
            setState({
                ...state,
                curLoc: { latitude, longitude },
                coordinate: new AnimatedRegion({
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                })

            })
        }

    }

    useEffect(() => {
        const interval = setInterval(() => {
            getLiveLocation()
        }, 6000);
        return () => clearInterval(interval)
    })


    const onPressLocation = () => {
        navigation.navigate('Location', { getCoordinates: fetchValues })
    }

    const fetchValues = (data) => {

        setState({
            ...state,

            // curLoc: {
            //     latitude: data.pickupCords.latitude,
            //     longitude: data.pickupCords.longitude,
            // },
            destinationCords: {
                latitude: data.destinationCords.latitude,
                longitude: data.destinationCords.longitude,
            }
        })
        // console.log('data====>', data)
    }

    const animate = (latitude, longitude) => {
        const newCoordinate = { latitude, longitude };
        if (Platform.OS == 'android') {
            if (markerRef.current) {
                markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
            }
        } else {
            coordinate.timing(newCoordinate).start();
        }
    }
    const onCenter = () => {
        mapReference.current.animateToRegion({
            latitude: curLoc.latitude,
            longitude: curLoc.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        })
    }


    return (
        <View style={{ flex: 1, }}>

            <View style={{ flex: 1, }}>

                <MapView
                    ref={mapReference}
                    provider={PROVIDER_GOOGLE}
                    style={StyleSheet.absoluteFill}
                    initialRegion={{
                        ...curLoc,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}>

                    <Marker.Animated
                        ref={markerRef}
                        coordinate={coordinate}
                        image={imagePath.isCurrentLocation}
                    />

                    {Object.keys(destinationCords).length > 0 && (<Marker
                        coordinate={destinationCords}
                        image={imagePath.isDestinationLocation}
                    />)}

                    {Object.keys(destinationCords).length > 0 && (<MapViewDirections
                        origin={curLoc}
                        destination={destinationCords}
                        apikey={GOOGLE_MAP_KEY}
                        strokeWidth={6}
                        strokeColor={'hotpink'}
                        optimizeWaypoints={true}
                        onStart={(params) => {
                            console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                        }}
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
                    />)}
                </MapView>
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0
                    }}
                    onPress={onCenter}
                >
                    <Image source={imagePath.isDestinationLocation} />
                </TouchableOpacity>

            </View>

            <View style={styles.bottomCard}>
                <Text>Where are you going..?</Text>

                <TouchableOpacity
                    onPress={onPressLocation}
                    style={styles.inputStyle}>
                    <Text>Choose your location</Text>
                </TouchableOpacity>
            </View>
            <Loader isLoading={isLoading} />

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
