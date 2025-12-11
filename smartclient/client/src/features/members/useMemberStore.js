import { create } from "zustand";

export const useMemberStore = create((set) => ({
  members: [
    {
      _id: "m1",
      name: "Ammar Jamil",
      email: "ammar@example.com",
      role: "owner",
    },
    {
      _id: "m2",
      name: "ammar",
      email: "ammar@example.com",
      role: "member",
    },
  ],

  addMember: (member) =>
    set((state) => ({
      members: [...state.members, { ...member, _id: crypto.randomUUID() }],
    })),

  removeMember: (id) =>
    set((state) => ({
      members: state.members.filter((m) => m._id !== id),
    })),
}));
