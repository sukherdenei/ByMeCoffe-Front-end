import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  photo: z.instanceof(File).optional(),
  name: z.string().nonempty("Name is required"),
  about: z.string().nonempty("About is required"),
  url: z.string().url("Enter a valid URL").nonempty("URL is required"),
});

export const FirstStep = ({
  currentStep,
  setCurrentStep,
}: {
  currentStep: number;
  setCurrentStep: (_e: number) => void;
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      photo: undefined,
      name: "sukherdene",
      about: "Consistency",
      url: "https://www.facebook.com",
    },
  });

  const handleFileChange = (file: File | undefined) => {
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };
  

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setCurrentStep(currentStep + 1);
  }

  return (
    <div>
      <div className="">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-[510px] items-start gap-6"
          >
            <h3 className="text-[24px] font-[600] leading-[32px]">
              Complete your profile page
            </h3>
            <FormField
              control={form.control}
              name="photo"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-3 items-start object-contain">
                  <FormLabel>Add photo</FormLabel>
                  
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-[160px] h-[160px] rounded-full object-contain"
                    />
                  ):                  
                  <FormControl className="flex flex-col items-start">
                  <Input
                    type="file"
                    accept="image/*"
                    className="w-[160px] h-[160px] rounded-full border-[2px] border-dashed"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      field.onChange(file); // Update the form value
                      handleFileChange(file); // Update the preview
                    }}
                  />
               </FormControl>} 
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-3 items-start w-full">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your name here"
                        className="w-full h-10"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>About</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write about yourself here"
                        className="w-full h-[131px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Social media URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://"
                        className="w-full h-10"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-full justify-end">
              <Button className="w-[246px] h-10 cursor-pointer" type="submit">
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};