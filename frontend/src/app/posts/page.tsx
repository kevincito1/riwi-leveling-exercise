"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const PostsPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const id_user = parseInt(sessionStorage.getItem("id") || "0"); // Proporcionar un valor por defecto
  console.log(typeof(id_user))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Valores enviados:", { title, description, id_user });
    const response = await fetch("http://localhost:3060/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, id_user }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      alert("Post creado Exitosamente")
    }

    setTitle("");
    setDescription("");
  };
  const handleReturn = () => {
    router.push("/home");
  }; 

  return (
    <>
      <h1>posts</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Post"
          maxLength={150}
          required
        />
        <button type="submit">Crear Post</button>
      </form>
      <button onClick={handleReturn}>Regresar a Home</button>
    </>
  );
};

export default PostsPage;
