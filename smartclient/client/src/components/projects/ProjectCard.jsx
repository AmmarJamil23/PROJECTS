import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ProjectCard({ project }) {
  return (
    <Link to={`/dashboard/projects/${project._id}`}>
      <Card className="hover:shadow-md transition rounded-lg cursor-pointer">
        <CardHeader>
          <CardTitle className="text-lg">{project.name}</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
