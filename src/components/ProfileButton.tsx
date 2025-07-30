import React, { Dispatch, memo, SetStateAction } from "react";
import { useWindowSize } from "../hooks/useWindowSize";
import { useAuth } from "../contexts/AuthProvider";
import { Button, LinkButton } from "./ui/Button";
import { CircleUserRound } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../store/sliceCart";
import { RootState } from "../store/store";

type ProfileButtonProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

function ProfileButton({ isOpen, setIsOpen }: ProfileButtonProps) {
  const { isLG } = useWindowSize();
  const { user } = useAuth();
  const router = useRouter();

  const { isOpen: cartIsOpen } = useSelector(
    (state: RootState) => state.cartData
  );
  const dispatch = useDispatch();

  const handleProfileClick = () => {
    if (user) {
      setIsOpen(!isOpen);
    } else {
      router.push("/login");
      if (cartIsOpen) {
        dispatch(toggleCart());
      }
    }
  };

  return (
    <>
      {user ? (
        <Button
          size={"icon"}
          iconPos={"center"}
          icon={!user.image ? CircleUserRound : undefined}
          onClick={handleProfileClick}
        >
          {user.image && (
            <Image
              width={40}
              height={40}
              className="rounded-full h-[1.2em] w-[1.2em] shrink-0"
              alt="User Profile"
              src={user.image}
            />
          )}
          {/* {isLG && user.username} */}
        </Button>
      ) : (
        <LinkButton
          size={!isLG ? "icon" : "default"}
          href="/login"
          icon={CircleUserRound}
          iconPos={!isLG ? "center" : "left"}
          onClick={handleProfileClick}
          className="!min-w-fit"
        >
          {isLG && "Login / Signup"}
        </LinkButton>
      )}
    </>
  );
}

export default memo(ProfileButton);
