import React, { useState } from "react";
import {
  Box,
  Text,
  VStack,
  Badge,
  HStack,
  Button,
  Switch,
  Input,
} from "@chakra-ui/react";
import ActionCards from "./ActionCards"; // <-- Your existing ActionCards file
import EmptyPane from "./EmptyPane";


// ---- Demo data ----
const demoApplications = [
  { id: 1, title: "Customer Success Manager", status: "In Review", updated: "2h ago" },
  { id: 2, title: "Marketing Lead", status: "Interview Scheduled", updated: "1d ago" },
];

const demoSavedSearches = [
  { id: 1, name: "Product Manager, London", newJobs: 3, lastRun: "yesterday" },
  { id: 2, name: "Remote UX Designer", newJobs: 1, lastRun: "2 days ago" },
];

const demoRecommendedJobs = [
  { id: 1, title: "AI Product Owner", company: "FutureTech", new: true },
  { id: 2, title: "Full Stack Developer", company: "InnoSoft", new: false },
];

const demoProfile = {
  name: "Joseph Woodland",
  email: "joseph@email.com",
  cvUploaded: "2024-06-02",
  alerts: true,
  privacy: "Standard",
};

// ---- Applications Panel ----
function ApplicationsPanel({ applications }) {
  return (
    <Box bg="white" shadow="md" rounded="2xl" p={6} mt={4} maxW="900px" mx="auto">
      <Text fontWeight="bold" fontSize="xl" mb={4}>Your Applications</Text>
      <VStack align="stretch" spacing={3}>
        {applications.length === 0 && <Text color="gray.400">No applications yet.</Text>}
        {applications.map(app => (
          <Box key={app.id} p={4} bg="gray.50" rounded="lg" display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Text fontWeight="medium">{app.title}</Text>
              <Text color="gray.500" fontSize="sm">{app.updated}</Text>
            </Box>
            <Badge colorScheme={app.status === "Interview Scheduled" ? "green" : "blue"}>
              {app.status}
            </Badge>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}

// ---- Search & Recommendations Panel ----
function SearchPanel({ savedSearches, recommendedJobs }) {
  return (
    <Box bg="white" shadow="md" rounded="2xl" p={6} mt={4} w="full">
      <Text fontWeight="bold" fontSize="xl" mb={4}>Your Searches & Recommendations</Text>
      <Text fontWeight="semibold" mb={2}>Saved Searches</Text>
      <VStack align="stretch" spacing={2} mb={4}>
        {savedSearches.map(search => (
          <Box key={search.id} p={3} bg="gray.50" rounded="md" display="flex" justifyContent="space-between" alignItems="center">
            <Text>{search.name}</Text>
            <HStack>
              <Badge colorScheme="blue">{search.newJobs} new</Badge>
              <Text color="gray.400" fontSize="sm">Last run: {search.lastRun}</Text>
            </HStack>
          </Box>
        ))}
      </VStack>
      <Text fontWeight="semibold" mb={2}>Recommended Jobs</Text>
      <VStack align="stretch" spacing={2}>
        {recommendedJobs.map(job => (
          <Box key={job.id} p={3} bg="gray.50" rounded="md" display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Text fontWeight="medium">{job.title} <Text as="span" color="gray.500" fontSize="sm">({job.company})</Text></Text>
            </Box>
            <HStack>
              {job.new && <Badge colorScheme="green">New</Badge>}
              <Button size="sm" colorScheme="blue" variant="ghost">View</Button>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}

// ---- Profile & Preferences Panel ----
function ProfilePanel({ profile }) {
  return (
    <Box bg="white" shadow="md" rounded="2xl" p={6} mt={4} maxW="900px" mx="auto">
      <Text fontWeight="bold" fontSize="xl" mb={4}>Profile & Preferences</Text>
      <HStack justify="space-between" mb={3}>
        <Text>Name</Text>
        <Input value={profile.name} readOnly width="60%" />
      </HStack>
      <HStack justify="space-between" mb={3}>
        <Text>Email</Text>
        <Input value={profile.email} readOnly width="60%" />
      </HStack>
      <HStack justify="space-between" mb={3}>
        <Text>Email Alerts</Text>
        <Switch isChecked={profile.alerts} />
      </HStack>
      <HStack justify="space-between" mb={3}>
        <Text>CV Uploaded</Text>
        <Button size="sm" colorScheme="blue" variant="outline">Update CV</Button>
        <Text fontSize="sm" color="gray.400">{profile.cvUploaded}</Text>
      </HStack>
      <HStack justify="space-between" mb={3}>
        <Text>Privacy</Text>
        <Text>{profile.privacy}</Text>
      </HStack>
    </Box>
  );
}

// ---- Main Dynamic Pane Component ----

function DynamicPane({ panel, onSelect, showCards }) {
  const activeSection = panel; // panel could be "" or undefined for empty

  return (
    <>
      {showCards && (
        <ActionCards
          onSelect={onSelect}
          applicationUpdates={demoApplications.length}
          newJobs={demoSavedSearches.reduce((sum, s) => sum + s.newJobs, 0)}
        />
      )}
      {!activeSection && <EmptyPane />}
      {activeSection === "applications" && (
        <ApplicationsPanel applications={demoApplications} />
      )}
      {activeSection === "search" && (
        <SearchPanel
          savedSearches={demoSavedSearches}
          recommendedJobs={demoRecommendedJobs}
        />
      )}
      {activeSection === "profile" && (
        <ProfilePanel profile={demoProfile} />
      )}
    </>
  );
}

export default DynamicPane;
