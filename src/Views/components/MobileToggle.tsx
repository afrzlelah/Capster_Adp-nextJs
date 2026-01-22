import { Menu, X } from "lucide-react";
import { useState } from "react";

const MobileToggle = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <button
      className="md:hidden p-2 rounded-xl bg-slate-100/10 backdrop-blur-md"
      onClick={() => setIsMenuOpen(!isMenuOpen)}
    >
      {isMenuOpen ? (
        <X size={28} className="text-slate-900" />
      ) : (
        <Menu size={28} className={"text-slate-900"} />
      )}
    </button>
  );
};

export default MobileToggle;
