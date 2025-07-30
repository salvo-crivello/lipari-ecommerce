"use client";

import { Button } from "@/src/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { LoginForm } from "@/src/forms/LoginForm";

function CardLoginForm() {
  return (
    <Card className="w-full max-w-sm bg-white shadow-lg shadow-neutral-200">
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
