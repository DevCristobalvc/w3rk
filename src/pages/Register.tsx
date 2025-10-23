import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="relative isolate px-6 py-24 sm:py-32 lg:px-8 min-h-screen bg-white text-gray-900 dark:bg-darkBg dark:text-white">
      <div aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#30b167] to-[#4dba78] opacity-25 sm:left-[calc(50%-20rem)] sm:w-[72rem]"
        />
      </div>

      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Crea tu cuenta
        </h2>
        <p className="mt-2 text-lg text-gray-900 dark:text-gray-400">
          Regístrate para acceder a nuestra plataforma y comenzar a explorar.
        </p>
      </div>

      <form action="#" method="POST"
        className="mx-auto mt-16 max-w-xl sm:mt-20 bg-black/5 dark:bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-xl"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-semibold text-gray-900 dark:text-white"
            >
              Nombre:
            </label>
            <div className="mt-2.5">
              <input
                id="first-name"
                name="first-name"
                type="text"
                autoComplete="given-name"
                placeholder="Juan"
                className="block w-full rounded-md bg-black/5 dark:bg-white/5 px-3.5 py-2 text-base text-white placeholder:text-gray-500 focus:outline-2 focus:outline-[#30b167]"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="last-name"
              className="block text-sm font-semibold text-gray-900 dark:text-white"
            >
              Apellido
            </label>
            <div className="mt-2.5">
              <input
                id="last-name"
                name="last-name"
                type="text"
                autoComplete="family-name"
                placeholder="Pérez"
                className="block w-full rounded-md bg-black/5 dark:bg-white/5 px-3.5 py-2 text-base text-white placeholder:text-gray-500 focus:outline-2 focus:outline-[#30b167]"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="company"
              className="block text-sm font-semibold text-gray-900 dark:text-white"
            >
              Empresa
            </label>
            <div className="mt-2.5">
              <input
                id="company"
                name="company"
                type="text"
                placeholder="Ej. Mágica Escultura"
                className="block w-full rounded-md bg-black/5 dark:bg-black/5 px-3.5 py-2 text-base text-white placeholder:text-gray-500 focus:outline-2 focus:outline-[#30b167]"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-900 dark:text-white"
            >
              Correo electrónico
            </label>
            <div className="mt-2.5">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="correo@ejemplo.com"
                className="block w-full rounded-md bg-black/5 dark:bg-white/5 px-3.5 py-2 text-base text-white placeholder:text-gray-500 focus:outline-2 focus:outline-[#30b167]"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="phone-number"
              className="block text-sm font-semibold text-gray-900 dark:text-white"
            >
              Número de teléfono
            </label>
            <div className="mt-2.5">
              <div className="flex rounded-md bg-black/5 dark:bg-white/5 outline-1 outline-white/10">
                <div className="relative grid shrink-0 grid-cols-1">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country"
                    aria-label="Country"
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-transparent py-2 pr-7 pl-3.5 text-base text-gray-400 focus:outline-2 focus:outline-[#30b167]"
                  >
                    <option>🇺🇸 US</option>
                    <option>🇨🇦 CA</option>
                    <option>🇨🇴 CO</option>
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-400"
                  />
                </div>
                <input
                  id="phone-number"
                  name="phone-number"
                  type="text"
                  placeholder="123-456-7890"
                  className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 space-y-4">
          <button
            type="submit"
            className="block w-full rounded-md bg-[#30b167] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-[#4dba78] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#30b167]"
          >
            Crear cuenta
          </button>

          <div className="flex items-center justify-center text-sm text-gray-400">
            <div className="h-px w-20 bg-gray-600 mr-3" />
            o
            <div className="h-px w-20 bg-gray-600 ml-3" />
          </div>

          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-md border border-gray-500 bg-black/5 dark:bg-white/5 px-3.5 py-2.5 text-sm font-semibold text-gray-900 dark:text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#30b167]"
          >
            <FcGoogle className="text-xl" />
            Registrarse con Google
          </button>

          <p className="text-center text-sm text-gray-400 mt-4">
            ¿Ya tienes una cuenta?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#30b167] hover:text-[#4dba78]"
            >
              Iniciar sesión
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
