import React, { useState } from "react";
import { Card, CardHeader, CardBody, Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import authService from "../../../appwrite/auth";

export default function AdminLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isSignup, setIsSignup] = useState(false);

    
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            return toast.error("Please fill in all fields.");
        }

        try {
            const response = await authService.login({ email, password });
            localStorage.setItem('admin', JSON.stringify(response));
            toast.success("Login successful!");
            navigate('/dashboard'); 
        } catch (error) {
            toast.error(error.message || "Login failed.");
        }
    };

    
    const handleSignup = async (e) => {
        e.preventDefault();

        if (!email || !password || !name) {
            return toast.error("Please fill in all fields.");
        }


            const response = await authService.createAccount({ email, password, name });
            
            toast.success(response.message);

            setEmail('');
            setPassword('');
            setName('');
            setIsSignup(false); 
            const response2 = await authService.login({ email, password });
            localStorage.setItem('admin', JSON.stringify(response2));
            toast.success("Login successful!");
            navigate('/dashboard');
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-full max-w-[24rem]">
                <CardHeader
                    color="blue"
                    floated={false}
                    shadow={false}
                    className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
                >
                    <Typography variant="h4">
                        {isSignup ? "Admin Signup" : "Admin Login"}
                    </Typography>
                </CardHeader>
                <CardBody>
                    <form className="flex flex-col gap-4" onSubmit={isSignup ? handleSignup : handleLogin}>
                        {isSignup && (
                            <Input
                                type="text"
                                label="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        )}
                        <Input
                            type="email"
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Input
                            type="password"
                            label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Button type="submit">
                            {isSignup ? "Signup" : "Login"}
                        </Button>
                    </form>
                    <Typography
                        className="mt-4 text-center cursor-pointer"
                        onClick={() => setIsSignup(!isSignup)}
                    >
                        {isSignup
                            ? "Already have an account? Login"
                            : "Don't have an account? Signup"}
                    </Typography>
                </CardBody>
            </Card>
        </div>
    );
}










