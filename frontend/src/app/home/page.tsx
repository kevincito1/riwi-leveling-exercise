'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
	const router = useRouter();

	const handleLogout = () => {
		sessionStorage.removeItem('token'); // Eliminar el token
		router.push('/login'); // Redirigir a la página de login
	};

	useEffect(() => {
		const token = sessionStorage.getItem('token');
		if (!token) {
			router.push('/login'); // Redirigir si no hay token
		}
	}, [router]);

	return (
		<div>
			<h1>home</h1>
			<button onClick={handleLogout}>Cerrar Sesión</button> {/* Botón de logout */}
		</div>
	);
};

export default HomePage;