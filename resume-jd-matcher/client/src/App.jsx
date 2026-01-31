import UploadPanel from "./components/UploadPanel"
import ChatPanel from "./components/ChatPanel"

export default function App() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-xl font-bold p-4">
        Resume and Job Matcher
      </h1>
      <UploadPanel />
      <ChatPanel />
    </div>
  )
}
