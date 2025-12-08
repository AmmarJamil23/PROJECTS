import DashboardLayout from "@/layouts/DashboardLayout";
import { useProjects } from "@/features/projects/useProjects";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectCardSkeleton from "@/components/projects/ProjectCardSkeleton";
import { Button } from "@/components/ui/button";
import CreateProjectModal from "@/components/projects/CreateProjectModal";


export default function Projects() {
  const { data: projects, isLoading } = useProjects();

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Projects</h2>
        <CreateProjectModal />

      </div>

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      )}

      {!isLoading && projects.length === 0 && (
        <p className="text-muted-foreground text-sm">
          No projects yet. Create one!
        </p>
      )}

      {!isLoading && projects.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
