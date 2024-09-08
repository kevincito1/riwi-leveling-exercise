'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
	const router = useRouter();

	const handleLogout = () => {
		sessionStorage.removeItem('token'); // Eliminar el token
		sessionStorage.removeItem('name');
		sessionStorage.removeItem('id');
		router.push('/login'); // Redirigir a la página de login
	};

	useEffect(() => {
		const token = sessionStorage.getItem('token');
		if (!token) {
			router.push('/login'); // Redirigir si no hay token
		}
	}, [router]);

	const name = sessionStorage.getItem('name');

	const handleSubmit = async () => {
		const response = await fetch("http://localhost:3060/api/posts");
		const data = await response.json();
		setPosts(data.posts); // Guardar los posts en el estado
		
	};

	const [posts, setPosts] = useState<{ id: number; title: string; description: string; user_id?: number }[]>([]); // Definir tipo para los posts

	const handleNewPost = () => {
		router.push('/posts')
	}

	return (
		<div>
			<h1>hola bienvenido {name}</h1>
			<button onClick={handleLogout}>Cerrar Sesión</button> 
			<button onClick={handleSubmit}>Ver Posts</button>
			<button onClick = {handleNewPost}>Crear un Nuevo Post</button>
			<div>
				{posts.map((post) => (
					<div key={post.id} className="card"> 
						<h2>{post.title}</h2>
						<p>{post.description}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default HomePage;