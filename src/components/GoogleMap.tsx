"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

interface GoogleMapProps {
  address: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ address }) => {
  const mapRef = useRef(null);
  // const [geocoder, setGeocoder] = useState(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || "",
      version: "weekly",
    });

    loader.load().then(() => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK" && results) {
          const map = new google.maps.Map(mapRef.current!, {
            center: results[0].geometry.location,
            zoom: 15,
            disableDefaultUI: true,
            fullscreenControl: true,
          });

          new google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
          });
        } else {
          console.error(`Geocode was not successful for the following reason: ${status}`);
        }
      });
    });
  }, [address]);
  return <div style={{ height: "250px" }} className="rounded-xl" ref={mapRef} />;
};

export default GoogleMap;
