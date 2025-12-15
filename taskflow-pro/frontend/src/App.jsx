import React from 'react'
import { useEffect, useState } from "react"
import  { api }  from "./api"

const App = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/health")
    .then(res => {
      setStatus(res.data);
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      setLoading(false);
    })

  }, []);

  if (loading) return <p>Loading...</p>

  return (
    <div style={{ padding: 20 }}>
      <h1>TaskFlow Pro</h1>
      <pre> {JSON.stringify(status, null ,2)} </pre>
    </div>
  )
}

export default App