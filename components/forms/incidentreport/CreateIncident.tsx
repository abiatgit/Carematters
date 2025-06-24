"use client"

import { Button } from "@/components/ui/button"
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

// ✅ Schema
const IncidentSchema = z.object({
    status: z.enum(["serious", "medium", "low"]),
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    time: z.coerce.date(),
    residentId: z.string(),
    unitId: z.string(),
})

// ✅ Component
export function CreateIncidentFrom() {
    const form = useForm<z.infer<typeof IncidentSchema>>({
        resolver: zodResolver(IncidentSchema),
        defaultValues: {
            status: "medium",
            title: "",
            description: "",
            date: new Date(),
            time: new Date(),
            residentId: "",
            unitId: "",
        },
    })

    const onSubmit = (values: z.infer<typeof IncidentSchema>) => {
        console.log("Form Data:", values)
    //   need to pass unit id and resident name to backend
    }

    return (
        <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
                <DialogTitle>Create Incident</DialogTitle>
                <DialogDescription>Report an incident related to a resident.</DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {/* Title */}
                    <FormField
                        name="title"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Incident title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Description */}
                    <FormField
                        name="description"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="write a detail dicription about the incident" {...field}  />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Resident ID
                    <FormField
                        name="residentId"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Resident Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Resident ID" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    /> */}

                    {/* Unit ID */}
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="male">Low</SelectItem>
                                        <SelectItem value="male">Medium</SelectItem>
                                        <SelectItem value="male">Serious</SelectItem>

                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Date */}
                    <FormField
                        name="date"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date</FormLabel>
                                <FormControl>
                                    <Input type="date" value={field.value ? field.value.toISOString().split("T")[0] : ""}
                                        onChange={(e) => field.onChange(new Date(e.target.value))} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Time */}
                    <FormField
                        name="time"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Time</FormLabel>
                                <FormControl>
                                    <Input type="time" value={field.value ? field.value.toISOString().split("T")[0] : ""}
                                        onChange={(e) => field.onChange(new Date(e.target.value))} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit */}
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Submit</Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    )
}
