import { SimpleGrid, Box, Text, Icon, useColorModeValue, Badge } from "@chakra-ui/react";
import { FaUserCircle, FaClipboardList, FaFileAlt, FaSearch } from "react-icons/fa";

function ActionCards({ onSelect, applicationUpdates = 2, newJobs = 3 }) {
  const cardBg = useColorModeValue("white", "gray.900");
  const hoverBg = useColorModeValue("blue.50", "gray.700");
  const accent = useColorModeValue("blue.500", "blue.300");
  const iconBg = useColorModeValue("blue.50", "blue.800");

  const ACTIONS = [
    {
      key: "applications",
      label: "See my Applications",
      description: "Track your job applications and status.",
      icon: FaClipboardList,
      badge: applicationUpdates,
    },
    {
     key: "search",
    label: "Job Search & Recommendations",
    description: "Pick up your search, view saved searches, and explore new job matches and recommendations.",
    icon: FaSearch,
    badge: newJobs,
    },
    {
    key: "profile",
    label: "Profile & Preferences",
    description: "Edit your details, manage your CV, and update email preferences.",
    icon: FaUserCircle,
    badge: 0,
    },
  ];

  return (
    <SimpleGrid columns={[1, null, 3]} spacing={6} mb={8} px={[2, 6]} maxW="900px" mx="auto">
      {ACTIONS.map((action) => (
        <Box
          key={action.key}
          bg={cardBg}
          _hover={{
            bg: hoverBg,
            boxShadow: "xl",
            borderColor: accent,
            transform: "translateY(-2px) scale(1.025)",
            transition: "all 0.18s cubic-bezier(.4,0,.2,1)",
          }}
          shadow="md"
          rounded="2xl"
          p={7}
          textAlign="left"
          cursor="pointer"
          border="2px solid"
          borderColor="transparent"
          transition="all 0.18s cubic-bezier(.4,0,.2,1)"
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          minH="180px"
          role="group"
          position="relative"
          onClick={() => onSelect(action.key)}
        >
          {/* Badge in top right if there are updates */}
          {action.badge > 0 && (
            <Badge
              position="absolute"
              top={4}
              right={4}
              colorScheme="blue"
              rounded="full"
              px={2.5}
              py={1}
              fontSize="xs"
              boxShadow="md"
              fontWeight="bold"
              letterSpacing="tight"
              zIndex={1}
            >
              {action.key === "jobs"
                ? `${action.badge} new`
                : `${action.badge} updates`}
            </Badge>
          )}
          {/* Icon with background circle */}
          <Box
            bg={iconBg}
            rounded="full"
            p={3}
            mb={4}
            display="flex"
            alignItems="center"
            justifyContent="center"
            transition="background 0.2s"
            _groupHover={{ bg: accent, color: "white" }}
          >
            <Icon as={action.icon} boxSize={7} color={accent} _groupHover={{ color: "white" }} />
          </Box>
          <Text fontWeight="bold" fontSize="lg" color={useColorModeValue("gray.800", "white")} mb={1}>
            {action.label}
          </Text>
          <Text color={useColorModeValue("gray.500", "gray.400")} fontSize="md">
            {action.description}
          </Text>
        </Box>
      ))}
    </SimpleGrid>
  );
}

export default ActionCards;
