"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import { Plus } from "lucide-react";
import { useGlobalStore } from "@/store/globalStore";

const createHouseSchema = z.object({
  name: z.string(),
});
interface CreateHouseProp {
  onHouseCreated?: () => void
}

export function CreateHouse({ onHouseCreated }: CreateHouseProp) {

  const [open, setOpen] = useState(false);
  const { careHome } = useGlobalStore()
const handleSubmit = async (value: z.infer<typeof createHouseSchema>) => {
  const { name } = value;
  const payload = { name, careHomeId: careHome?.id };

  const res = await fetch("/api/houses", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  setOpen(false);
  if (data.success) {
    showSuccessToast("New house created");
    onHouseCreated?.();
  } else {
    showErrorToast("Error creating new house");
  }
};


  const form = useForm<z.infer<typeof createHouseSchema>>({
    resolver: zodResolver(createHouseSchema),
    defaultValues: {},
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) form.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4"
          >
            <h1>Add a new house</h1>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>House Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Create</Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
