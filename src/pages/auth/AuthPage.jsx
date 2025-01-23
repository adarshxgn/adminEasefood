import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signInApi, signUpApi } from "../../services/allApi";

function AuthPage({ register }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [sellerCategory, setSellerCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setUsername("");
            setSellerCategory("");
        };
    }, [register]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (register) {
            if (!username || !email || !password || !confirmPassword || !sellerCategory) {
                toast.error("All fields are required.");
                setLoading(false);
                return;
            }
            if (password !== confirmPassword) {
                toast.error("Passwords do not match.");
                setLoading(false);
                return;
            }
        } else {
            if (!email || !password) {
                toast.error("Email and password are required.");
                setLoading(false);
                return;
            }
        }

        const payload = register
            ? { username, email, password1: password, password2: confirmPassword, seller_category: sellerCategory }
            : { username: email, password };

        try {
            const response = register ? await signUpApi(payload) : await signInApi(payload);

            if (response.status === 200 || response.status === 201) {
                if (!register) {
                    const { access_token, refresh_token, user } = response.data;

                    // Store tokens and user info in localStorage
                    localStorage.setItem("accessToken", access_token);
                    localStorage.setItem("refreshToken", refresh_token);
                    localStorage.setItem("user", JSON.stringify(user));

                    toast.success("Login successful!");
                    navigate("/dashboard"); // Redirect to dashboard after login
                } else {
                    toast.success("Signup successful!");
                    navigate("/"); // Redirect to login after signup
                }

                // Clear form fields
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setUsername("");
                setSellerCategory("");
            } else {
                toast.error(response.message || "An error occurred.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Network error: Please try again.");
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="flex min-h-screen w-full">
            <div
    className="hidden lg:flex items-center justify-center w-1/2 px-12 relative"
    style={{
        backgroundImage: `url('https://images.pexels.com/photos/2403391/pexels-photo-2403391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }}
>
    <div className="absolute inset-0 bg-black opacity-50"></div>

    <div className="relative max-w-md space-y-6 text-center text-white z-10">
    <h1 
        className="text-4xl font-extrabold tracking-tight" 
        style={{ textShadow: '2px 2px 4px black' }}
    >
        Welcome to <span className="text-orange-600">FoodEase</span>
    </h1>
    <p 
        className="text-xl" 
        
    >
        Join FoodEase to seamlessly manage your menu, orders, and categories all in one place.
    </p>
</div>

</div>





            <div className="flex flex-1 items-center justify-center bg-white px-4 py-8 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-md space-y-2 md:space-y-6">
                    <div className="text-center">
                        <h1 className="text-xl md:text-4xl font-bold tracking-tight text-black">
                            {register ? "Create a New Account" : "Login to Your Account"}
                        </h1>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {register && (
                            <>
                                <div>
                                    <label htmlFor="username" className="block text-sm font-medium text-black">
                                        Restaurant Name
                                    </label>
                                    <input
                                        type="text"
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="block w-full mt-1 rounded-md border px-3 py-2"
                                        placeholder="Enter your restaurant name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-black">
                                        Category
                                    </label>
                                    <select
                                        id="category"
                                        value={sellerCategory}
                                        onChange={(e) => setSellerCategory(e.target.value)}
                                        className="block w-full mt-1 rounded-md border px-3 py-2"
                                        required
                                    >
                                        <option value="" disabled>Select a category</option>
                                        <option value="Hotel">Hotel</option>
                                        <option value="Hospital Canteen">Hospital Canteen</option>
                                    </select>
                                </div>
                            </>
                        )}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-black">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full mt-1 rounded-md border px-3 py-2"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-black">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full mt-1 rounded-md border px-3 py-2"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        {register && (
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-black">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="block w-full mt-1 rounded-md border px-3 py-2"
                                    placeholder="Confirm your password"
                                    required
                                />
                            </div>
                        )}
                        <button
                            type="submit"
                            className={`w-full rounded-md py-2 h-12 text-sm font-medium ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-black hover:bg-blue-600"
                                } text-white`}
                            disabled={loading}
                        >
                            {loading ? "Please wait..." : register ? "Sign Up" : "Login"}
                        </button>
                    </form>
                    <p className="mt-2 text-gray-600">
                        {register ? (
                            <>
                                Already have an account? <Link to="/" className="text-blue-500">Login</Link>
                            </>
                        ) : (
                            <>
                                Don't have an account? <Link to="/register" className="text-blue-500">Sign Up</Link>
                            </>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;
