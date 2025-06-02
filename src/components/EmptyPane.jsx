import { Box, Text } from "@chakra-ui/react";

function EmptyPane() {
  return (
    <Box
      bg="white"
      shadow="md"
      rounded="2xl"
      p={12}
      mt={4}
      w="full"
      minH="140px"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Text fontSize="lg" color="gray.400" fontWeight="medium">
        Select an action to get started.
      </Text>
    </Box>
  );
}

export default EmptyPane;
