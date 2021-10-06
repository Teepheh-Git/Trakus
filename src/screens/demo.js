import React, { useRef, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAP_KEY } from './src/constants/googleMapKey';

const App = () => {
    const [state, setState] = useState({
        pickupCords: {
            latitude: 6.6640,
            longitude: 3.2821,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        droplocationCords: {
            latitude: 6.6018,
            longitude: 3.3515,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
    });

    const mapReference = useRef();

    const { pickupCords, droplocationCords } = state;

    return (
        <SafeAreaView style={styles.container}>
            <MapView
                ref={mapReference}
                // provider={PROVIDER_GOOGLE}
                style={StyleSheet.absoluteFill}
                initialRegion={pickupCords}>

                <Marker coordinate={pickupCords} />
                <Marker coordinate={droplocationCords} />

                <MapViewDirections
                    origin={pickupCords}
                    destination={droplocationCords}
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
                />
            </MapView>
        </SafeAreaView>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default App;
