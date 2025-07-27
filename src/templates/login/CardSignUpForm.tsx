"use client";
import { SignUpForm } from "@/components/form/SignUpForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
import { useAccount } from "@/contexts/AccountProvider";
import { useI18nContext } from "@/i18n/i18n-react";
import { AuthMode } from "@/types/common";
import { toast } from "sonner";

function CardSignUpForm() {
  const { LL } = useI18nContext();
  const LLBase = LL.signUp;
  const { setMode } = useAccount();
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{LLBase.title()}</CardTitle>
        <CardDescription className="text-sm text-pretty leading-snug">
          {LLBase.description()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          form="signup-form"
          type="submit"
          className="w-full"
          onClick={() => toast("login clicked.")}
        >
          {LLBase.button()}
        </Button>
        {/* <span className="my-1 flex items-center w-full relative gap-4 justify-stretch text-sm">
          <Separator />
          or
          <Separator />
        </span> */}
        {/* <Button variant="outline" className="w-full">
          {LLBase.buttonGoogle()}
        </Button> */}
        <span className="text-xs text-center mt-2">
          {LLBase.changeAuthMode.text()}
          <Button
            variant="link"
            className="text-xs px-1 font-bold"
            onClick={() => setMode(AuthMode.login)}
          >
            {LLBase.changeAuthMode.link()}
          </Button>
        </span>
      </CardFooter>
    </Card>
  );
}

export default CardSignUpForm;
