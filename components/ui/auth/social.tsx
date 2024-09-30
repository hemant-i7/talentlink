"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../button";

export const Social = () => {
  return (
    <div className=" flex item-center w-full gap-x-2">
      <Button size="lg" className="w-full" variant="outline" onClick={()=> {}}>
        <FcGoogle className="w-6 h-6" />
      </Button>
      <Button size="lg" className="w-full" variant="outline" onClick={()=> {}}>
        <FaGithub className="w-6 h-6" />
      </Button>
    </div>
  );
};
