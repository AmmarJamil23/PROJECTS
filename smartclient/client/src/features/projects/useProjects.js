import React from "react";

export function useProjects() {
  // Dummy data for UI only
  return {
    data: [
      {
        _id: "1",
        name: "Website Redesign",
        description: "Updating the old company site with a modern UI"
      },
      {
        _id: "2",
        name: "Mobile App Development",
        description: "Building new React Native application for clients"
      },
      {
        _id: "3",
        name: "Marketing Campaign",
        description: "SEO, ads, brand positioning, content planning"
      },
    ],
    isLoading: false
  };
}

