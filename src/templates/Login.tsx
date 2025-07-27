"use client";
import React from "react";
import CardLoginForm from "./login/CardLoginForm";

function Login() {
  return (
    <section className="h-screen min-h-fit px-5 lg:px-10 pt-40 pb-20 bg-[url('/hero.webp')] bg-auto bg-top flex gap-2 flex-col xl:flex-row">
      <CardLoginForm />
    </section>
  );
}

export default Login;
