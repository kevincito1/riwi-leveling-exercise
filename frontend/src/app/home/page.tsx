'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Iposts } from '../interfaces/GlobalInterfaces';

const HomePage: React.FC = () => { // Tipar el componente
	const router = useRouter();

	const handleLogout = (): void => { // Tipar la función
		sessionStorage.removeItem('token'); 
		sessionStorage.removeItem('name');
		sessionStorage.removeItem('id');
		router.push('/login'); 
	};

	useEffect(() => {
		const token: string | null = sessionStorage.getItem('token'); // Tipar la constante
		if (!token) {
			router.push('/login'); 
		}
	}, [router]);

	const name: string | null = sessionStorage.getItem('name'); // Tipar la constante

	const handleSubmit = async (): Promise<void> => { // Tipar la función
		const response: Response = await fetch("http://localhost:3060/api/posts");
		const data: { posts: Iposts [] } = await response.json();
		setPosts(data.posts); 
	};

	const [posts, setPosts] = useState<{ id?: number; title: string; description: string; user_id?: number }[]>([]); 

	const handleNewPost = (): void => { // Tipar la función
		router.push('/posts')
	}

	return (
		<div>
			<h1>hola bienvenido {name}</h1>
			<button onClick={handleLogout}>Cerrar Sesión</button> 
			<button onClick={handleSubmit}>Ver Posts</button>
			<button onClick={handleNewPost}>Crear un Nuevo Post</button>
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