import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, PermissionsAndroid, Platform, TouchableOpacity } from 'react-native';
import { HeaderCenterText } from '../Components/Headers';
import MapView, { Marker, ProviderPropType, Polyline, Callout, PROVIDER_GOOGLE, CalloutSubview } from 'react-native-maps';
import { Button } from 'react-native-elements';
import Geolocation from '@react-native-community/geolocation';

let id = 1;
let initialMarkers = [
  {
    coordinate: {
      latitude: 22.9994705,
      longitude: 72.6023938,
    },
    key: id,
    icon: 'pin_green'
  }
]

let coordinates = [

]

function HomeScreen(props) {
  // const appState = useRef(AppState.currentState);
  const [region, setRegion] = useState({
    latitude: 22.998872,
    longitude: 72.599701,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [markers, setMarkers] = useState(initialMarkers);
  const [staticMarker, setStaticMarker] = useState({
    latitude: 22.9994705,
    longitude: 72.6023938,
  });
  const [currentLocationMarker, setCurrentLocationMarker] = useState(undefined);

  const [coordinates, setCoordinates] = useState([]);

  const showLocationEnablePopUp = () => {
    Alert.alert('Permission', 'Cannot fetch location please check your GPS settings.')
  }

  const currentPosition = async () => {
    if ((Platform.OS === 'android' && Platform.Version >= 23)) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'App needs location access, so that we can provide a service of fetching your current location.',
            buttonPositive: 'OK'
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            position => {
              //{"mocked":false,"timestamp":1600432271000,"coords":{"speed":0,"heading":0,"altitude":-3.2525634765625,"accuracy":46.09600067138672,"longitude":72.59967811,"latitude":22.99870692}}
              const latitude = position?.coords?.latitude ?? null;
              const longitude = position?.coords?.longitude ?? null;
              const currentPosition = latitude &&
                longitude && {
                latitude,
                longitude,
              }
              setCurrentLocationMarker(currentPosition);
            },
            error => showLocationEnablePopUp(),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
          );
          // this.watchID = Geolocation.watchPosition(position => {
          //   const lastPosition = JSON.stringify(position);
          //   this.setState({lastPosition});
          // });

        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.log(err);
      }

    } else {
      Geolocation.getCurrentPosition(
        position => {
          const initialPosition = JSON.stringify(position);
          const latitude = position?.coords?.latitude ?? null;
          const longitude = position?.coords?.longitude ?? null;
          console.log(initialPosition);
          const currentPosition = latitude &&
            longitude && {
            latitude,
            longitude,
          }
          console.log(currentPosition)
          setCurrentLocationMarker(currentPosition);
        },
        error => showLocationEnablePopUp(),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
    }
  }

  const onDrag = (e) => {
    console.log(JSON.stringify(e));
  }

  useEffect(() => {
    currentPosition();
  }, []);

  useEffect(() => {
    if (staticMarker && currentLocationMarker) {
      setCoordinates([staticMarker, currentLocationMarker]);
    }
  }, [currentLocationMarker, staticMarker]);

  return (
    <View style={styles.container}>
      <HeaderCenterText />
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
        onRegionChange={setRegion}
        style={styles.map}
      >
        <Marker
          title={'0'}
          image={'pin_green'}
          key={0}
          coordinate={staticMarker}
          // onSelect={e => log('onSelect', e)}
          onDragEnd={e => setStaticMarker(e.nativeEvent.coordinate)}
          // onPress={e => log('onPress', e)}
          draggable
        />
        {currentLocationMarker && (
          <Marker
            title={'1'}
            image={'pin_orange'}
            key={1}
            coordinate={currentLocationMarker}
          />
        )
        }
        <Marker
          title='Point A'
          image={'pin_blue'}
          key={2}
          // calloutOffset={{ x: -8, y: 28 }}
          //   calloutAnchor={{ x: 0.5, y: 0.4 }}
          coordinate={{ latitude: 22.9927575, longitude: 72.5956249 }}
        />
        <Marker
          title='Point B'
          image={'pin_blue'}
          key={3}
          coordinate={{ latitude: 23.052898, longitude: 72.5310969 }}
        >
        </Marker>
        <Polyline
          coordinates={coordinates}
          strokeColor="#FF0000"
          strokeWidth={6}
        />
      </MapView>
      <Button
        containerStyle={styles.buttonView}
        title="Click Me"
        onPress={undefined}
      />
    </View>
  );
};

HomeScreen.propTypes = {
  // containerStyle: PropTypes.oneOfType([
  //   PropTypes.object,
  //   PropTypes.array
  // ]),
  // msgTextStyle: PropTypes.oneOfType([
  //   PropTypes.object,
  //   PropTypes.array
  // ]),
  // msgText: PropTypes.string,
};

HomeScreen.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  plainView: {
    width: 60,
  },
  buttonView: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'green'
  },
  text: {
    color: '#ffffff',
    fontSize: 16
  }
});

export default HomeScreen;
