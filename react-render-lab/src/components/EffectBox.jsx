import React from 'react'
import { useEffect, useRef } from "react";

const EffectBox = () => {
    const effectRuns = useRef(0);
    const cleanupRuns = useRef(0);

    useEffect(() => {
        effectRuns.current += 1;

        const id = setInterval(() => {

        }, 1000);

        return () => {
            cleanupRuns.current += 1;
            clearInterval(id);
        };
    }, []);

  return (
    <div className='bg-zinc-800 rounded p-4 text-sm'>

        <p className='font-semibold'>Effect Tracker</p>

        <p className='text-gray-400'>
            Effect runs: {effectRuns.current}
        </p>

        <p className='text-gray-400'>
            Cleanup runs: {cleanupRuns.current}
        </p>

    </div>
  )
}

export default EffectBox