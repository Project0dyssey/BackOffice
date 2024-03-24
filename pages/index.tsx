import { Text } from "@/components/singleComponents/Text";
import { Input } from "@/components/singleComponents/input";
import { SubmitButton } from "@/components/singleComponents/submitButton";
import { useState } from "react";

export default function Home() {
  const [userInfo, setUserInfo] = useState<any>({ email: '', password: '' })

  return (
    <div className="h-[100%] flex flex-col items-center">
      <div className="mt-[5rem]">
        <Text text="Log In" />
      </div>
      <div className="flex flex-col mt-[12rem] gap-4">
        <Input type="email" description="@email" userInfo={userInfo} setUserInfo={setUserInfo} />
        <Input type="password" description="password" userInfo={userInfo} setUserInfo={setUserInfo} />
        <div className="flex justify-center">
          <SubmitButton buttonDescription="Entrar" page="login" userInfo={userInfo} />
      </div>
    </div>
    </div >
  );
}
