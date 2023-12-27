import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignupValidation } from "@/lib/validation"
import Loader from "@/components/shared/Loader"
import { createUserAccount } from "@/lib/appwrite/api"
import { useToast } from "@/components/ui/use-toast"




const SignupForm = () => {
  const { toast } = useToast()
  const isLoading = false;
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
  })


  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    const newUser = await createUserAccount(values);
    if(!newUser){
      return toast({
        title: "Sign up failed. Please try again.",
      });
    }

    // const session = await signInAccount()
  }

  return (
      <Form {...form}>
        <div className="sm:w-420 flex-center flex-col">
          <img src="/assets/images/logo.jpeg" alt="logo" />

          <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create a new account</h2>
          <p className="text-light-3 small-medium md:base-regular mt-2">Please enter your account details</p>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter your name" className="shad-input" {...field} />
                </FormControl>
                <FormDescription>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter your username" className="shad-input" {...field} />
                </FormControl>
                <FormDescription>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter your email" className="shad-input" {...field} />
                </FormControl>
                <FormDescription>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter your password" className="shad-input" {...field} />
                </FormControl>
                <FormDescription>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit"className="shad-button_primary flex-col gap-5 w-full mt-4" >
            {
              isLoading ? (
                <div className="flex-center gap-2">
                  <Loader/> Loading...
                </div>
              ): "Sign up"
            }
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account? 
            <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1 pb-2">Log in</Link>
          </p>
        </form>
        </div>
      </Form>
  )
}

export default SignupForm