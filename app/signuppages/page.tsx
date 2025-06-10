"use client"

import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

// --- TYPE DEFINITIONS ---
interface NotificationState {
    message: string;
    type: 'success' | 'error';
}

interface AxiosErrorResponse {
    message: string;
}

// --- MOCK ROUTER ---
const mockRouter = {
  push: (path: string) => console.log(`Redirecting to ${path}`),
};

// --- NOTIFICATION COMPONENT ---
const Notification = ({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void }) => {
    const baseClasses = "fixed top-5 right-5 p-4 rounded-lg text-white shadow-lg z-50 transition-transform transform";
    const typeClasses = type === 'success' ? 'bg-green-500' : 'bg-red-500';
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true); // Animate in
        const timer = setTimeout(() => {
            setVisible(false); // Animate out
            setTimeout(onClose, 300); // Call onClose after animation
        }, 5000);

        return () => clearTimeout(timer);
    }, [message, type, onClose]);

    return (
        <div className={`${baseClasses} ${typeClasses} ${visible ? 'translate-x-0' : 'translate-x-[120%]'}`}>
            {message}
            <button onClick={onClose} className="bg-transparent border-none text-white float-right ml-4 text-xl cursor-pointer font-bold leading-none">&times;</button>
        </div>
    );
};


// --- MAIN APP COMPONENT ---
const App = () => {
    // --- STATE MANAGEMENT ---
    const BACKEND_URL = '/mock-api'; // Mock URL, replace with your actual backend URL
    const router = mockRouter;
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState<NotificationState | null>(null);

    // --- HANDLERS ---
    const handleToggle = () => {
        setIsLogin(!isLogin);
        setNotification(null); // Clear notification on toggle
        setFormData({ username: '', email: '', password: '' }); // Clear form data
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setNotification(null);

        try {
            const url = isLogin
                ? `${BACKEND_URL}/api/v1/auth/user/signin`
                : `${BACKEND_URL}/api/v1/auth/user/signup`;
            
            const payload = isLogin ? { email: formData.email, password: formData.password } : formData;

            // Using the real axios library now
            const { data } = await axios.post(url, payload, { withCredentials: true });

            setNotification({
                message: isLogin ? 'Login successful! Redirecting...' : 'Signup successful! Please login.',
                type: 'success'
            });

            if (isLogin) {
                setTimeout(() => router.push('/dashboard'), 2000);
            } else {
                setTimeout(() => handleToggle(), 2000);
            }
        } catch (err) {
            // Handle axios error object with types
            const error = err as AxiosError<AxiosErrorResponse>;
            setNotification({
                message: error.response?.data?.message || 'An unexpected error occurred.',
                type: 'error',
            });
        } finally {
            setLoading(false);
        }
    };

    // --- RENDER ---
    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-400 font-sans p-4">
            {/* We need a style tag for properties not supported by Tailwind out-of-the-box */}
            <style>{`
              .preserve-3d { transform-style: preserve-3d; }
              .perspective { perspective: 1000px; }
              .backface-hidden { backface-visibility: hidden; }
              .rotate-y-180 { transform: rotateY(180deg); }
            `}</style>
            
            {notification && (
              <Notification
                  message={notification.message}
                  type={notification.type}
                  onClose={() => setNotification(null)}
              />
            )}

            <div className="relative perspective w-full max-w-sm h-[480px]">
                {/* Toggle Switch */}
                <label className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-2.5 text-white cursor-pointer font-semibold">
                    <span>Log In</span>
                    <div className="relative">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={!isLogin}
                            onChange={handleToggle}
                        />
                        <div className="w-14 h-8 bg-black/30 rounded-full peer-checked:bg-cyan-400 transition-colors"></div>
                        <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                    </div>
                    <span>Sign Up</span>
                </label>

                {/* Flipping Card Inner Container */}
                <div className={`relative w-full h-full preserve-3d transition-transform duration-700 ease-in-out ${!isLogin ? 'rotate-y-180' : ''}`}>
                    
                    {/* Front Side: Login */}
                    <div className="absolute w-full h-full backface-hidden p-8 flex flex-col justify-center items-center rounded-2xl border border-white/20 bg-white/10 shadow-lg backdrop-blur-md">
                        <h2 className="text-4xl font-bold text-white mb-6">Log In</h2>
                        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
                            <input
                                className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:bg-white/30 focus:ring-2 focus:ring-cyan-400 transition"
                                name="email"
                                placeholder="Email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <input
                                className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:bg-white/30 focus:ring-2 focus:ring-cyan-400 transition"
                                name="password"
                                placeholder="Password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <button
                                className="w-full p-3 mt-2 rounded-lg bg-pink-500 text-white font-semibold cursor-pointer transition-all hover:bg-pink-600 hover:shadow-lg hover:shadow-pink-500/50 disabled:bg-gray-400/50 disabled:cursor-not-allowed"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Logging in...' : "Let's go!"}
                            </button>
                        </form>
                    </div>

                    {/* Back Side: Signup */}
                    <div className="absolute w-full h-full backface-hidden rotate-y-180 p-8 flex flex-col justify-center items-center rounded-2xl border border-white/20 bg-white/10 shadow-lg backdrop-blur-md">
                        <h2 className="text-4xl font-bold text-white mb-6">Sign Up</h2>
                        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
                            <input
                                className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:bg-white/30 focus:ring-2 focus:ring-cyan-400 transition"
                                name="username"
                                placeholder="Username"
                                type="text"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                             <input
                                className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:bg-white/30 focus:ring-2 focus:ring-cyan-400 transition"
                                name="email"
                                placeholder="Email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <input
                                className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:bg-white/30 focus:ring-2 focus:ring-cyan-400 transition"
                                name="password"
                                placeholder="Password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <button
                                className="w-full p-3 mt-2 rounded-lg bg-cyan-500 text-white font-semibold cursor-pointer transition-all hover:bg-cyan-600 hover:shadow-lg hover:shadow-cyan-500/50 disabled:bg-gray-400/50 disabled:cursor-not-allowed"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Signing up...' : 'Confirm!'}
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};


