'use client';

import { useCallback, useState } from "react";
import { toast } from "sonner"

import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginSchema } from "@/schemas"

import { FcGoogle } from "react-icons/fc";

import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";

import Modal from "./Modal";
import Heading from "../Heading";
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";


const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const [passwordType, setPasswordType] = useState('password');


  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setIsLoading(true);
    console.log(values);
    toast.success('Login Success!');
  }

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome back"
        subtitle="Login to your account!"
      />
      <Form {...form}>

        <form className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isLoading}
                    placeholder="john.wick@action.com"
                    type="email"
                  />
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
                  <div
                    style={{
                      position: 'relative'
                    }}
                  >
                    <Input
                      {...field}
                      disabled={isLoading}
                      placeholder="******"
                      type={passwordType}
                    ></Input>
                    <div
                      style={{
                        position: 'absolute',
                        top: '25%',
                        right: '3%',
                        bottom: '20%',
                        cursor: 'pointer'
                      }}
                    >
                      {
                        passwordType === "text" ?
                          <FaRegEye
                            onClick={() => setPasswordType('password')}
                          />
                          :
                          <FaRegEyeSlash
                            onClick={() => setPasswordType('text')}
                          />
                      }
                    </div>
                  </div>
                </FormControl>
                <Button
                  size="sm"
                  variant="link"
                  asChild
                  className="px-0 font-normal"

                >
                  Forgot password?
                </Button>
                <FormMessage />
              </FormItem>
            )}
          />

        </form>
      </Form>
    </div >
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button>
        Continue with Google
      </Button>

      <div className="
      text-neutral-500 text-center mt-4 font-light">
        <p>First time using MCA-CET?
          <span
            onClick={onToggle}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          > Sign up</span>
        </p>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Login"
      onClose={loginModal.onClose}
      onSubmit={form.handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default LoginModal;
