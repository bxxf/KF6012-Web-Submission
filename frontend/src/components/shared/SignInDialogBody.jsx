/**
 * This component renders the sign in dialog body.
 * It is used in SignInDialog.jsx.
 * @author Filip Brebera w21020340
 * @param {object} param0
 * @param {function} param0.setLoading
 * @param {function} param0.setError
 * @param {function} param0.setIsOpen
 * @param {string} param0.error
 * @param {boolean} param0.loading
 */

import { useLogin } from "@hooks/useLogin";
import { useNavigate } from "@tanstack/react-router";

export default function SignInDialogBody({
  setLoading,
  setError,
  setIsOpen,
  error,
  loading,
}) {
  const signIn = (e) => {
    const { login } = useLogin();
    // prevent default form submission and handle login
    e.preventDefault();
    setLoading(true);
    setError(null);
    login(e.target.email.value, e.target.password.value)
      .then((res) => {
        if (res) {
          setIsOpen(false);
        } else {
          setError("Invalid Credentials.");
        }
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        setError("Invalid credentials");
      });
  };

  const navigate = useNavigate();

  return (
    <>
      <h1 className="text-3xl mb-2 font-bold">Sign In</h1>
      <h2 className="text-gray-700 text-sm">
        You need to sign in to use note-taking features.
      </h2>

      <form onSubmit={signIn}>
        <label className="mt-6 block">
          <span className="text-xs text-gray-700 font-bold uppercase">
            Email:
          </span>
          <input
            type="email"
            name="email"
            className="w-full border-[1px] border-gray-200 rounded-lg py-3 px-4 mt-1"
          />
        </label>
        <label className="mt-3 block">
          <span className="text-xs text-gray-700 font-bold uppercase">
            Password:
          </span>
          <input
            type="password"
            name="password"
            className="w-full border-[1px] border-gray-200 rounded-lg py-3 px-4 mt-1"
          />
        </label>
        <div className="relative">
          {error && (
            <p className="text-red-500 text-sm mt-3 absolute">{error}</p>
          )}
        </div>
        <button
          type="submit"
          className={`w-full bg-black text-white font-bold rounded-lg py-3 mt-12 h-14 flex items-center justify-center text-center transition-all ${
            loading && "cursor-not-allowed bg-gray-400"
          } `}
          disabled={loading}
        >
          {loading ? (
            <div className="animate-spin w-8 h-8 border-4 border-t-blue-300 border-white rounded-full"></div>
          ) : (
            <span>Sign In</span>
          )}
        </button>
      </form>
    </>
  );
}
