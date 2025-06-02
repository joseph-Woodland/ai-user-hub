import { useState } from "react";
import { Box } from "@chakra-ui/react";
import Header from "./components/Header";
import AIChatBox from "./components/AIChatBox";
import DynamicPane from "./components/DynamicPane";
import HorizontalTimeline from "./components/HorizontalTimeline";

const jobTimelineEvents = [
  { type: "cv_update", text: "CV Updated", date: "2024-06-01", details: "Added recent role at FutureTech." },
  { type: "application", text: "Applied: Product Manager at Stepstone", date: "2024-06-02", status: "In Review" },
  { type: "job_alert", text: "3 new jobs matched your saved search.", date: "2024-06-04" },
  { type: "interview", text: "Interview Scheduled: Marketing Lead", date: "2024-06-05", details: "Zoom, 10:00AM" },
  { type: "feedback", text: "Feedback Received: Stepstone", date: "2024-06-06", details: "Shortlisted for next round." },
];

function App() {
  const [activePanel, setActivePanel] = useState(""); // or undefined

  // From chat or timeline or cards, show that panel
  const handleSelect = (value) => {
    // Make sure to match keys in DynamicPane/ActionCards!
    if (["applications", "search", "profile"].includes(value.toLowerCase())) {
      setActivePanel(value.toLowerCase());
    }
    // Optionally: else show a toast or fallback!
  };

  // Optional: handle timeline icon clicks, e.g. jump to section
  const handleTimelineClick = (type, event) => {
    // Map type to your panels as needed
    if (type === "cv_update" || type === "profile") setActivePanel("profile");
    else if (type === "application" || type === "interview" || type === "feedback") setActivePanel("applications");
    else if (type === "job_alert") setActivePanel("search");
  };

  return (
    <Box minH="100vh" bg="gray.50">
      <Header />
      <HorizontalTimeline events={jobTimelineEvents} onStepClick={handleTimelineClick} highlightedKeys={["cv_update", "job_alert"]} />
      <Box pt={12} display="flex" flexDirection="column" alignItems="center">
        <Box w="100%" maxW="900px" px={4}>
          <AIChatBox onSelect={handleSelect} />
          <DynamicPane panel={activePanel} onSelect={handleSelect} />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
