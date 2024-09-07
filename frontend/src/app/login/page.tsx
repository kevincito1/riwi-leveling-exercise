"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3060/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      alert("Inicio de sesión");
      sessionStorage.setItem("token", data.token); // Almacena el token
      const token = sessionStorage.getItem("token");
      if (token) {
        router.push("/home"); // Redirige si el token existe
      } else {
        alert("No estás autenticado."); // Mensaje de error si no hay token
      }
    } else {
      if (
        confirm(
          "Datos inválidos, revisa que estén correctos o si no estás registrado\n\n ¿Quieres registrarte?"
        )
      ) {
        window.location.href = "/register"; // Redirige a la página de registro
      }
    }

    setEmail("");
    setPassword("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
      <Link href={"/register"}>
        <h6>Aun no tienes una cuenta?, Regístrate</h6>
      </Link>
    </>
  );
};

export default LoginPage;
