import { SimpleGrid, Box, Text, Icon, useColorModeValue } from "@chakra-ui/react";
import { FaClipboardList, FaFileAlt, FaSearch } from "react-icons/fa";

const ACTIONS = [
  {
    key: "applications",
    label: "See my Applications",
    description: "Track your job applications and status.",
    icon: FaClipboardList,
  },
  {
    key: "jobs",
    label: "Show New Jobs",
    description: "Browse new job matches for you.",
    icon: FaSearch,
  },
  {
    key: "cv",
    label: "Update my CV",
    description: "Improve your profile for better matches.",
    icon: FaFileAlt,
  },
];

function ActionCards({ onSelect }) {
  const cardBg = useColorModeValue("white", "gray.700");
  const hoverBg = useColorModeValue("blue.50", "gray.600");

  return (
    <SimpleGrid columns={[1, null, 3]} spacing={6} mb={8} px={4} maxW="900px" mx="auto">
      {ACTIONS.map((action) => (
        <Box
          key={action.key}
          bg={cardBg}
          _hover={{ bg: hoverBg, transform: "translateY(-4px)", shadow: "lg" }}
          shadow="md"
          rounded="2xl"
          p={6}
          textAlign="center"
          cursor="pointer"
          transition="all 0.2s"
          onClick={() => onSelect(action.key)}
        >
          <Icon as={action.icon} boxSize={8} color="blue.400" mb={2} />
          <Text fontWeight="bold" fontSize="lg" mb={1}>
            {action.label}
          </Text>
          <Text color="gray.500" fontSize="md">
            {action.description}
          </Text>
        </Box>
      ))}
    </SimpleGrid>
  );
}

export default ActionCards;
