import {
  Card,
  CardBody,
  Image,
  Text,
  Heading,
  ImageProps,
  HStack,
  VStack,
  Badge,
} from "@chakra-ui/react";
import scCloud from "../assets/scatCloud.png";
import clearSky from "../assets/clearSky.jpg";
import lightRain from "../assets/lightRain.png";
import fewCloud from "../assets/fewClouds.avif";
import moderateRain from "../assets/moderateRain.png";
import overCast from "../assets/overcast.png";
import heavyRain from "../assets/heavyIntensityRain.png";

import { ListProps } from "../hooks/useData";

interface Props {
  listItem: ListProps;
}

function WeatherCard({ listItem }: Props) {
  const description = listItem.weather[0].description;
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

  function showTime(dt: number) {
    const time = new Date(dt * 1000);
    let when = time.getHours() > 12 ? "PM" : "AM";
    const finalTime = `${time.getHours()}:0${time.getMinutes()} ${when}`;
    return finalTime;
  }
  return (
    <Card borderRadius={25} maxW={"350px"} padding={3} overflow={"hidden"}>
      <HStack justifyContent={"space-between"}>
        <VStack alignItems={"left"} whiteSpace={"normal"} textAlign={"left"}>
          <Text fontWeight={"bold"} fontSize={20}>
            {showTime(listItem.dt)}
          </Text>
          <Heading
            color={
              description === "heavy intensity rain" ||
              description === "very heavy rain"
                ? "orange"
                : ""
            }
            fontSize={"15px"}
          >
            {description}
          </Heading>
        </VStack>
        <Image
          borderRadius={15}
          objectFit={"cover"}
          boxSize={"90px"}
          {...mapImage[description]}
        />
      </HStack>
      <CardBody>
        <HStack justifyContent={"space-between"}>
          <Text fontSize={15}>
            Temperature:
            <Badge
              width={8}
              textAlign={"center"}
              marginLeft={2}
              fontSize={15}
              colorScheme={
                parseInt(listItem.main.temp.toFixed(0)) > 28
                  ? "red"
                  : parseInt(listItem.main.temp.toFixed(0)) > 23
                  ? "orange"
                  : parseInt(listItem.main.temp.toFixed(0)) > 19
                  ? "green"
                  : "blue"
              }
            >
              {listItem.main.temp.toFixed(0)}
            </Badge>
          </Text>
          <Text fontSize={15}>
            Feels Like:
            <Badge
              width={8}
              textAlign={"center"}
              marginLeft={2}
              fontSize={15}
              colorScheme={
                parseInt(listItem.main.feels_like.toFixed(0)) > 28
                  ? "red"
                  : parseInt(listItem.main.feels_like.toFixed(0)) > 23
                  ? "orange"
                  : parseInt(listItem.main.feels_like.toFixed(0)) > 19
                  ? "green"
                  : "blue"
              }
            >
              {listItem.main.feels_like.toFixed(0)}
            </Badge>
          </Text>
        </HStack>
      </CardBody>
    </Card>
  );
}

export default WeatherCard;
