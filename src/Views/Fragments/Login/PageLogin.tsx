"use client";

import React, { useRef, useState } from "react";
import { LogIn, Mail, Lock, User, Github, Chrome, X, Info } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const PageLogin = () => {
  const router = useRouter();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // State untuk modal kustom pengganti SweetAlert (menghindari error "could not resolve")
  const [modal, setModal] = useState({
    show: false,
    title: "",
    text: "",
    type: "info",
  });

  const showModal = (title: string, text: string, type = "info") => {
    setModal({ show: true, title, text, type });
  };

  const closeModal = () => {
    setModal({ show: false, title: "", text: "", type: "info" });
  };

  const handleNotFitur = () => {
    showModal(
      "Fitur belum tersedia",
      "Kami sedang mengerjakan fitur ini untuk meningkatkan pengalaman Anda!",
    );
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: usernameRef.current!.value,
          password: passwordRef.current!.value,
        }),
      });

      const response = await res.json();
      console.log(response);

      if (res.ok) {
        if (response.data.role === "admin") {
          router.push("/dashboard/admin-toko");
        } else {
          router.push("/register");
        }
        showModal("Berhasil", "Login berhasil! Mengalihkan ke dashboard...");
      } else {
        showModal(
          "Error",
          response.message || "Gagal masuk. Periksa kembali kredensial Anda.",
          "error",
        );
      }
    } catch (err) {
      showModal(
        "Koneksi Gagal",
        "Tidak dapat terhubung ke server. Silakan coba lagi nanti.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4 py-12 transition-colors duration-300 relative">
      {/* Custom Modal Component */}
      {modal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 transform animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-4">
              <div
                className={`p-2 rounded-lg ${modal.type === "error" ? "bg-red-100 dark:bg-red-500/20" : "bg-indigo-100 dark:bg-indigo-500/20"}`}
              >
                <Info
                  className={`w-6 h-6 ${modal.type === "error" ? "text-red-600 dark:text-red-400" : "text-indigo-600 dark:text-indigo-400"}`}
                />
              </div>
              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              {modal.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              {modal.text}
            </p>
            <button
              onClick={closeModal}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/25"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl shadow-indigo-500/10 p-8 border border-slate-200 dark:border-slate-800">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl mb-4 border border-indigo-100 dark:border-indigo-500/20">
              <LogIn className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Welcome back
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
              Sign in to your account
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 ml-1"
              >
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  ref={usernameRef}
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
                  placeholder="Your Username"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2 ml-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-slate-700 dark:text-slate-300"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={handleNotFitur}
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  ref={passwordRef}
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center ml-1">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded transition-all"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-slate-600 dark:text-slate-400"
              >
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-xl font-bold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/40 transform active:scale-[0.98] transition-all duration-200 mt-2"
            >
              Sign in
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
                <span className="px-3 bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={handleNotFitur}
                className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm bg-white dark:bg-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                <Chrome className="w-5 h-5 mr-2 text-red-500" />
                Google
              </button>
              <button
                type="button"
                onClick={handleNotFitur}
                className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm bg-white dark:bg-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                <Github className="w-5 h-5 mr-2 text-slate-900 dark:text-white" />
                Github
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 underline-offset-4 hover:underline transition-all"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
