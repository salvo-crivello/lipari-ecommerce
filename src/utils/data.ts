import {
  Tv,
  Smartphone,
  SpeakerIcon,
  LucideLaptop2,
  GamepadIcon,
  Watch,
  CircleUserRound,
  Settings,
} from "lucide-react";

export const navLinks = [
  {
    path: "/",
    name: "Homepage",
    id: "id_homepage",
  },
  {
    path: "/products",
    name: "Products",
    id: "id_products",
  },
];

export const navLinksUser = [
  {
    path: "/profile",
    name: "Profilo",
    id: "id_profile",
    icon: CircleUserRound,
  },
  {
    path: "/orders",
    name: "Ordini",
    id: "id_orders",
    icon: Settings,
  },
];

export const marketCategory = [
  { src: "", cat: "tv" },
  { src: "", cat: "audio" },
  { src: "", cat: "laptop" },
  { src: "", cat: "mobile" },
  { src: "", cat: "gaming" },
  { src: "", cat: "appliances" },
];

export const dummyLoginData = {
  username: "emilys",
  password: "emilyspass",
  expiresInMins: 30, // optional
};

export const productsCategory = {
  tv: {
    src: "/images/products/tv.png",
    icon: Tv,
  },
  audio: {
    src: "/images/products/audio.png",
    icon: SpeakerIcon,
  },
  laptop: {
    src: "/images/products/laptop.png",
    icon: LucideLaptop2,
  },
  mobile: {
    src: "/images/products/earphone.png",
    icon: Smartphone,
  },
  gaming: {
    src: "/images/products/watch.png",
    icon: GamepadIcon,
  },
  appliances: {
    src: "/images/products/speaker.png",
    icon: Watch,
  },
};
