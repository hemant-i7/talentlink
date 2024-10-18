import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return <div className=" flex align-middle justify-center mt-20">
    <SignUp afterSignOutUrl={"/"} />;
    </div>
}
