import { useEffect, useState } from "react";
import { QueryProps } from "./Form";

interface Props {
  sendLocation: (data: QueryProps) => void;
}

function GeoLocation({ sendLocation }: Props) {
  const [data, setLocationData] = useState<QueryProps>({} as QueryProps);

  useEffect(() => {
    function currSucces(pos: GeolocationPosition) {
      const { coords } = pos;
      const { latitude, longitude } = coords;
      setLocationData({ lat: String(latitude), lon: String(longitude) });
      sendLocation(data);
    }
    function currError(err: GeolocationPositionError) {
      console.log(err);
      console.log(`Error: ${err.code} - ${err.message}`);
    }
    const option = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    window.navigator.geolocation.getCurrentPosition(
      currSucces,
      currError,
      option
    );
  }, [data.lat]);

  return <div></div>;
}

export default GeoLocation;
