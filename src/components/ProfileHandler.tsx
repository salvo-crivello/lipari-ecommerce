import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import ProfileButton from "./ProfileButton";
import ProfileMenuCard from "./ProfileMenuCard";

function ProfileHandler() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <div className="relative">
      <ProfileButton isOpen={isOpen} setIsOpen={setIsOpen} />
      {user && isOpen && (
        <ProfileMenuCard user={user} logout={logout} setIsOpen={setIsOpen} />
      )}
    </div>
  );
}

export default ProfileHandler;
