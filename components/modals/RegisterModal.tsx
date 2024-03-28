'use client';

import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { toast } from "sonner"


import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

import Heading from "../Heading";
import Modal from "./Modal";
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { RegisterSchema } from "@/schemas"

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const [passwordType, setPasswordType] = useState('password');



  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });


  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setIsLoading(true);

    console.log(values);


    axios.post('https://nimcet.e-connect.live/api/signup', values)
      .then((res) => {
        console.log(res);
        toast.success('Registered!');
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to MCA-CET"
        subtitle="Create an account!"
      />

      <Form {...form}>
        <form className="w-[90%] space-y-6">
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
                <FormMessage />
              </FormItem>
            )}
          />

        </form>
      </Form>

    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button>
        Continue with Google
      </Button>
      <div
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <p>Already have an account?
          <span
            onClick={onToggle}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          > Log in</span>
        </p>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Sign Up"
      onClose={registerModal.onClose}
      onSubmit={form.handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default RegisterModal;
