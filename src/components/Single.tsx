import useData from "../hooks/useData";
import { Text, Heading, Image, Box, HStack } from "@chakra-ui/react";
import { ImageProps } from "@chakra-ui/react";
import { AppProps } from "../App";
import scCloud from "../assets/scatCloud.png";
import clearSky from "../assets/clearSky.jpg";
import lightRain from "../assets/lightRain.png";
import fewCloud from "../assets/fewClouds.avif";
import moderateRain from "../assets/moderateRain.png";
import overCast from "../assets/overcast.png";
import heavyRain from "../assets/heavyIntensityRain.png";

interface Props {
  queryProps: AppProps;
}

function Single({ queryProps }: Props) {
  function showTime(dt: number) {
    const time = new Date(dt * 1000);
    let when = time.getHours() > 12 ? "PM" : "AM";
    const finalTime = `${time.getHours()}:0${time.getMinutes()} ${when}`;
    return finalTime;
  }

  const { list, data } = useData(queryProps);
  const mapImage: { [key: string]: ImageProps } = {
    "broken clouds": { src: scCloud },
    "scattered clouds": { src: scCloud },
    "light rain": { src: lightRain },
    "clear sky": { src: clearSky },
    "few clouds": { src: fewCloud },
    "moderate rain": { src: moderateRain },
    "overcast clouds": { src: overCast },
    "heavy intensity rain": { src: heavyRain },
    "very heavy rain": { src: heavyRain },
  };

  return (
    <Box padding={5}>
      {list && (
        <>
          <HStack justifyContent={"space-between"}>
            <Text fontWeight={"bold"} fontSize={40}>
              {list[0].main.temp.toFixed(0)}℃
            </Text>
            <Image
              borderRadius={25}
              boxSize={"150px"}
              {...mapImage[list[0].weather[0].description]}
            />
          </HStack>
          <Text fontSize={15}>NOW</Text>
          <Box opacity={"0.4"}>
            <hr />
          </Box>

          <Text fontSize={15}>{list[0].weather[0].description}</Text>
          {data && <Heading>{data.city?.name}</Heading>}
        </>
      )}
    </Box>
  );
}

export default Single;
