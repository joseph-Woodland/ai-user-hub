import { Box, Heading, Text, Button, VStack, useColorMode, Fade } from "@chakra-ui/react";
import { useState } from "react";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-b, blue.50, blue.100)"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <VStack spacing={6}>
        <Heading size="2xl" color="blue.600" letterSpacing="tight">
          AI User Hub
        </Heading>
        <Button colorScheme="blue" variant="outline" onClick={toggleColorMode}>
          Toggle {colorMode === "light" ? "Dark" : "Light"} Mode
        </Button>
        <Button colorScheme="teal" onClick={() => setShowWelcome((v) => !v)}>
          {showWelcome ? "Hide" : "Show"} Welcome
        </Button>
        <Fade in={showWelcome}>
          <Box p={6} rounded="xl" shadow="md" bg="whiteAlpha.900">
            <Text fontSize="xl" color="gray.700">
              Chakra UI is working! 🎉 <br />
              This is your stylish, modern AI User Hub.
            </Text>
          </Box>
        </Fade>
      </VStack>
    </Box>
  );
}

export default App;
