import { create } from "zustand";

export const useTaskStore = create((set) => ({
  tasks: [
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

  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, { ...task, _id: crypto.randomUUID() }],
    })),

  updateTask: (id, updated) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t._id === id ? { ...t, ...updated } : t)),
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t._id !== id),
    })),
}));
