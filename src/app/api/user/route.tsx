// "use client"
// import { useEffect, useState } from "react"
// import { json } from "stream/consumers"
// import { string } from "zod"

import { getUsers } from "@/_back_end/user"

// export async function GET(req: Request) {
//     return new Response(JSON.stringify({data:"Hello wordl"}))
// }

// export async function POST(req: Request) {
//     const body = await req.json()
//     console.log({body})
//     return new Response ("Check")
// }

//  const addUser = async (email:string, password:string)=>{
//     try {
//         const user = await fetch ("http://localhost:3000/api/user",{
//             method: "POST",
//             headers:{"Content-Type": "application/json"},
//             body: JSON.stringify({name,password})
//         })
//         if(!user.ok){
//             throw new Error ("error")
//         }
//         const data = await user.json()
//     } catch (error) {
//         console.log(error)
//     }
// }

// export default function Home () {
//     const [data,setData] = useState<{data:string} | null> (null)
//     useEffect(()=>{
//         fetch("api/user")
//         .then((data)=>data.json())
//         .then((json)=>setData(json))
//         // addUser(data:email,password)
//     },[])
//     console.log(data,"Line-21")
//     return <div>{data?.data}</div>
// }


// //
// export const dynamic = 'force-static'
 
// // export async function TestPost() {
// //   const res = await fetch('http://localhost:3000/api/user', {
// //     headers: {
// //       'Content-Type': 'application/json',
// //       'API-Key': process.env.DATA_API_KEY,
// //     },
// //   })
// //   const data = await res.json()
// //   return Response.json({ data })
// // }

export async function GET (){
    const users = await getUsers()
    return new Response (JSON.stringify({data:users}))
}

export async function POST(req:Request) {
    const body = await req.json ()
    console.log({body})
    return new Response ("Post req")
}