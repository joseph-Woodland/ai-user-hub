import React from "react";
import { Box, Flex, Icon, Tooltip, Text } from "@chakra-ui/react";
import { FaFileAlt, FaClipboardList, FaBell, FaCalendarCheck, FaCommentDots, FaCheckCircle } from "react-icons/fa";

// Map event types to icons
const iconMap = {
  cv_update: FaFileAlt,
  application: FaClipboardList,
  job_alert: FaBell,
  interview: FaCalendarCheck,
  feedback: FaCommentDots,
  hired: FaCheckCircle,
};

// For simplicity, treat the last step as "hired"
const HIRED_EVENT = { type: "hired", text: "Hired!", date: "", final: true };

function HorizontalTimeline({ events, onStepClick, highlightedKeys = [] }) {
  // Ensure "hired" is always the final step (not clickable/highlighted)
  const timeline = [...events, HIRED_EVENT];

  return (
    <Box w="100vw" maxW="100vw" px={0} py={2} bg="transparent" overflowX="auto">
      <Flex
        align="center"
        justify="center"
        gap={0}
        minW={timeline.length * 80 + "px"}
        width="100%"
      >
        {timeline.map((event, idx) => {
          const isFinal = event.final;
          const isHighlighted = highlightedKeys.includes(event.type) || !!event.highlighted;
          const clickable = !isFinal && !!onStepClick;

          return (
            <Flex align="center" key={idx}>
              <Tooltip
                label={
                  <Box>
                    <Text fontWeight="bold">{event.text}</Text>
                    {event.date && (
                      <Text fontSize="xs" color="gray.400">
                        {event.date}
                      </Text>
                    )}
                    {event.details && (
                      <Text fontSize="xs">{event.details}</Text>
                    )}
                    {event.status && (
                      <Text fontSize="xs" color="blue.400">
                        {event.status}
                      </Text>
                    )}
                  </Box>
                }
                hasArrow
                placement="bottom"
                openDelay={200}
              >
                <Box
                  as={clickable ? "button" : "div"}
                  bg={isFinal ? "gray.200" : isHighlighted ? "blue.400" : "blue.50"}
                  borderRadius="full"
                  p={2}
                  border="2px solid"
                  borderColor={isFinal ? "gray.300" : isHighlighted ? "blue.500" : "blue.100"}
                  boxShadow={isHighlighted ? "md" : "none"}
                  transition="all 0.18s"
                  mx={1}
                  minWidth="36px"
                  minHeight="36px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  cursor={clickable ? "pointer" : "default"}
                  opacity={isFinal ? 0.5 : 1}
                  _hover={
                    clickable
                      ? { bg: "blue.300", borderColor: "blue.600" }
                      : undefined
                  }
                  onClick={
                    clickable ? () => onStepClick(event.type, event) : undefined
                  }
                  aria-label={event.text}
                >
                  <Icon
                    as={iconMap[event.type]}
                    color={isFinal ? "gray.500" : isHighlighted ? "white" : "blue.400"}
                    boxSize={5}
                  />
                </Box>
              </Tooltip>
              {idx < timeline.length - 1 && (
                <Box
                  height="2px"
                  width="32px"
                  bg={isFinal ? "gray.200" : isHighlighted ? "blue.300" : "blue.100"}
                  borderRadius="full"
                  mx={1}
                />
              )}
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
}

export default HorizontalTimeline;
