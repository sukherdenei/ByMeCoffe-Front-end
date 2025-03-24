import { Button } from "@/components/ui/button"
import { Coffee } from "lucide-react"
import Image from "next/image"
import { Logo } from "./logo"


export const SignUp = () => {
    return (
    <div >
        <div className="flex w-full h-full">
        <Logo/>
            <div className="bg-[#FBBF24] w-[50%] h-screen flex flex-col justify-center items-center">
                <div className="flex gap-5">
                <Coffee/>
                <h2 className="text-[16px] w-[119px] h-[20px] font-bold">buy me coffee</h2></div>
                <div className="flex flex-col w-[240px] h-[240px]">
                      <Image src="/Ellipse 86.png" alt="" width={240} height={240}/>
                      <div className="w-[455px] h-[90px]"> <h2>Fund your creative work</h2>
                <p>Accept support Start membership. Setup a shop. It's easier than you think</p></div>
                </div>
            </div>
            <div className="flex flex-col w-[50%] h-screen justify-center items-center gap-6">
                <p>Log in</p>
                <div className="w-[407px] h-[256px] text-[16px]">
                      <h2 className="font-bold text-[16px]">Create Your Account</h2>
                <p className="text-[14px]">Choose a username for your page</p>
               <h3>Username</h3>
               <input type="text" placeholder="Enter username here" className="w-[359px] h-[40px]"/>
               <Button className="w-[359px] h-[40px] bg-[silver]">Continue</Button>
                </div>
            </div>
        </div>
    </div>
    )
  }