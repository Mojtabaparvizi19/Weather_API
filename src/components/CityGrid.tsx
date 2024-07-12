import ShowCity from "./ShowCity";
import { CityProp } from "./ShowCity";
import { Heading } from "@chakra-ui/react";

interface ListProps {
  list: CityProp[];
  sendInfo: (data: CityProp) => void;
  cityCliciked: string | null;
}

function CityGrid({ cityCliciked, sendInfo, list }: ListProps) {
  return (
    <div>
      <Heading textAlign={"center"} paddingBottom={5} fontSize={25}></Heading>
      {list.map((item) => (
        <ShowCity
          cityClicked={cityCliciked}
          key={item.name}
          sendInfo={sendInfo}
          city={item}
        />
      ))}
    </div>
  );
}

export default CityGrid;
