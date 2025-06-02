import { Box, Input, Button, HStack, useColorModeValue, Flex } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import AiRing from "./AiRing";

// Example prompts with inline CTA text and a CTA "key"
const PROMPTS = [
  {
    text: "You’ve received new feedback on one of your applications. Reviewing feedback helps you improve your next steps. ",
    cta: "Let’s have a look",
    action: "feedback"
  },
  {
    text: "Congrats on submitting your first application, Joseph! Keeping track of your applications is the best way to stay on top of opportunities. ",
    cta: "View your application status",
    action: "applications"
  },
  {
    text: "Nice work—10 applications sent! Reviewing where you stand can help you plan your next moves or follow up. ",
    cta: "See your recent applications",
    action: "applications"
  },
  {
    text: "Welcome back, Joseph—we’ve missed you! There are updates and new jobs waiting for you since your last visit. ",
    cta: "Catch up on what’s new",
    action: "jobs"
  },
  {
    text: "We noticed your CV could use a quick update. Adding a bit more detail can help you match with more roles. ",
    cta: "Improve your CV now",
    action: "cv"
  },
  {
    text: "Looks like your search is pretty specific. Widening your filters could uncover more great roles. ",
    cta: "Broaden your job search",
    action: "search"
  },
  {
    text: "Not much activity lately, Joseph. Want to discover new jobs or update your preferences? ",
    cta: "Explore new opportunities",
    action: "jobs"
  }
];
function ChatInput({ value, onChange, onSend }) {
  const [isFocused, setIsFocused] = useState(false);
  const inputBg = useColorModeValue("gray.50", "gray.800");
  const focusRing = useColorModeValue("0 0 0 2px #4299e1", "0 0 0 2px #63b3ed");

  return (
    <Box
      position="relative"
      w="100%"
      mt={2}
    >
      <Input
        value={value}
        onChange={onChange}
        onKeyDown={e => {
          if (e.key === "Enter" && value.trim()) {
            onSend(value);
          }
        }}
        placeholder="Ask me anything about your search…"
        bg={inputBg}
        border="none"
        borderRadius="full"
        px={5}
        py={3}
        fontSize="md"
        boxShadow={isFocused ? focusRing : "none"}
        transition="box-shadow 0.2s"
        _focusVisible={{
          boxShadow: focusRing,
          outline: "none",
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        pr="2.5em"
      />
      {/* Animated listening dot */}
      {value && (
        <Box
          position="absolute"
          right={5}
          top="50%"
          transform="translateY(-50%)"
          fontSize="lg"
          color="blue.400"
          opacity={0.7}
          pointerEvents="none"
        >
          <span className="dot-typing">...</span>
        </Box>
      )}
      <style>
        {`
          .dot-typing::after {
            content: '';
            display: inline-block;
            width: 1.2em;
            height: 1.2em;
            border-radius: 50%;
            background: currentColor;
            opacity: 0.4;
            animation: dot-pulse 1s infinite linear alternate;
            margin-left: 0.3em;
          }
          @keyframes dot-pulse {
            0% { opacity: 0.2; transform: scale(0.9);}
            100% { opacity: 1; transform: scale(1.2);}
          }
        `}
      </style>
    </Box>
  );
}

function AIChatBox({ onSelect }) {
  const [input, setInput] = useState("");
  const [displayed, setDisplayed] = useState(""); // just a string, not array!
  const [isTyping, setIsTyping] = useState(true);
  const [promptIdx, setPromptIdx] = useState(0);

  const prompt = PROMPTS[promptIdx];
  const fullMsg = prompt.text + prompt.cta;
  const ctaStart = fullMsg.indexOf(prompt.cta);

  // Robust typing effect (no ghosts, no doubles)
  useEffect(() => {
    setDisplayed("");
    setIsTyping(true);
    let idx = 0;
    let active = true;
    function typeNext() {
      if (!active) return;
      setDisplayed(fullMsg.slice(0, idx + 1));
      idx++;
      if (idx < fullMsg.length) {
        const delay = 22 + Math.random() * 28;
        setTimeout(typeNext, delay);
      } else {
        setIsTyping(false);
      }
    }
    typeNext();
    return () => { active = false; };
    // eslint-disable-next-line
  }, [promptIdx, fullMsg]);

  const handleSend = () => {
    if (input.trim()) {
      onSelect(input.trim().toLowerCase());
      setInput("");
    }
  };

  const handleCtaClick = () => {
    onSelect(prompt.action);
  };

  // For demo: click AI ring to cycle prompts
  const cyclePrompt = () => {
    if (!isTyping) {
      setPromptIdx((prev) => (prev + 1) % PROMPTS.length);
    }
  };

  const chatBg = useColorModeValue("white", "gray.100");
  const aiTextColor = useColorModeValue("blue.700", "blue.200");
  const ctaBg = useColorModeValue("blue.50", "blue.700");
  const ctaColor = useColorModeValue("blue.600", "white");

  // For styling the CTA
  const ctaWritten = displayed.slice(ctaStart);
  const beforeCta = displayed.slice(0, ctaStart);

  return (
    <Flex
      bg={chatBg}
      shadow="md"
      rounded="2xl"
      maxW="lg"
      width="100%"
      mb={8}
      px={6}
      py={4}
      mx="auto"
      minH="76px"
      position="relative"
    >
      {/* AI Ring fixed in top left */}
      <Box
        position="absolute"
        top={4}
        left={4}
        zIndex={2}
        onClick={cyclePrompt}
        style={{ cursor: "pointer" }}
      >
        <AiRing style={{ height: 20, width: 20 }} />
      </Box>
      <Box  pl="30px" minH="40px" display="flex" flexDirection="column" justifyContent="center">
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            flexWrap: "wrap",
            fontSize: "1rem",
            color: aiTextColor,
            minHeight: "28px",
            marginBottom: "0.25rem",
            lineHeight: 1.45
          }}
        >
          <span>{beforeCta}</span>
          {ctaWritten.length > 0 && (
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCtaClick}
              bg={ctaBg}
              color={ctaColor}
              _hover={{ bg: ctaBg, opacity: 0.85 }}
              px={3}
              py={1}
              ml={1}
              mb="2px"
              borderRadius="md"
              h="auto"
              fontWeight="normal"
              fontSize="md"
              style={{ lineHeight: "1.2", transition: "background 0.2s" }}
              isDisabled={isTyping || ctaWritten.length < prompt.cta.length}
              tabIndex={isTyping ? -1 : 0}
            >
              <span>
                {ctaWritten}
                {isTyping && <span style={{ opacity: 0.6, marginLeft: 2 }}>|</span>}
              </span>
            </Button>
          )}
          {isTyping && displayed.length < ctaStart &&
            <span style={{
              opacity: 0.6, marginLeft: 2,
              animation: "blink 1s steps(2, start) infinite"
            }}>|</span>
          }
        </span>
<ChatInput
  value={input}
  onChange={e => setInput(e.target.value)}
  onSend={val => {
    onSelect(val.trim().toLowerCase());
    setInput("");
  }}
/>
      </Box>
    </Flex>
  );
}

export default AIChatBox;
