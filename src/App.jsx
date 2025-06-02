import { useState } from "react";
import { Box } from "@chakra-ui/react";
import Header from "./components/Header";
import AIChatBox from "./components/AIChatBox";
import ActionCards from "./components/ActionCards";
import DynamicPane from "./components/DynamicPane";

function App() {
  const [activePanel, setActivePanel] = useState("");

  // From chat or card, show that panel
  const handleSelect = (value) => {
    if (["applications", "jobs", "cv"].includes(value.toLowerCase())) {
      setActivePanel(value.toLowerCase());
    }
    // Optionally: else show a toast or fallback!
  };

  return (
<Box minH="100vh" bg="gray.50">
  <Header />
  <Box pt={12} display="flex" flexDirection="column" alignItems="center">
    <Box w="100%" maxW="900px" px={4}>
      <AIChatBox onSelect={handleSelect} />
      <DynamicPane panel={activePanel} />
    </Box>
  </Box>
</Box>
  );
}

export default App;
