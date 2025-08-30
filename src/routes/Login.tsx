import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {type SubmitHandler, useForm} from "react-hook-form";
import {loginSchema, type LoginSchema} from "@/zod/validation.schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import axios, {AxiosError} from "axios";
import {VITE_BASE_API_URL} from "@/env.ts";
import Cookies from "js-cookie";
import {useNavigate} from "react-router";

interface LoginResponse {
  message: string;
  token: string;
}

const Login = () => {
  const navigate = useNavigate();
  const form = useForm<LoginSchema>({
    defaultValues: {
      username: "",
      password: ""
    },
    resolver: zodResolver(loginSchema)
  })
  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    try {
      const response = await axios.post(`${VITE_BASE_API_URL}/api/auth/signin`, data, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
      }).then(res => res.data as LoginResponse);
      if (response.token) {
        Cookies.set("token", response.token);
        form.reset()
        navigate("/");
      } else {
        form.setError("root", {message: "Login gagal, silakan coba lagi."});
        form.reset()
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e)
        form.setError("root", {
          message: e.response?.data.message
        }, {shouldFocus: true});
        form.reset({username: "", password: ""}, {keepErrors: true});
      } else {
        form.setError("root", {message: "Terjadi kesalahan, silakan coba lagi."});
      }
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Enter your username and password to access your account
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <CardContent className="space-y-4">
              {form.formState.errors.root && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                  {form.formState.errors.root.message}
                </div>
              )}

              <FormField
                control={form.control}
                name="username"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your username"
                        {...field}
                        className={form.formState.errors.username ? "border-red-500 focus-visible:ring-red-500" : ""}
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                        className={form.formState.errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Signing In..." : "Sign In"}
              </Button>
              <div className="text-sm text-center text-muted-foreground">
                <a href="#" className="hover:underline">
                  Forgot your password?
                </a>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
