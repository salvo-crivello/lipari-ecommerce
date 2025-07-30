"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { InputGroup } from "../components/ui/InputGroup";
import { useAuth } from "../contexts/AuthProvider";
import { loginSchema } from "./schemas/formsSchema";
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/Button";

export const FORM_ID = "login-form";

export const LoginForm = () => {
  const { login } = useAuth();
  const router = useRouter();

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm({ resolver: zodResolver(loginSchema), mode: "onSubmit" });

  const submitForm = useCallback(
    async (values: z.infer<typeof loginSchema>) => {
      try {
        await login(values);
        reset();
        router.push("/");
      } catch (error) {
        console.error(error);
      }
    },
    [login, reset, router]
  );

  return (
    <form
      id={FORM_ID}
      onSubmit={handleSubmit(submitForm)}
      className="w-full space-y-2"
    >
      <InputGroup>
        <InputGroup.Label htmlFor="username">Username</InputGroup.Label>
        <InputGroup.InputText
          id="username"
          type="text"
          autoComplete="additional-name"
          {...register("username")}
          placeholder="nome utente"
          defaultValue={"emilys"}
        />
        <InputGroup.Message>{errors.username?.message}</InputGroup.Message>
      </InputGroup>
      <InputGroup>
        <InputGroup.Label htmlFor="password">Password</InputGroup.Label>
        <InputGroup.InputPassword
          id="password"
          autoComplete="password"
          {...register("password")}
          placeholder="insert password"
          defaultValue={"emilyspass"}
        ></InputGroup.InputPassword>
        <InputGroup.Message>{errors.password?.message}</InputGroup.Message>
      </InputGroup>
      <Button
        variant="fill"
        form="login-form"
        type="submit"
        className="w-full mt-5"
      >
        Accedi
      </Button>
    </form>
  );
};
