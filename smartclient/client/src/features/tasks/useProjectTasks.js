export function useProjectTasks(projectId) {
  return {
    data: [
      {
        _id: "t1",
        title: "Design landing page",
        description: "Initial wireframes and Figma mockups",
        status: "in-progress",
      },
      {
        _id: "t2",
        title: "Set up backend API",
        description: "Initialize Express server and routes",
        status: "todo",
      },
      {
        _id: "t3",
        title: "Deploy preview environment",
        description: "Set up Vercel preview build",
        status: "done",
      },
    ],
    isLoading: false,
  };
}
