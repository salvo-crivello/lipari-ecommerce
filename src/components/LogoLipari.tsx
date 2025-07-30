import Image from "next/image";
import React from "react";

function LogoLipari() {
  return (
    <Image
      src={"/logo.png"}
      alt="logo lipari consulting"
      width={100}
      height={100}
      className="w-10 h-10 object-cover"
    />
  );
}

export default LogoLipari;
