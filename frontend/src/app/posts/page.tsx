"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

const PostsPage: React.FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const id_user: number = parseInt(sessionStorage.getItem("id") || "0"); // Proporcionar un valor por defecto

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    console.log({ title, description, id_user });
    const response: Response = await fetch("http://localhost:3060/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, id_user }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      alert("Post creado Exitosamente");
    }

    setTitle("");
    setDescription("");
  };

  const handleReturn = (): void => {
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
        <button type="button" onClick={handleReturn}>Regresar a Home</button>
      </form>      
    </>
  );
};

export default PostsPage;
