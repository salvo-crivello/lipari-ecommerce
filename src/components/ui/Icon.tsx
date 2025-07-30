"use client";

import React from "react";
import { LucideIcon, LucideProps } from "lucide-react";

interface IconProps extends LucideProps {
  Icon: LucideIcon;
}

const Icon = ({ Icon, ...props }: IconProps) => {
  return <Icon {...props} />;
};

export default Icon;
