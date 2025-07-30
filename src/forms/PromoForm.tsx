"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../components/ui/Button";
import { InputGroup } from "../components/ui/InputGroup";
import { promoCodeType } from "../templates/cart/CartPayment";
import { promoSchema } from "./schemas/formsSchema";

export const FORM_ID = "promo-form";

export const PromoForm = ({
  promoCode,
  setPromoCode,
}: {
  promoCode?: promoCodeType | null;
  setPromoCode: Dispatch<React.SetStateAction<promoCodeType | null>>;
}) => {
  // const { login } = useAuth();
  // const router = useRouter();

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
    setError,
  } = useForm({ resolver: zodResolver(promoSchema), mode: "onSubmit" });

  const submitForm = useCallback(
    async (values: z.infer<typeof promoSchema>) => {
      console.log("Promo code submitted:", values.promocode);
      try {
        const response = await fetch(
          `https://68885ce7adf0e59551b9a19d.mockapi.io/coupon/${values.promocode}`,
          {
            method: "get",
            headers: { "content-type": "application/json" },
          }
        );

        if (!response.ok) {
          throw new Error("Invalid promo code");
        }
        const data = await response.json();

        if (!data.valid) {
          throw new Error("promo code expired");
        }

        setPromoCode(data);
      } catch (error) {
        console.error(error);
        setError("promocode", {
          type: "manual",
          message: error instanceof Error ? error.message : "An error occurred",
        });
      }
    },
    [setError, setPromoCode]
  );

  return (
    <form
      id={FORM_ID}
      onSubmit={handleSubmit(submitForm)}
      className="w-full space-x-2 flex"
    >
      <InputGroup>
        <InputGroup.Label htmlFor="promocode" hidden>
          Promo Code
        </InputGroup.Label>
        <InputGroup.InputText
          id="promocode"
          type="text"
          {...register("promocode")}
          placeholder="promo-code"
          className="w-full"
          disabled={promoCode !== null}
        />

        {promoCode ? (
          <InputGroup.Message variant="success">
            {"promoCode valido e applicato"}
          </InputGroup.Message>
        ) : (
          <InputGroup.Message>{errors.promocode?.message}</InputGroup.Message>
        )}
      </InputGroup>
      {!promoCode ? (
        <Button
          variant="tertiary"
          form="promo-form"
          type="submit"
          rounded="default"
        >
          Applica
        </Button>
      ) : (
        <Button
          variant="tertiary"
          rounded="default"
          onClick={() => {
            setPromoCode(null);
            reset();
          }}
        >
          Annulla
        </Button>
      )}
    </form>
  );
};
