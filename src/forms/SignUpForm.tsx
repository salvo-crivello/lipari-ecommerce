"use client";

import { Form } from "@/components/form/Form";
import { useI18nContext } from "@/i18n/i18n-react";
import { useCallback } from "react";
// import { toast } from "sonner";
import { z } from "zod";
import { InputGroup } from "../ui/InputGroup";
import { signupSchema } from "./schemas/formsSchema";
import { useAccount } from "@/contexts/AccountProvider";

export const FORM_ID = "signup-form";

export const SignUpForm = () => {
  const { signUp } = useAccount();
  const { LL } = useI18nContext();
  const LLBase = LL.signUp.form;

  const onSubmit = useCallback(async (values: z.infer<typeof signupSchema>) => {
    await signUp(values);
  }, []);

  return (
    <Form
      id={FORM_ID}
      onSubmit={onSubmit}
      schema={signupSchema}
      className="w-full flex flex-col space-y-2"
    >
      {({ register, errors }) => (
        <>
          <InputGroup>
            <InputGroup.Label htmlFor="username">
              {LLBase.username.label()}
            </InputGroup.Label>
            <InputGroup.InputText
              id="username"
              type="text"
              autoComplete="one-time-code"
              {...register("username")}
              placeholder={LLBase.username.placeholder()}
            />
            <InputGroup.Message>{errors.username?.message}</InputGroup.Message>
          </InputGroup>
          <InputGroup>
            <InputGroup.Label htmlFor="email">
              {LLBase.email.label()}
            </InputGroup.Label>
            <InputGroup.InputText
              id="email"
              type="email"
              autoComplete="one-time-code"
              {...register("email")}
              placeholder={LLBase.email.placeholder()}
            />
            <InputGroup.Message>{errors.email?.message}</InputGroup.Message>
          </InputGroup>
          <InputGroup>
            <InputGroup.Label htmlFor="password">
              {LLBase.password.label()}
            </InputGroup.Label>
            <InputGroup.InputPassword
              id="password"
              autoComplete="one-time-code"
              {...register("password")}
              placeholder={LLBase.password.placeholder()}
            ></InputGroup.InputPassword>
            <InputGroup.Message>{errors.password?.message}</InputGroup.Message>
          </InputGroup>
          <InputGroup>
            <InputGroup.Label htmlFor="repeatPassword">
              {LLBase.repeatPassword.label()}
            </InputGroup.Label>
            <InputGroup.InputPassword
              id="repeatPassword"
              autoComplete="one-time-code"
              {...register("repeatPassword")}
              placeholder={LLBase.repeatPassword.placeholder()}
            ></InputGroup.InputPassword>
            <InputGroup.Message>
              {errors.repeatPassword?.message}
            </InputGroup.Message>
          </InputGroup>
        </>
      )}
    </Form>
  );
};
