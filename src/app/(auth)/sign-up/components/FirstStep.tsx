// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import Link from "next/link";

// const FirstStep = ({ nextPage }: { nextPage: () => void }) => {
//   return (
    // <div className="w-full h-screen flex items-center justify-center ">
    //   <Link href={"/login"}>
    //     <Button
    //       variant={"secondary"}
    //       className="h-10 absolute top-[32px] right-[80px] "
    //     >
    //       Log in
    //     </Button>
    //   </Link>
    //   <div className="w-[407px] flex flex-col items-start rounded-lg ">
    //     <div className="flex flex-col items-start p-6 gap-[6px] ">
    //       <h3 className="text-[24px] font-[600] leading-[32px] w-full ">
    //         Create Your Account
    //       </h3>
    //       <h4 className="w-full text-[14px] font-[400] leading-[20px] text-foreground ">
    //         Choose a username for your page
    //       </h4>
    //     </div>
    //     <div className="flex flex-col gap-[10px] items-start px-[24px] pb-[24px] w-full ">
    //       <div className="flex flex-col items-start gap-2 w-full  ">
    //         <h5 className="text-[14px] font-[500] leading-[14px]  ">
    //           Username
    //         </h5>
    //         <Input placeholder="Enter username here" />
    //       </div>
    //     </div>

    //     <div className="flex items-start gap-[10px] px-[24px] pb-[24px] w-full ">
    //       <Button variant="default" className="w-full h-10" onClick={nextPage}>
    //         Continue
    //       </Button>
    //     </div>
    //   </div>
    // </div>
//   );
// };

// export default FirstStep;


"use client"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { json } from "stream/consumers"
import { boolean, z } from "zod"
import { UserType } from "../../../../../util/type"

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }).max(512,"Maximum 12 character"),
})

export function FirstStep({nextPage}:{nextPage:()=>void}) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

const existingUsernames: string[] = ['user1', 'user2', 'admin'];

function isUsernameTaken(username: string): boolean {
  return existingUsernames.includes(username);
}

const usernameToCheck = 'user1';

if (isUsernameTaken(usernameToCheck)) {
  console.log(`"${usernameToCheck}" нь аль хэдийн бүртгэгдсэн байна.`);
} else {
  console.log(`"${usernameToCheck}" нь ашиглахад бэлэн байна.`);
}

const [users,setUsers]=useState<UserType[] | null>(null)

const addUser = async (email:string, password:string)=>{
  useEffect(()=>{
    fetch("api/user",{method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({email,password})
    })
    .then((data)=>data.json())
    .then((json)=>setUsers(json.data))
  },[])
}


console.log(users)


  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    nextPage()
    // isUsernameTaken(data:username)
  }
  return(
    <div className="w-full h-screen flex items-center justify-center">
        <Link href={"/login"}>
    <Button
      variant={"secondary"}
      className="h-10 absolute top-[32px] right-[80px] "
    >
      Log in
    </Button>
  </Link>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[24px] font-[600] leading-[32px] w-full">Create Your Account</FormLabel>
              <FormDescription className="w-full text-[14px] font-[400] leading-[20px] text-foreground">
              Choose a username for your page
              </FormDescription>
              <FormControl>
                <Input placeholder="Enter username here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="default" className="w-full h-10" >Continue</Button>
      </form>
    </Form>
    <div>{users && users [0].name}</div>
    </div>
  )
//   <div className="w-full h-screen flex items-center justify-center ">
//   <Link href={"/login"}>
//     <Button
//       variant={"secondary"}
//       className="h-10 absolute top-[32px] right-[80px] "
//     >
//       Log in
//     </Button>
//   </Link>
//   <div className="w-[407px] flex flex-col items-start rounded-lg ">
//     <div className="flex flex-col items-start p-6 gap-[6px] ">
//       <h3 className="text-[24px] font-[600] leading-[32px] w-full ">
//         Create Your Account
//       </h3>
//       <h4 className="w-full text-[14px] font-[400] leading-[20px] text-foreground ">
//         Choose a username for your page
//       </h4>
//     </div>
//     <div className="flex flex-col gap-[10px] items-start px-[24px] pb-[24px] w-full ">
//       <div className="flex flex-col items-start gap-2 w-full  ">
//         <h5 className="text-[14px] font-[500] leading-[14px]  ">
//           Username
//         </h5>
//         <Input placeholder="Enter username here" />
//       </div>
//     </div>

//     <div className="flex items-start gap-[10px] px-[24px] pb-[24px] w-full ">
//       <Button variant="default" className="w-full h-10" onClick={nextPage}>
//         Continue
//       </Button>
//     </div>
//   </div>
// </div>
}
