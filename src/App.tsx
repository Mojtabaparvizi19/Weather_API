import {
  Grid,
  GridItem,
  SimpleGrid,
  HStack,
  Image,
  Show,
  Heading,
  Box,
} from "@chakra-ui/react";
import Form, { QueryProps } from "./components/Form";
import WeatherGrid from "./components/WeatherGrid";
import SwitchModeColor from "./components/SwitchModeColor";
import canada from "./assets/nature.png";
import { cities } from "./data/cities";
import { useState } from "react";
import CityGrid from "./components/CityGrid";
import GeoLocation from "./components/GeoLocation";
import Single from "./components/Single";

export interface AppProps {
  data: QueryProps;
}

function App() {
  const [queryData, setQueryData] = useState<AppProps>({} as AppProps);
  return (
    <>
      <Grid
        templateAreas={{
          base: `"nav1" "weather"`,
          md: `"nav1 nav1" "side weather"`,
        }}
        templateColumns={{
          base: "1fr",
          md: "100px 1fr",
        }}
      >
        <GridItem padding={10} area={"nav1"}>
          <HStack justifyContent={"space-between"}>
            <HStack justifyContent={"space-between"}>
              <Image boxSize="60px" src={canada} />
              <Heading as={"h3"}>Weather</Heading>
            </HStack>

            <SwitchModeColor />
          </HStack>
        </GridItem>

        <Show above="md">
          <GridItem
            height={"fit-content"}
            borderRadius={15}
            bg={"rgb(153,204,255, 0.09)"}
            marginTop={"10px"}
            marginLeft={4}
            area={"side"}
          >
            <CityGrid
              cityCliciked={queryData.data?.name}
              sendInfo={(data) => setQueryData({ ...queryData, data })}
              list={cities}
            />
          </GridItem>
        </Show>
        <GridItem maxWidth={"1300px"} margin={3} area={"weather"}>
          <GeoLocation
            sendLocation={(data) => {
              setQueryData({ ...queryData, data });
            }}
          />
          <SimpleGrid
            bg={"rgb(153,204,255, 0.15)"}
            padding={5}
            borderRadius={15}
            columns={{
              base: 1,
              sm: 2,
              md: 2,
              lg: 2,
            }}
          >
            <Form
              dataSubmit={(data) => {
                setQueryData({ ...queryData, data });
              }}
            />
            <Box borderRadius={15} maxWidth={"300px"}>
              <Single queryProps={queryData} />
            </Box>
          </SimpleGrid>

          <WeatherGrid queryProps={queryData} />
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
