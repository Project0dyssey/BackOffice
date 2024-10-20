import { Text } from "@/components/singleComponents/Text";
import { Input } from "@/components/singleComponents/input";
import { SubmitButton } from "@/components/singleComponents/submitButton";
import { useState } from "react";

export default function Home() {
  const [userInfo, setUserInfo] = useState<any>({ email: '', password: '' });

  return (
    <div className="h-screen flex items-center justify-center">
      
      <div className="bg-black bg-opacity-90 shadow-lg rounded-lg p-8 w-[350px] flex flex-col items-center">
        <div className="mb-6">
          <Text text="Log In" />
        </div>
        
        <div className="flex flex-col gap-4">
          <Input type="email" description="@email" userInfo={userInfo} setUserInfo={setUserInfo} />
          <Input type="password" description="password" userInfo={userInfo} setUserInfo={setUserInfo} />
          <div className="flex justify-center">
            <SubmitButton buttonDescription="Entrar" page="login" userInfo={userInfo} />
          </div>
        </div>
      </div>
    </div>
  );
}

