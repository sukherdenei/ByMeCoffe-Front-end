import { string } from "zod"
import { UserType } from "../../util/type"

export const getUsers=async():Promise<UserType[]>=>{
    // connect to db and get Users  then return those users
    return [
        {
            name:"User",
            price:8000
        }
    ]
}