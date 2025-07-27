"use client";

import { Form } from "@/components/form/Form";
import { useDatabase } from "@/contexts/DatabaseProvider";
import { useI18nContext } from "@/i18n/i18n-react";
import { useCallback } from "react";
import { z } from "zod";
import { Button } from "../ui/button";
import { InputGroup } from "../ui/InputGroup";
import { SheetTrigger } from "../ui/sheet";
import { addContactSchema } from "./schemas/formsSchema";

export const FORM_ID = "add-contact-form";

export const AddContactForm = () => {
  const { contactAddApi } = useDatabase();
  const { LL } = useI18nContext();
  const LLBase = LL.contacts.add_contact.form;

  const onSubmit = useCallback(
    async (values: z.infer<typeof addContactSchema>) => {
      await contactAddApi(values);
    },
    [],
  );

  return (
    <Form
      id={FORM_ID}
      onSubmit={onSubmit}
      schema={addContactSchema}
      className="w-full space-y-2"
    >
      {({ register, errors }) => (
        <>
          <InputGroup>
            <InputGroup.Label htmlFor="name">
              {LLBase.name.label()}
            </InputGroup.Label>
            <InputGroup.InputText
              id="name"
              type="text"
              autoComplete="name"
              {...register("name")}
              placeholder={LLBase.name.placeholder()}
            />
            <InputGroup.Message>{errors.name?.message}</InputGroup.Message>
          </InputGroup>
          <InputGroup>
            <InputGroup.Label htmlFor="surname">
              {LLBase.surname.label()}
            </InputGroup.Label>
            <InputGroup.InputText
              id="surname"
              type="text"
              autoComplete="given-name"
              {...register("surname")}
              placeholder={LLBase.surname.placeholder()}
            />
            <InputGroup.Message>{errors.surname?.message}</InputGroup.Message>
          </InputGroup>
          <InputGroup>
            <InputGroup.Label htmlFor="email">
              {LLBase.email.label()}
            </InputGroup.Label>
            <InputGroup.InputText
              id="email"
              type="email"
              autoComplete="email"
              {...register("email")}
              placeholder={LLBase.email.placeholder()}
            />
            <InputGroup.Message>{errors.email?.message}</InputGroup.Message>
          </InputGroup>
          <SheetTrigger asChild>
            <Button form="add-contact-form" type="submit" className="w-full">
              {LLBase.button()}
            </Button>
          </SheetTrigger>
        </>
      )}
    </Form>
  );
};
