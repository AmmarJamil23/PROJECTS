import { create } from "zustand";

export const useNotificationStore = create((set) => ({
  notifications: [
    {
      _id: "n1",
      text: "Task 'Design landing page' was updated",
      read: false,
      time: "5 min ago",
    },
    {
      _id: "n2",
      text: "Ammar joined the project",
      read: false,
      time: "1 hour ago",
    },
    {
      _id: "n3",
      text: "New file uploaded: wireframe.png",
      read: true,
      time: "Yesterday",
    },
  ],

  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n._id === id ? { ...n, read: true } : n
      ),
    })),

  markAllRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({
        ...n,
        read: true,
      })),
    })),
}));
