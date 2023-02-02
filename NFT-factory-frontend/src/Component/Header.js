import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function Header() {
  return (
    <div className="flex items-center justify-end pt-5 mr-10">
      <ConnectButton />
    </div>
  );
}

export default Header;
