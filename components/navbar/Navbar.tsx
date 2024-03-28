'use client'

import Container from "../Container";
import { Button } from "../ui/button";
import Logo from "./Logo";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";


const Navbar = () => {

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div
        className="
          py-2 
          border-b-[1px]
        "
      >
        <Container>
          <div
            className="
            flex 
            flex-row 
            items-center 
            justify-between
            gap-3
            md:gap-0
          "
          >
            <Logo />
            <div className=" flex gap-x-3">
              <Button variant="secondary" onClick={loginModal.onOpen}>
                Login
              </Button>
              <Button variant="secondary" onClick={registerModal.onOpen}>
                Sign Up
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}


export default Navbar;