import React from 'react'
import { useRef } from "react"

const RenderCounter = ({ label }) => {
    const renderCount = useRef(0);

    renderCount.current += 1;
  return (
    <div>
        {label} renders: {renderCount.current}
    </div>
  )
}

export default RenderCounter