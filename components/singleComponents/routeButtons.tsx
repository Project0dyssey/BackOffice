import { useRouter } from "next/router";
import { useState } from "react";

interface buttonType {
  path: string;
  description: string;
}

export function RouteButton({ path, description }: buttonType) {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <button
        className={`relative inline-flex items-center justify-center px-4 py-2 
          ${isActive ? 'text-white border-stone-900' : 'text-stone-400 border-transparent'}
          border-2 duration-500 pause
          before:absolute before:inset-0 before:bg-transparent before:border-2 before:border-transparent 
          hover:text-stone-300 hover:outline-none
          hover:before:border-stone-900
          `}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        onClick={() => {
          router.push(path);
          description === "Log out" && localStorage.removeItem("token");
        }}
      >
        {description}
      </button>
    </>
  );
}
