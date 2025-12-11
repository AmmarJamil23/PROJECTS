import { create } from "zustand";

export const useFileStore = create((set) => ({
  files: [
    {
      _id: "f1",
      name: "requirements.pdf",
      size: "220 KB",
      uploadedBy: "Ammar Jamil",
      time: "3 hours ago",
    },
    {
      _id: "f2",
      name: "wireframe.png",
      size: "1.3 MB",
      uploadedBy: "John Doe",
      time: "1 day ago",
    },
  ],

  addFile: (file) =>
    set((state) => ({
      files: [...state.files, { ...file, _id: crypto.randomUUID() }],
    })),

  deleteFile: (id) =>
    set((state) => ({
      files: state.files.filter((f) => f._id !== id),
    })),
}));
