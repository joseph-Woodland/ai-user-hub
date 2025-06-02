import { Flex, Box, Heading, Spacer, Avatar, IconButton, Button } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";

function Header({ showCards, setShowCards, showTimeline, setShowTimeline }) {
  return (
    <Flex as="header" bg="white" py={4} px={8} align="center" shadow="sm">
      <Box fontWeight="bold" fontSize="2xl" color="blue.500">
        AI User Hub
      </Box>
      <Spacer />
      <Button
        size="sm"
        colorScheme={showCards ? "blue" : "gray"}
        variant={showCards ? "solid" : "outline"}
        mr={2}
        onClick={() => setShowCards(!showCards)}
      >
        {showCards ? "Hide Cards" : "Show Cards"}
      </Button>
      <Button
        size="sm"
        colorScheme={showTimeline ? "blue" : "gray"}
        variant={showTimeline ? "solid" : "outline"}
        onClick={() => setShowTimeline(!showTimeline)}
      >
        {showTimeline ? "Hide Timeline" : "Show Timeline"}
      </Button>
    </Flex>
  );
}

export default Header;
