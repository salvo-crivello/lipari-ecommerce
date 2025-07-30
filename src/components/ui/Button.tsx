"use client";

import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import Link, { LinkProps } from "next/link";

import { AnchorHTMLAttributes, ButtonHTMLAttributes, ElementType } from "react";

export const buttonVariants = cva(
  "group inline-flex gap-2.5 items-center font-medium transition-all duration-150 ease-in h-fit w-fit text-nowrap disabled:pointer-events-none leading-none text-md disabled:opacity-30",
  {
    variants: {
      variant: {
        fill: "bg-blue-950 justify-center text-white hover:bg-blue-600 active:bg-blue-700 hover:-translate-y-1 active:-translate-y-0",
        secondary:
          "bg-black/10 justify-center hover:-translate-y-1 active:-translate-y-0 hover:bg-black/15 text-white",
        with_border:
          "bg-transparent justify-center hover:-translate-y-1 active:-translate-y-0 border border-blue-950 text-blue-950 hover:border-blue-600 hover:text-blue-600",
        tertiary: "justify-center bg-black/5 hover:bg-black/10 active:black/5",
        ghost:
          "justify-center bg-transparent hover:-translate-y-1 active:-translate-y-0",
        text: "justify-center bg-transparent hover:underline hover:text-blue-600",
        inputButton:
          "bg-transparent border border-neutral-300 text-neutral-700 hover:border-blue-600 hover:text-blue-600 justify-start",
      },
      size: {
        default: "px-4 py-2",
        small: "px-6 py-2",
        icon: "p-2",
        no_padding: "",
      },
      rounded: {
        default: "rounded-md",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "default",
      rounded: "full",
    },
  }
);

export const linkButtonVariant = cva(
  "group inline-flex gap-2.5 items-center justify-center font-medium transition-all duration-150 ease-in h-fit w-fit text-nowrap disabled:pointer-events-none leading-normal underline text-md",
  {
    variants: {
      variant: {
        primary: "text-olamide-700",
        secondary: "text-black",
      },
      size: {
        default: "px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

//__BUTTON________________________________________________________________

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon?: ElementType;
  iconPos?: "left" | "right" | "center" | undefined;
}

export const Button = ({
  variant,
  size,
  rounded,
  icon: Icon,
  iconPos = "left",
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        buttonVariants({ variant, size, rounded }),
        {
          "pl-4": Icon && iconPos === "left",
          "pr-4": Icon && iconPos === "right",
          "": Icon && iconPos === "center",
        },
        className
      )}
      {...props}
    >
      {Icon && (iconPos === "left" || iconPos === "center") && (
        <Icon size="1.2em" className="shrink-0" />
      )}
      {children}
      {Icon && iconPos === "right" && (
        <Icon size="1.2em" className="shrink-0" />
      )}
    </button>
  );
};

//__LINK_BUTTON________________________________________________________________

export interface LinkButtonProps
  extends LinkProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>,
    VariantProps<typeof buttonVariants> {
  icon?: ElementType;
  iconPos?: "left" | "right" | "center" | undefined;
}

export const LinkButton = ({
  variant,
  size,
  rounded,
  icon: Icon,
  iconPos = "left",
  children,
  className,
  ...props
}: LinkButtonProps) => {
  return (
    <Link
      className={clsx(
        buttonVariants({ variant, size, rounded }),
        {
          "pl-4": Icon && iconPos === "left",
          "pr-4": Icon && iconPos === "right",
          "": Icon && iconPos === "center",
        },
        className
      )}
      {...props}
    >
      {Icon && (iconPos === "left" || iconPos === "center") && (
        <Icon size="1.2em" className="shrink-0" />
      )}
      {children}
      {Icon && iconPos === "right" && (
        <Icon size="1.2em" className="shrink-0" />
      )}
    </Link>
  );
};

//__ICON_BUTTON________________________________________________________________

interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon: ElementType | null;
}

export const IconButton = ({
  variant,
  size = "icon",
  rounded,
  icon: Icon,
  className,
  children,
  ...props
}: IconButtonProps) => {
  return (
    <button
      className={clsx(
        "w-fit",
        buttonVariants({ variant, size, rounded }),
        className
      )}
      {...props}
    >
      {children}
      {Icon && <Icon size="1.2em" className="shrink-0" />}
    </button>
  );
};

///////////////////////
//////////////////////

const alotButtonIconVariant = cva(
  "shrink-0 transition-all group-hover:-rotate-[20deg] duration-200 ease-in"
);

const alotButtonFrontVariant = cva(
  "group relative inline-flex gap-2 items-center justify-center transition-all duration-150 ease-in h-fit w-fit border-4 rounded-md text-lg px-6 py-2 uppercase font-primary font-semibold text-nowrap leading-normal -translate-y-0.5 group-hover:-translate-y-1.5 group-hover:rounded-b-lg group-hover:rounded-t-lg group-active:-translate-y-0.5 group-active:rounded-b-md group-active:rounded-t-md"
);

const alotButtonMenuVariant = cva(
  "relative inline-flex w-full gap-2 items-center transition-all duration-150 ease-in h-fit text-lg py-2 font-olamide-heading font-semibold text-nowrap leading-normal group-hover:-translate-y-1 group-active:translate-y-0"
);

const alotButtonBackVariant = cva(
  "absolute inset-0 rounded-md transition-all duration-150 ease-in origin-bottom-left group-hover:rounded-lg group-active:rounded-md"
);

const alotButtonLineVariant = cva(
  "absolute h-0.5 -bottom-1 inset-x-0 transition-all duration-300 ease-[cubic-bezier(.54,.01,0,1)] origin-left w-0 group-hover:w-full border-b-4"
);

interface AlotButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ElementType;
  iconPos?: "left" | "right" | undefined;
  frontColor?: string;
  textColor?: string;
  borderColor?: string;
  bgColor?: string;
}

///////////////////////
//////////////////////

export const AlotButton = ({
  icon: Icon,
  iconPos = "left",
  children,
  frontColor = "bg-alotyellow",
  textColor = "text-primary",
  borderColor = "border-primary",
  bgColor = "bg-primary",
  className,
  ...props
}: AlotButtonProps) => {
  return (
    <button
      className={clsx(
        "relative inline-block group disabled:pointer-events-none",
        className
      )}
      {...props}
    >
      {/* Static shadow base */}
      <div className={clsx(alotButtonBackVariant(), bgColor)} />

      <span
        className={clsx(
          alotButtonFrontVariant(),
          {
            "pl-4": Icon && iconPos === "left",
            "pr-4": Icon && iconPos === "right",
          },
          frontColor,
          textColor,
          borderColor
        )}
      >
        {Icon && iconPos === "left" && (
          <Icon size="1.2em" className={clsx(alotButtonIconVariant())} />
        )}
        {children}
        {Icon && iconPos === "right" && (
          <Icon size="1.2em" className={clsx(alotButtonIconVariant())} />
        )}
      </span>
    </button>
  );
};

///////////////////////
//////////////////////

export const AlotMenuButton = ({
  icon: Icon,
  iconPos = "left",
  children,
  textColor = "text-primary",
  borderColor = "border-primary",
  className,
  ...props
}: AlotButtonProps) => {
  return (
    <button
      className={clsx(
        "relative inline-block group disabled:pointer-events-none border-b-4 border-olamide-grey-medium/50",
        className
      )}
      {...props}
    >
      {/* Static base line*/}
      <div className={clsx(alotButtonLineVariant(), borderColor)} />

      <span
        className={clsx(
          alotButtonMenuVariant(),
          {
            "pl-4": Icon && iconPos === "left",
            "pr-4": Icon && iconPos === "right",
          },
          textColor
        )}
      >
        {Icon && iconPos === "left" && (
          <Icon size="1.2em" className={clsx(alotButtonIconVariant())} />
        )}
        {children}
        {Icon && iconPos === "right" && (
          <Icon size="1.2em" className={clsx(alotButtonIconVariant())} />
        )}
      </span>
    </button>
  );
};
