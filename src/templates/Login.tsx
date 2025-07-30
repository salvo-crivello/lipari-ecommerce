"use client";
import React from "react";
import CardLoginForm from "./login/CardLoginForm";

function Login() {
  return (
    <article className="h-screen min-h-fit px-5 lg:px-10 pt-40 pb-20 bg-neutral-50 flex gap-2 flex-col xl:flex-row">
      <div className="w-full flex items-center justify-center max-w-7xl mx-auto">
        <section className="w-full xl:w-1/2 flex items-center justify-center">
          <CardLoginForm />
        </section>
      </div>
    </article>
  );
}

export default Login;
