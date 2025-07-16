// Map.js
// Map.js
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../request/mapstyle.css";

import axios from "axios";

let GEOCODE_API_KEY = "6664adaa189fa661001092swu6a36ee";

const Map = ({
  showMap,
  setFormData,
  formData,
  selectedLocation,
  setSelectedLocation,
  setDefalutAdd,
  defaultAdd,
}) => {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [geocodedAdd, setGeoCodeAdd] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    const handledefaultCoord = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            // const {lat,lng}={ latitude, longitude}
            let lat = latitude;
            let lng = longitude;
            setCurrentLocation({ lat, lng });
            setSelectedLocation({ lat, lng });
            let x = await getAddress(lat, lng);
            let location = `${latitude},${longitude}`;
            setFormData({ ...formData, address: x, location: location });
            setDefalutAdd({ location: { lat, lng }, address: x });
          },
          (error) => {
            console.error("Error getting location:", error);
            toast.error("Error getting location ${error}");
          }
        );
      } else {
        console.error("Geolocation is not supported in this browser.");
        toast.error("Geolocation is not supported in this browser");
      }
    };
    handledefaultCoord();
  }, []);

  async function getAddress(latitude, longitude) {
    const uri = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=${GEOCODE_API_KEY}`;

    try {
      const response = await axios.get(uri);
      const { display_name } = response.data;
      return display_name;
      // let address = [
      //   street,
      //   adminArea6,
      //   adminArea5,
      //   adminArea4,
      //   adminArea3,
      //   adminArea2,
      //   adminArea1,
      // ]
      //   .filter(
      //     (x) =>
      //       x !== undefined &&
      //       x !== null &&
      //       typeof x === "string" &&
      //       x.length > 0
      //   )
      //   .filter((item, index, arr) => arr.indexOf(item) === index)
      //   .join(", ");
      // address += `, PIN - ${postalCode}`;
      // return address;
    } catch (e) {
      console.error(e);
    }
  }

  const handleMapClick = async (event) => {
    const { lat, lng } = event.latlng;

    let x = await getAddress(lat, lng);
    setFormData({ ...formData, address: x, location: `${lat},${lng}` });
    // setAddressValue(await getAddress(lat,lng))
    setSelectedLocation({ lat, lng });
    // onLocationSelected({ lat, lng });
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: handleMapClick,
    });

    return null;
  };

  return (
    <div style={{ position: "relative" }}>
      {currentLocation && (
        <MapContainer
          center={[currentLocation.lat, currentLocation.lng]}
          zoom={7}
          style={{
            width: "850px",
            height: "600px",
            boxShadow: "5px 0px 5px 0px rgba(255, 255, 255, 0.4)",
          }}
        >
          <MapClickHandler />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {selectedLocation && (
            <Marker position={[selectedLocation.lat, selectedLocation.lng]}>
              <Popup>
                <div>
                  <h6>{formData.address}</h6>
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      )}
    </div>
  );
};

export default Map;
