import { Box, Heading, Text, Fade } from "@chakra-ui/react";

function DynamicPane({ panel }) {
  let content = null;
  if (panel === "applications") {
    content = (
      <Box>
        <Heading size="md" mb={2}>Your Applications</Heading>
        <Text>Here’s a list of your recent job applications (fake data for now).</Text>
      </Box>
    );
  } else if (panel === "jobs") {
    content = (
      <Box>
        <Heading size="md" mb={2}>New Jobs for You</Heading>
        <Text>Here are some new jobs matching your interests (fake data for now).</Text>
      </Box>
    );
  } else if (panel === "cv") {
    content = (
      <Box>
        <Heading size="md" mb={2}>Update Your CV</Heading>
        <Text>Make changes to your CV or profile here (fake form coming soon).</Text>
      </Box>
    );
  }
  return (
    <Fade in={!!panel}>
      <Box mt={6} p={8} bg="white" rounded="2xl" shadow="md" minH="200px" maxW="900px" mx="auto">
        {content || (
          <Text color="gray.400" textAlign="center">
            Select an action above to get started!
          </Text>
        )}
      </Box>
    </Fade>
  );
}

export default DynamicPane;
