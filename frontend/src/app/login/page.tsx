"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const response: Response = await fetch("http://localhost:3060/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      alert("Inicio de sesión");
      sessionStorage.setItem("token", data.token); 
      sessionStorage.setItem("name", data.user.name);
      sessionStorage.setItem("id", data.user.id);
      const token = sessionStorage.getItem("token");
      if (token) {
        router.push("/home"); 
      } else {
        alert("No estás autenticado."); 
      }
    } else {
      if (
        confirm(
          "Datos inválidos, revisa que estén correctos o si no estás registrado\n\n ¿Quieres registrarte?"
        )
      ) {
        window.location.href = "/register"; 
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
