import {
  Disclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { BellIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type AuthUser = {
  name: string;
  email: string;
  avatarUrl?: string;
};

export default function ProfileMenu() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();

  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("authUser");
    setUser(raw ? (JSON.parse(raw) as AuthUser) : null);

    const onStorage = (e: StorageEvent) => {
      if (e.key === "authUser") {
        setUser(e.newValue ? (JSON.parse(e.newValue) as AuthUser) : null);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("authUser");
    setUser(null);
    navigate("/"); 
  };

  return (
    <Disclosure as="nav">
      <div className="flex items-center">
        <button
          type="button"
          className={`relative rounded-full p-1 transition ${
            isDark
              ? "text-gray-600 dark:text-gray-400 hover:text-gray-300"
              : "text-gray-600 hover:text-black"
          }`}
        >
          <span className="absolute -inset-1.5" />
          <span className="sr-only">{t("menu.notifications")}</span>
          <BellIcon aria-hidden="true" className="size-6" />
        </button>

        <Menu as="div" className="relative ml-4 mr-3">
          <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
            <span className="absolute -inset-1.5" />
            <span className="sr-only">{t("menu.profile")}</span>

            {user?.avatarUrl ? (
              <img
                alt={`${user.name || "User"} avatar`}
                src={user.avatarUrl}
                className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
              />
            ) : (
              <UserCircleIcon className="size-8 text-gray-400" />
            )}
          </MenuButton>

          <MenuItems
            transition
            className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md py-1 shadow-lg ring-1 ring-black/5 focus:outline-none
              bg-white dark:bg-[#0f0f0f]
              text-gray-700 dark:text-gray-100
              data-closed:scale-95 data-closed:transform data-closed:opacity-0
              data-enter:duration-100 data-enter:ease-out
              data-leave:duration-75 data-leave:ease-in`}
          >
            {user ? (
              <>
                <MenuItem as={Link}
                  to="/profile"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
                >
                  {t("menu.profile")}
                </MenuItem>
                <MenuItem as={Link}
                  to="/settings"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
                >
                  {t("menu.settings")}
                </MenuItem>
                <MenuItem as="button"
                  onClick={handleSignOut}
                  className="w-full text-left block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
                >
                  {t("menu.sign_out")}
                </MenuItem>
              </>
            ) : (
              <MenuItem as={Link}
                to="/login"
                className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
              >
                {t("menu.sign_in")}
              </MenuItem>
            )}
          </MenuItems>
        </Menu>
      </div>
    </Disclosure>
  );
}
