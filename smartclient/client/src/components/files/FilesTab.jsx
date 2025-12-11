import { useFileStore } from "@/features/files/useFileStore";
import UploadFileButton from "./UploadFileButton";
import FileCard from "./FileCard";

export default function FilesTab() {
  const files = useFileStore((s) => s.files);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Files</h2>
        <UploadFileButton />
      </div>

      {/* List */}
      <div className="space-y-3">
        {files.map((file) => (
          <FileCard key={file._id} file={file} />
        ))}
      </div>
    </div>
  );
}
