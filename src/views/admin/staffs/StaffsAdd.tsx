import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { staffSchema, StaffSchema } from "@/lib/schemas/staff.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/redux.config";
import { createStaff } from "@/lib/redux/reducers/staffs.reducer";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

export default function StaffsAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<StaffSchema>({
    resolver: zodResolver(staffSchema),
    defaultValues: {
      name: "",
      department: "",
      job_title: "",
      rank: "",
      role: "claimer",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: StaffSchema) => {
    dispatch(createStaff(values));
    setOpen(false);
  };

  return (
    <div className="flex flex-col p-4 rounded-lg bg-card shadow-lg">
      {/* Header */}
      <div className="flex flex-row mb-4 text-card-foreground justify-start items-center gap-2">
        <Button variant={"ghost"}
          onClick={() => navigate("/config/staff")}
        >
          <IoIosArrowBack className="text-2xl" />
        </Button>
        <h2 className="text-2xl font-bold">Add Staff</h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="max-w-[600px] md:mx-auto mb-4">
            <div className="flex flex-row mb-3 gap-3">
              <FormField name="name" 
                control={form.control} 
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="John Doe" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField name="role"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-background hover:bg-accent">
                          <SelectValue placeholder="Please select a role" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        <SelectItem value="claimer">Claimer</SelectItem>
                        <SelectItem value="approver">Approver</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-row mb-3 gap-3">
              <FormField name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john.doe@mail.com" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Minimum 8 characters" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-row gap-3">
              <FormField name="department"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="IT" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField name="job_title"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Developer" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField name="rank"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <FormLabel>Rank</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Junior" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Confirm dialog */}
          <div className="flex justify-end">
            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger asChild>
                <Button variant={"default"}>Add</Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Addition</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={form.handleSubmit(onSubmit)}>
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </form>
      </Form>
    </div>
  );
}
