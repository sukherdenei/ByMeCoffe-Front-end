import { getUsers } from "../user";
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"


export const checkUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const users = await getUsers();
  const user = users.find((user) => user.email === email);

  if (!user) {
    return new Response(

      JSON.stringify({ message: "user not found", error: 
        true }),
      {
        status: 404,
      }
    );
  }

  const isCorrect = user.password === password;

  if (!isCorrect) {
    return new Response(
      JSON.stringify({ message: "wrong password", error: true }),
      {
        status: 404,
      }
    );
  }
  return new Response(JSON.stringify({ message: "Successfully logged in" }), {
    status: 200,
  });
};
