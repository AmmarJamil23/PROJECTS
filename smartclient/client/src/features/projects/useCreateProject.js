import { toast } from "sonner";

export function useCreateProject() {
  return {
    mutate: (values) => {
      console.log("Dummy mode → New project:", values);
      toast.success("Project created (dummy UI mode)");
    },
    isPending: false
  };
}
