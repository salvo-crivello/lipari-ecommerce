"use client";

import { Button } from "@/src/components/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { LoginForm } from "@/src/forms/LoginForm";
import { AuthMode } from "@/src/types/authmode";

function CardLoginForm() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Accedi al tuo account</CardTitle>
        <CardDescription className="text-sm text-pretty leading-snug">
          Inserisci username e password per accedere al tuo account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          variant="fill"
          form="login-form"
          type="submit"
          className="w-full"
        >
          Accedi
        </Button>
        <span className="text-xs text-center mt-2 text-neutral-500">
          Non hai ancora un account?
          <Button
            variant="text"
            size={"no_padding"}
            className="text-xs ml-2"
            // onClick={() => setMode(AuthMode.SIGNUP)}
          >
            Crea account!
          </Button>
        </span>
      </CardFooter>
    </Card>
  );
}

export default CardLoginForm;
