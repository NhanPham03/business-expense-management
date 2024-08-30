import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AppDispatch, RootState } from "@/lib/redux/redux.config";
import { loginSchema, LoginSchema } from "@/lib/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { CgSpinner } from "react-icons/cg";
import { login } from "@/lib/redux/reducers/auth.reducer";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.auth);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginSchema) => {
    const result = await dispatch(login(values));
    if (login.fulfilled.match(result)) {
      navigate("/");
    }
  }

  return (
    <div className="flex min-h-screen w-full justify-center items-center bg-background">
      <div className="p-5 rounded-lg bg-card text-card-foreground">
        <div className="flex flex-col md:w-1/2 w-full">
          {/* Logo & Header */}
          <div className="w-1/2 mx-auto justify-center items-center">
            <Logo />
            <h1 className="text-xl font-bold text-center">Time Tracking and Payroll System</h1>
          </div>
          
          {/* Login Form */}
          <Form {...form}>
            <form className="flex flex-col mx-4 justify-center"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mb-3">
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
                  <FormItem className="mb-4">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your password" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="mx-auto gap-2"
                disabled={isLoading}
              >
                {isLoading && <CgSpinner className="animate-spin" />}
                <span>Login</span>
              </Button>
            </form>
          </Form>
        </div>

        <div className="md:w-1/2">

        </div>
      </div>
    </div>
  );
}
