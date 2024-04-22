import * as Location from "expo-location";

export const getLocation = async ({ latitude, longitude }) => {
  let response = await Location.reverseGeocodeAsync({
    latitude,
    longitude,
  });

  let address = `${response[0].city}, ${response[0].name}`;
  return address;
};
