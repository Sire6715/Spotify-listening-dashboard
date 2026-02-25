'use client';
import Button from "../common/Button"

export default function LoginPage() {
  const handleLogin = () => {
    window.location.href = "http://127.0.0.1:5000/login";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Welcome to My Spotify App</h1>
      <Button style="bg-green-500 text-white font-bold text-4xl hover:bg-green-600 transition-all py-12 px-30 rounded-full text-white" onClick={handleLogin} text={"Login with Spotify"}/>
    </div>
  );
}
