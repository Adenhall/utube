import { Button, Dialog, DialogPanel, Input } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const MobileDialog = ({ open, setOpen }: Props) => {
  return (
    <Dialog
      className="lg:hidden"
      open={open}
      onClose={setOpen}
    >
      <div className="fixed inset-0 z-10" />
      <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
            onClick={() => setOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <form className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              <div className="flex flex-col space-y-2">
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
              </div>
            </div>
            <div className="py-6">
              <Button
                type="submit"
                className="border -mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                Log in / Register
              </Button>
            </div>
          </form>
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default MobileDialog;
