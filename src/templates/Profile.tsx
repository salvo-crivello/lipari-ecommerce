"use client";
import React, { useLayoutEffect } from "react";
import { useAuth } from "../contexts/AuthProvider";

function Profile() {
  const { fetchAccessToken, user } = useAuth();

  useLayoutEffect(() => {
    fetchAccessToken();
  }, [fetchAccessToken]);

  return (
    <article>
      <header className="min-h-fit px-5 lg:px-10 pt-40 pb-20 bg-[url('/hero.webp')] bg-auto bg-top flex gap-2 flex-col xl:flex-row">
        PROFILO
      </header>
      <section className="px-5 lg:px-10 py-20">
        <ul>
          {user &&
            Object.entries(user).map(([key, value]) => {
              return (
                <li key={key.toString()}>
                  <span>{key.toString()}</span>
                  <span>{value.toString()}</span>
                </li>
              );
            })}
        </ul>
      </section>
    </article>
  );
}

export default Profile;
