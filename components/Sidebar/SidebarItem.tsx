import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { IconType } from "react-icons";
import { BsDot } from "react-icons/bs";

interface SidebarProps {
  href: string;
  label: string;
  icon: IconType;
  onClick?: () => void;
  auth?: boolean;
  alert? : boolean
}
const SidebarItem: React.FC<SidebarProps> = ({
  href,
  icon: Icon,
  label,
  onClick,
  auth,
  alert
}) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();

  const handleClick = useCallback(() => {
    if (onClick) return onClick();
    if (auth && !currentUser) {
      loginModal.onOpen();
    } else if (href) {
      router.push(href);
    }
  }, [router, onClick, href, loginModal, auth]);

  return (
    <div onClick={handleClick} className="flex items-center">
      <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden">
        <Icon size={28} title={label} color="white" />
        {alert ? <BsDot size={70} className="text-sky-500 absolute -top-4 left-0" /> : ''} 
      </div>
      <div
        className="relative
      hidden lg:flex  gap-4 p-4 rounded-full cursor-pointer hover:bg-slate-300 hover:bg-cursor-pointer items-center hover:bg-opacity-10
      "
      >
        
        <Icon size={24} color="white" />
        <p className="text-white hidden  lg:block text-xl">{label}</p>
        {alert ? <BsDot size={70} className="text-sky-500 absolute -top-4 left-0" /> : ''} 
      </div>
    </div>
  );
};

export default SidebarItem;
