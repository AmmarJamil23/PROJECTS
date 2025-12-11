import { useParams } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import TasksTab from "@/components/tasks/TasksTab";
import MembersTab from "@/components/members/MembersTab";
import ActivityTab from "@/components/activity/ActivityTab";
import FilesTab from "@/components/files/FilesTab";
// MULTIPLE DUMMY PROJECTS
const dummyProjects = [
  {
    _id: "1",
    name: "Website Redesign",
    description: "A complete UI and UX overhaul of the main company website.",
  },
  {
    _id: "2",
    name: "Mobile App Development",
    description: "Building a cross platform mobile application.",
  },
  {
    _id: "3",
    name: "Marketing Dashboard",
    description: "Internal dashboard for tracking marketing KPIs.",
  }
];

export default function ProjectDetails() {
  const { projectId } = useParams();

  // pick the matching dummy project
  const project = dummyProjects.find((p) => p._id === projectId) || dummyProjects[0];

  return (
    <DashboardLayout>
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{project.name}</h1>
        <p className="text-muted-foreground mt-1">{project.description}</p>
      </div>

      {/* TABS */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="border p-1 w-full flex justify-start gap-2 overflow-x-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <p className="text-muted-foreground">Overview content coming soon...</p>
        </TabsContent>

        <TasksTab projectId={projectId} />

        <TabsContent value="members" className="mt-6">
          <MembersTab />
        </TabsContent>

      <TabsContent value="activity" className= "mt-6">
        <ActivityTab />
      </TabsContent>

      <TabsContent value="files" className="mt-6">
        <FilesTab />
      </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
