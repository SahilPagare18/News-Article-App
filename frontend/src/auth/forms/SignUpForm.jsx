import React, { useState } from "react";

("use client");

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";


const formSchema = z.object({
  username: z.string().min(2,{message:"Username must be atleast 2 chracters"}),
  email: z.string().min({message:"Invalid email address"}),
  password: z.string().min(8,{message:"Password must be atleast 8 characters"})
});

const SignUpForm = () => {
  
  const {toast}=useToast()
  const [loading,setLoading]=useState(false);
  const [errorMessage,setErrorMessage]=useState(null);

  const navigate=useNavigate();

    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
        email: "",
        password: "",
      },
    })
  

  async function onSubmit(values) {
    console.log(values);
    
    try {
      setLoading(true)
      setErrorMessage(null)

      const res=await fetch("/api/auth/signup",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(values)
      })

      const data=await res.json()

      if(data.success ===false){
        setLoading(false)
        toast({title:"SignUp fail please try again"})
        return setErrorMessage(data.message)
      }

      setLoading(false)

      if(res.ok){
        toast({title:"SignUp Successful!!"})
        navigate("/signin")
      }

    } catch (error) {
      setErrorMessage(error.message)
      toast({title:"Something went wrong!!"})
    }
  }

  return (
    <>
      <div className="min-h-screen mt-48 ml-72 flex">
        {/* left side */}
        <div className="mr-14">
          <h1 className="font-bold lg:text-4xl sm:text-2xl mb-12 ">
            <span className="text-slate-500">News</span>
            <span className="text-slate-900">Sphere</span>
          </h1>

          <div>
            <h2 className="font-bold text-3xl mb-5">Create a new account</h2>
            <p>Welcome to NewsSphere,Please provide your details</p>
          </div>
        </div>

        {/* right side */}

        <div className="flex-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" type="text" className="mr-14" {...field} />
                    </FormControl>
                
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
                      <Input placeholder="xyz@email.com" type="email" className="" {...field} />
                    </FormControl>
                
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
                      <Input placeholder="Password" type="password" className="mr-14" {...field} />
                    </FormControl>
                
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit"   disabled={loading} className="bg-blue-500 w-[60%]" >
              {loading ? (
                  <span className="animate-pulse">Loading...</span>
                ) : (
                  <span>Sign Up</span>
                )}
              </Button>
            </form>
          </Form>

          <div className="flex gap-2 text-sm mt-5">
            <span>Have an Account?</span>
          

          <Link to='/sign-in' className="text-blue-500">
          Sign In
          </Link>
          </div>

          {errorMessage && <p className="mt-5 text-red-500">{errorMessage}</p>}
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
