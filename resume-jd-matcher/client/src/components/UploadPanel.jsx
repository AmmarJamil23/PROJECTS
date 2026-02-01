import { useState } from "react"

function UploadPanel() {
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)


    const uploadResume = async () => {
        setLoading(true)


        const formData = new FormData()
        formData.append("file", file)

        await fetch("http://localhost:4000/api/upload/resume", {
            method: "POST",
            body: formData
        })
        setLoading(false)
        
    }

    return (
        <div className="p-6 space-y-6 bg-black text-white ">
            <h2 className="text-white font-semibold"> Upload Resume</h2>
            <input
                type="file"
                onChange={e => setFile(e.target.files[0])}
                className="border border-white bg-black text-white p-2 w-full"
            />

            <button
                onClick={uploadResume}
                disabled={!file || loading}
                className="bg-white text-black px-6 py-2 rounded disabled:opacity-50"
            >
                {loading ? "Uploading...": "Upload Resume"}
            </button>
        </div>
    )
}

export default UploadPanel
