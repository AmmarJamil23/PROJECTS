import { Button } from "@/components/ui/button";
import { Trash, File } from "lucide-react";
import { useFileStore } from "@/features/files/useFileStore";
import { toast } from "sonner";

export default function FileCard({ file }) {
  const deleteFile = useFileStore((s) => s.deleteFile);

  return (
    <div className="border rounded-lg p-4 bg-card flex justify-between items-center">
      <div className="flex items-center gap-3">
        <File size={28} className="text-blue-500" />
        <div>
          <p className="font-semibold">{file.name}</p>
          <p className="text-sm text-muted-foreground">
            {file.size} · Uploaded by {file.uploadedBy}
          </p>
          <p className="text-xs text-muted-foreground">{file.time}</p>
        </div>
      </div>

      <Button
        variant="destructive"
        size="icon"
        onClick={() => {
          deleteFile(file._id);
          toast.success("File deleted");
        }}
      >
        <Trash size={16} />
      </Button>
    </div>
  );
}
