'use client'

import Container from "../Container";
import { Button } from "../ui/button";
import Logo from "./Logo";


const Navbar = () => {
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
              <Button variant="secondary">
                Login
              </Button>
              <Button variant="secondary">
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