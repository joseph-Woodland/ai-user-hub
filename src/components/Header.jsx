import { Flex, Box, Heading, Spacer, Avatar, IconButton } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";

function Header() {
  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      px={8}
      py={4}
      shadow="sm"
      bg="white"
      position="sticky"
      top={0}
      zIndex={100}
      width="100%"
    >
      <Heading size="md" color="blue.600" letterSpacing="tight">
        AI User Hub
      </Heading>
      <Spacer />
      <Flex align="center" gap={4}>
        <Avatar name="Joseph Woodland" size="sm" />
        <IconButton
          aria-label="Logout"
          icon={<FiLogOut />}
          variant="ghost"
          colorScheme="blue"
        />
      </Flex>
    </Flex>
  );
}

export default Header;
