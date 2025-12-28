import { useRef } from "react";

function RenderBox({ name }) {
  const renders = useRef(0);
  renders.current += 1;

  return (
    <div className="bg-zinc-800 rounded p-4 text-sm">
      <p className="font-semibold">{name}</p>
      <p className="text-gray-400">
        Renders: {renders.current}
      </p>
    </div>
  );
}

export default RenderBox;
