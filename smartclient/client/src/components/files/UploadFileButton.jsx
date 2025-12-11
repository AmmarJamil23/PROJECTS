import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useFileStore } from "@/features/files/useFileStore";
import { toast } from "sonner";

export default function UploadFileButton() {
  const addFile = useFileStore((s) => s.addFile);

  const handleUpload = () => {
    addFile({
      name: "new-file.txt",
      size: "10 KB",
      uploadedBy: "You",
      time: "Just now",
    });

    toast.success("File uploaded (dummy mode)");
  };

  return (
    <Button className="flex items-center gap-2" onClick={handleUpload}>
      <Upload size={18} />
      Upload File
    </Button>
  );
}
