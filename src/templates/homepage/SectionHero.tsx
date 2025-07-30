import Image from "next/image";
import React from "react";

function SectionHero() {
  return (
    <header className="h-screen min-h-fit px-5 lg:px-10 pt-40 pb-20 bg-[url('/hero.webp')] bg-cover bg-top flex gap-2 flex-col xl:flex-row">
      {/* <h1 className="text-7xl font-bold font-mono">Ballarò 3.0</h1> */}
      <div className="w-full flex gap-2 flex-col">
        <div className="bg-white h-[300px] xl:h-full w-full rounded-xl"></div>
        <div className="flex max-sm:flex-col gap-2 w-full">
          <div className="bg-white/50 h-[160px] w-full rounded-xl"></div>
          <div className="bg-white/80 h-[160px] w-full rounded-xl"></div>
        </div>
      </div>
      <div className="flex flex-col sm:max-xl:flex-row gap-2 w-full lg:max-w-[400px] h-full">
        <div className="bg-white/40 h-[200px] lg:h-full w-full rounded-xl"></div>
        <div className="bg-white/20 h-[200px] lg:h-full w-full rounded-xl"></div>
      </div>
    </header>
  );
}

export default SectionHero;
