import { HStack, useColorMode, Switch, Text } from "@chakra-ui/react";
function SwitchModeColor() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <div>
      <HStack>
        <Switch
          onChange={toggleColorMode}
          colorScheme="blue"
          isChecked={colorMode === "dark"}
        />
        <Text marginTop={3} whiteSpace={"nowrap"}>
          Dark Mode
        </Text>
      </HStack>
    </div>
  );
}

export default SwitchModeColor;
