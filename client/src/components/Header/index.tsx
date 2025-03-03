import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Button, Input } from "@headlessui/react";

import MobileDialog from "./MobileDialog";

import { useAuth } from "../../contexts/auth/hooks";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, signIn, logout } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = e.currentTarget.elements as
      & typeof e.currentTarget.elements
      & {
        email: HTMLInputElement;
        password: HTMLInputElement;
      };

    signIn(email.value, password.value);
  };

  return (
    <header className="bg-white border-b">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <Link
          to="/"
          className="flex items-center space-x-2 lg:flex-1 -m-1.5 p-1.5"
        >
          <span className="sr-only">Your Company</span>
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt=""
          />
          <h1 className="font-bold text-2xl">Utube</h1>
        </Link>
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
        {user
          ? (
            <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:space-x-6">
              <p>
                Welcome <span className="font-semibold">{user.email}</span>
              </p>

              <Link
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
                to="/share"
              >
                Share a video <span aria-hidden="true">&rarr;</span>
              </Link>

              <Button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={logout}
              >
                Log out <span aria-hidden="true">&rarr;</span>
              </Button>
            </div>
          )
          : (
            <form
              className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:space-x-6"
              onSubmit={handleSubmit}
            >
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
                minLength={6}
                required
              />
              <Button
                type="submit"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Log in / Register <span aria-hidden="true">&rarr;</span>
              </Button>
            </form>
          )}
      </nav>
      <div className="lg:hidden">
        <MobileDialog open={mobileMenuOpen} setOpen={setMobileMenuOpen} />
      </div>
    </header>
  );
};

export default Header;
