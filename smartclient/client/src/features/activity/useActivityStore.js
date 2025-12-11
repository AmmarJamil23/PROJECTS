import { create } from "zustand";

export const useActivityStore = create(() => ({
  activity: [
    {
      _id: "a1",
      user: "Ammar Jamil",
      action: "created a task",
      target: "Design landing page",
      time: "2 hours ago",
      type: "task-create",
    },
    {
      _id: "a2",
      user: "John Doe",
      action: "updated the task",
      target: "Set up backend API",
      time: "5 hours ago",
      type: "task-update",
    },
    {
      _id: "a3",
      user: "Ammar Jamil",
      action: "added the member",
      target: "John Doe",
      time: "1 day ago",
      type: "member-add",
    },
  ],
}));
