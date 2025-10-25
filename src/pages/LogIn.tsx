import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const CORREO_DEMO = "juanjoseobrrero95@gmail.com";
  const PASSWORD_DEMO = "123456";

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      if (email.trim().toLowerCase() === CORREO_DEMO && pwd === PASSWORD_DEMO) {
        navigate("/profile");
      } else {
        setError("Correo o contraseña incorrectos.");
      }
      setLoading(false);
    }, 400);
  };

  const handleGoogle = () => {
    navigate("/profile");
  };

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
          Inicia sesión
        </h2>
        <p className="mt-2 text-lg text-gray-700 dark:text-gray-400">
          Accede a tu cuenta para continuar explorando nuestra plataforma.
        </p>
      </div>

      <form onSubmit={handleSubmit}
        className="mx-auto mt-16 max-w-xl sm:mt-20 bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-xl"
      >
        <div className="space-y-6">
          <div>
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
                placeholder="correo@ejemplo.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md bg-black/5 dark:bg-white/5 px-3.5 py-2 text-base text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-2 focus:outline-[#30b167]"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-900 dark:text-white"
            >
              Contraseña
            </label>
            <div className="mt-2.5">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="************"
                autoComplete="current-password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                className="block w-full rounded-md bg-black/5 dark:bg-white/5 px-3.5 py-2 text-base text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-2 focus:outline-[#30b167]"
              />
            </div>
          </div>

          {error && (
            <div className="text-sm font-medium text-red-500 bg-red-500/10 border border-red-500/30 rounded-md px-3 py-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-[#30b167] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-[#4dba78] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#30b167] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Ingresando..." : "Iniciar sesión"}
          </button>

          <div className="flex items-center justify-center text-sm text-gray-400">
            <div className="h-px w-20 bg-gray-600 mr-3" />
            o
            <div className="h-px w-20 bg-gray-600 ml-3" />
          </div>

          <button
            type="button"
            onClick={handleGoogle}
            className="flex w-full items-center justify-center gap-3 rounded-md border border-gray-500 bg-white/5 px-3.5 py-2.5 text-sm font-semibold text-gray-900 dark:text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#30b167]"
          >
            <FcGoogle className="text-xl" />
            Iniciar sesión con Google
          </button>

          <div className="flex justify-between items-center mt-4 text-sm text-gray-500 dark:text-gray-400">
            <Link to="/forgot-password" className="hover:text-[#4dba78] font-medium">
              ¿Olvidaste tu contraseña?
            </Link>
            <Link to="/register" className="font-semibold text-[#30b167] hover:text-[#4dba78]">
              Registrarse
            </Link>
          </div>
        </div>
      </form>

      <div className="mx-auto max-w-xl mt-6 text-xs text-gray-600 dark:text-gray-400 text-center">
        <p>Prueba con: 
            <code className="font-mono">
                correo: {`"${CORREO_DEMO}"`}</code> • <code className="font-mono">password: {`"${PASSWORD_DEMO}"`}</code></p>
      </div>
    </div>
  );
}
