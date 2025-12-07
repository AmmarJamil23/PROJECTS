import React from 'react'
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";


const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
        const res = await api.get("/projects");
        return res.data.projects;
    }
  })
}

export default useProjects