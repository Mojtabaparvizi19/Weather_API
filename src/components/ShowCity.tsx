import { Box } from "@chakra-ui/react";
import { style } from "../style/style";

interface Props {
  city: CityProp;
  sendInfo: (data: CityProp) => void;
  cityClicked: string | null;
}

export interface CityProp {
  name: string;
  lon: string;
  lat: string;
}

function ShowCity({ cityClicked, sendInfo, city }: Props) {
  return (
    <>
      <Box marginBottom={5} display={"grid"} placeContent={"center"}>
        <Box
          style={style}
          bg={city.name === cityClicked ? "rgb(192,192,192, 0.4)" : ""}
          onClick={() => {
            const coor = {
              name: city.name,
              lat: city.lat,
              lon: city.lon,
            };
            sendInfo(coor);
          }}
          fontWeight={"bold"}
        >
          {city.name}
        </Box>
      </Box>
    </>
  );
}

export default ShowCity;
