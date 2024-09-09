'use client'

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

const RegisterPage: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const response = await fetch("http://localhost:3060/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            alert("Registro exitoso: " + data.message);
            router.push("/login");
        } else {
            alert("Error en el registro: ");
        }

        setName('');
        setEmail('');
        setPassword('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Nombre" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
            />
            <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
            />
            <input 
                type="password" 
                placeholder="Contraseña" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
            />
            <button type="submit">Registrar</button>
        </form>
    );
};

export default RegisterPage;