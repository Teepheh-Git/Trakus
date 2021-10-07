import { PermissionsAndroid, Platform } from "react-native";
import { showMessage, hideMessage } from "react-native-flash-message";
import GeoLocation from "react-native-geolocation-service";



export const getCurrentLocation = () =>
    new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
            position => {
                const cords = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };
                resolve(cords);
            },
            error => {
                reject(error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        )
    })

export const locationPermissions = () =>
    new Promise(async (resolve, reject) => {

        if (Platform.OS === 'ios') {
            try {
                const permissionsStatus = await GeoLocation.requestAuthorization('whenInUse');
                if (permissionsStatus === 'granted') {
                    return resolve('granted')
                }
                reject('Permission not granted')

            } catch (error) {

                return reject(error)
            }
        }
        return PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ).then((granted) => {
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                resolve("granted");
            }
            return reject('Location Permission denied');
        }).catch((error) => {
            console.log('Ask Location permission error: ', error);
            return reject(error);
        });


    })



const showError = (message) => {

    showMessage({
        message,
        type: 'danger',
        icon: 'danger'
    })

}
const showSuccess = (message) => {
    showMessage({
        message,
        type: 'success',
        icon: 'success'
    })

}


export {
    showError,
    showSuccess,
}