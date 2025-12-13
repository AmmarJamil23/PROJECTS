export function useGlobalSearch(query) {
  if (!query) {
    return { results: [], isOpen: false };
  }

  const results = [
    { id: "p1", type: "Project", label: "Website Redesign" },
    { id: "t1", type: "Task", label: "Design landing page" },
    { id: "m1", type: "Member", label: "Ammar" },
  ].filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  return {
    results,
    isOpen: true,
  };
}
