import { LoginButton } from "@/components/ui/auth/login-button";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-blue-400">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-semibold text-white drop-shadow-md">Auth 🔒</h1>

<LoginButton mode="modal"><Button variant="secondary" >Sign In</Button>  </LoginButton>    
      </div>
    </div>
  );
}
