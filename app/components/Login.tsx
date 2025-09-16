"use client";
import React, { useState } from "react";
import { useLoginMutation, useGetProfileQuery, useLogoutMutation, type responseLogin } from "@/services/authApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export default function LoginPage() {
   const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, error }] = useLoginMutation();
  const { data: user } = useGetProfileQuery();
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault(); 
  try {
    const res = await login({ cx_email:email, cx_password:password }).unwrap();
    setMessage(res.message); // lo guardas por si lo quieres mostrar en UI

    if (res.success) {
      toast.success(res.message); // 👈 usar directo la respuesta
      router.push('/dashboard');
    } else {
      toast.error(res.message);
    }
  } catch (err) {
    toast.error(err?.data?.message || "Error al iniciar sesión");
  }
};


  if (user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-xl font-semibold mb-4">Bienvenido {user.email}</h2>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Iniciar Sesión
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4">
            Credenciales inválidas, intenta de nuevo.
          </p>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isLoading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}

