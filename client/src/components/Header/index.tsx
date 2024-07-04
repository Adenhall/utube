import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Button, Input } from "@headlessui/react";

import MobileDialog from "./MobileDialog";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <form className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:space-x-6">
          <Input
            className="p-2 border rounded-lg"
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            required
          />
          <Input
            className="p-2 border rounded-lg"
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            required
          />
          <Button
            type="submit"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Log in / Register <span aria-hidden="true">&rarr;</span>
          </Button>
        </form>
      </nav>
      <div className="lg:hidden">
        <MobileDialog open={mobileMenuOpen} setOpen={setMobileMenuOpen} />
      </div>
    </header>
  );
};

export default Header;
