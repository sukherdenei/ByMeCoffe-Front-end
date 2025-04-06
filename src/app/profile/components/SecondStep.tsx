"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
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
import { Button } from "@/components/ui/button";
import { Country, CountryDropdown } from "@/components/ui/country-dropdown";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useRouter } from "next/navigation";

const formSchema = z.object({
  country: z.string().nonempty("Please select country"),
  firstName: z.string().nonempty("Please enter your first name"),
  lastName: z.string().nonempty("Please enter your last name"),
  about: z
    .string()
    .nonempty("Please enter your card number")
    .min(10, {
      message: "Card number must be at 10 characters.",
    })
    .max(12, "Maximum 12 character"),
  expires: z.string().nonempty("Please enter month"),
  year: z.string().nonempty("Please enter year"),
  cvv: z.string().nonempty("Please enter your cvv").min(3, {
    message: "CVV number must be at 3 characters.",
  }),
});
export const SecondStep = () => {
  const [selectedCountry, setSelectedCountry] = React.useState<Country | null>(
    null
  );
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "",
      firstName: "",
      lastName: "",
      about: "",
      expires: "",
      year: "",
      cvv: "",
    },
  });

  const getBankCard = async (
    country: string,
    firstname: string,
    lastname: string,
    cardnumber: string,
    expirydate: string,
    user_id: string
  ) => {
    const response = await fetch("/api/bank-card", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: country,
        firstname: firstname,
        lastname: lastname,
        cardnumber: cardnumber,
        expirydate: expirydate,
        user_id: user_id,
      }),
    });
    const data = await response.json();
    console.log("Successfully sign-up", data);
    // router.push("/login");
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast.success(`${selectedCountry?.name} ${selectedCountry?.emoji} `);
    console.log(values);
    router.push("/");
    getBankCard(
      values.country,
      values.firstName,
      values.lastName,
      values.expires,
      values.year,
      values.cvv
    );
  }

  return (
    <div>
      <div className="w-[510px] flex flex-col items-start ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-[510px] items-start   "
          >
            <div className="w-full py-6 flex flex-col items-start gap-[6px] ">
              <h3 className="text-[24px] font-[600] leading-[32px] ">
                How would you like to be paid?{" "}
              </h3>
              <h4 className="text-[14px] leading-[20px] font-[400] text-muted-foreground ">
                Enter location and payment details
              </h4>
            </div>
            <div className="w-full flex flex-col items-start gap-6 ">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-2 items-start">
                    <FormLabel>Select country</FormLabel>
                    <div className="w-full">
                      <CountryDropdown
                        placeholder="Country"
                        defaultValue={field.value}
                        onChange={(country) => {
                          field.onChange(country.alpha3);
                        }}
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full flex items-start gap-3 ">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="w-full flex flex-col items-start gap-2 ">
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your name here "
                          className="w-full h-10"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription hidden></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="w-full flex flex-col items-start gap-2 ">
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your name here "
                          className="w-full h-10"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription hidden></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem className="w-full h-[62px] flex flex-col items-start gap-2 ">
                    <FormLabel>Enter card number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="XXXX-XXXX-XXXX-XXXX"
                        className="w-full h-10"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription hidden></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex w-full items-start gap-4 ">
                <FormField
                  control={form.control}
                  name="expires"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Expires</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Month"
                          className="w-full h-[36px] "
                          {...field}
                          type="number"
                        />
                      </FormControl>
                      <FormDescription hidden></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Year</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Year"
                          className="w-full h-[36px] "
                          {...field}
                          type="number"
                        />
                      </FormControl>
                      <FormDescription hidden></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cvv"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Cvv</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Cvv"
                          className="w-full h-[36px] "
                          {...field}
                          type="number"
                        />
                      </FormControl>
                      <FormDescription hidden></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex w-full justify-end mt-6 ">
              <Button className="w-[246px] h-10 cursor-pointer " type="submit">
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
