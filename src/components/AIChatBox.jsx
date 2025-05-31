import { Box, VStack, Input, Button, Text, HStack, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";

const SUGGESTIONS = [
  "See my applications",
  "Update my CV",
  "Show me new jobs",
];

function AIChatBox({ onSelect }) {
  const [input, setInput] = useState("");
  const bg = useColorModeValue("white", "gray.700");

  const handleSuggestion = (text) => {
    setInput("");
    onSelect(text.toLowerCase().includes("application") ? "applications"
      : text.toLowerCase().includes("cv") ? "cv"
      : text.toLowerCase().includes("job") ? "jobs"
      : text
    );
  };

  const handleSend = () => {
    if (input.trim()) {
      onSelect(
        input.toLowerCase().includes("application") ? "applications"
        : input.toLowerCase().includes("cv") ? "cv"
        : input.toLowerCase().includes("job") ? "jobs"
        : input
      );
      setInput("");
    }
  };

  return (
    <Box
      bg={bg}
      shadow="md"
      p={8}
      rounded="2xl"
      maxW="lg"
      width="100%"
      mb={8}
      textAlign="center"
      mx="auto"
    >
      <VStack spacing={4}>
        <Text fontSize="xl" fontWeight="bold" color="blue.700">
          Welcome back, Joseph!
        </Text>
        <Text color="gray.500">What would you like to do today?</Text>
        <HStack spacing={2}>
          {SUGGESTIONS.map((s) => (
            <Button
              key={s}
              colorScheme="blue"
              size="sm"
              variant="outline"
              onClick={() => handleSuggestion(s)}
            >
              {s}
            </Button>
          ))}
        </HStack>
        <HStack w="100%" pt={2}>
          <Input
            placeholder="Type your request..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            bg={useColorModeValue("gray.100", "gray.800")}
          />
          <Button colorScheme="blue" onClick={handleSend}>
            Send
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}

export default AIChatBox;
