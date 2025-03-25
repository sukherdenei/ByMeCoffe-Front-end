"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { json } from "stream/consumers";
import { boolean, z } from "zod";
import { UserType } from "../../../../../util/type";

const formSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters.",
    })
    .max(12, "Maximum 12 character"),
});

export function FirstStep({ nextPage }: { nextPage: () => void }) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const existingUsernames: string[] = ["user1", "user2", "admin"];

  function isUsernameTaken(username: string): boolean {
    return existingUsernames.includes(username);
  }

  const usernameToCheck = "user1";

  if (isUsernameTaken(usernameToCheck)) {
    console.log(`"${usernameToCheck}" нь аль хэдийн бүртгэгдсэн байна.`);
  } else {
    console.log(`"${usernameToCheck}" нь ашиглахад бэлэн байна.`);
  }

  const [users, setUsers] = useState<UserType[] | null>(null);

  const addUser = async (email: string, password: string) => {
    useEffect(() => {
      fetch("api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
        .then((data) => data.json())
        .then((json) => setUsers(json.data));
    }, []);
  };

  console.log(users);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    nextPage();
    isUsernameTaken(values.username);
  }
  return (
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
                <FormLabel className="text-[24px] font-[600] leading-[32px] w-full">
                  Create Your Account
                </FormLabel>
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
          <Button type="submit" variant="default" className="w-full h-10">
            Continue
          </Button>
        </form>
      </Form>
      <div>{users && users[0].name}</div>
    </div>
  );
}
