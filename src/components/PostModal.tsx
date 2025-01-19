"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import useFetchTags from "@/features/useFetchTags";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { addPost } from "@/store/postSlice";
import clsx from "clsx";

export const postSchema = z.object({
  body: z.string().min(1, "Story is required"),
  tags: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .min(1, "At least one tag is required"),
});

type PostFormData = z.infer<typeof postSchema>;

const PostModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { data: options, isLoading } = useFetchTags(search);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitSuccessful, isSubmitting },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = (data: PostFormData) => {
    const tags = data.tags.map((tag) => tag.value);
    if (isSubmitSuccessful) {
      dispatch(addPost({ ...data, tags }));
      console.log(data);
      setIsOpen(false);
      setValue("body", "");
      setValue("tags", []);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="bg-gray-300 px-4 py-2 my-2 rounded-full w-full text-foreground/40 text-sm cursor-pointer text-center hover:bg-muted-foreground hover:text-muted duration-150">
          Share your story here ...
        </div>
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className="mb-2 font-bold">
              Share your story
            </DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <div className="space-y-4 mb-4">
            <Controller
              name="body"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  required
                  placeholder="Write your story here ..."
                />
              )}
            />
            <div className="flex gap-1 items-center text-xs">
              <span>Tags:</span>
              <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    required
                    options={options || []}
                    isMulti
                    placeholder="Search and select tags..."
                    onInputChange={(value) => setSearch(value)}
                    isLoading={isLoading}
                    noOptionsMessage={() =>
                      search ? "No tags found" : "Start typing to search"
                    }
                    className="w-full "
                    classNames={{
                      control: ({ isFocused }) =>
                        clsx(isFocused ? "select-control" : ""),
                    }}
                  />
                )}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Share
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PostModal;
