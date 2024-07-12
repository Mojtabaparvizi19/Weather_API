import useData from "../hooks/useData";
import { AppProps } from "../App";
import WeatherCard from "./WeatherCard";
import { SimpleGrid } from "@chakra-ui/react";

interface Props {
  queryProps: AppProps;
}

function WeatherGrid({ queryProps }: Props) {
  const { list } = useData(queryProps);

  return (
    <div className="mt-3">
      <SimpleGrid
        padding={5}
        borderRadius={15}
        bg={"rgb(153,204,255, 0.15)"}
        gap={5}
        columns={{
          base: 1,
          sm: 2,
          md: 2,
          lg: 3,
          "2xl": 5,
        }}
      >
        {list &&
          list
            .slice(1, list.length)
            .map((item) => (
              <WeatherCard key={list.indexOf(item)} listItem={item} />
            ))}
      </SimpleGrid>
    </div>
  );
}

export default WeatherGrid;
