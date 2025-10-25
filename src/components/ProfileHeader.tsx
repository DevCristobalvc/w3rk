import {
  Disclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { Link } from "react-router-dom";

export default function ProfileMenu() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Disclosure as="nav">
      <div className="flex items-center">
        {/* Botón de notificaciones */}
        <button
          type="button"
          className={`relative rounded-full p-1 transition  ${
            isDark
              ? "text-gray-600 dark:text-gray-400 hover:text-gray-900"
              : "text-gray-600 hover:text-black"
          }`}
        >
          <span className="absolute -inset-1.5" />
          <span className="sr-only">{t("menu.notifications")}</span>
          <BellIcon aria-hidden="true" className="size-6" />
        </button>

        {/* Menú del usuario */}
        <Menu as="div" className="relative ml-4 mr-3">
          <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
            <span className="absolute -inset-1.5" />
            <span className="sr-only">{t("menu.profile")}</span>
            <img
              alt="User avatar"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
            />
          </MenuButton>

          {/* Menú desplegable */}
          <MenuItems
            transition
            className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md py-1 shadow-lg ring-1 ring-black/5 focus:outline-none
              bg-white dark:bg-[#91e68b]
              text-gray-700 dark:text-black font-semibold
              data-closed:scale-95 data-closed:transform data-closed:opacity-0
              data-enter:duration-100 data-enter:ease-out
              data-leave:duration-75 data-leave:ease-in`}
          >
            <MenuItem as={Link} to="/profile"
              className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              {t("menu.profile")}
            </MenuItem>

            <MenuItem>
              <a
                href="#"
                className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                {t("menu.settings")}
              </a>
            </MenuItem>
            
            <MenuItem as={Link} to="/register"
              className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              {t("menu.sign_in")}
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </Disclosure>
  );
}
