import { useState } from "react";
import { supabase } from "../supabase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (!email || !password) return setErrorMsg("Please enter both email and password");
    
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setErrorMsg(error.message);
    } else {
      alert("Account created successfully! Logging you in...");
      window.location.href = "/";; // Home page par bhejo
    }
    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (!email || !password) return setErrorMsg("Please enter both email and password");
  
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setErrorMsg(error.message);
    } else {
      window.location.href = "/"; // Login hote hi Home page par wapas bhejo
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0b0b13] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#12121a] p-8 rounded-2xl border border-slate-800 shadow-2xl">
        <h2 className="text-3xl font-extrabold text-white mb-2 text-center">Welcome Back</h2>
        <p className="text-slate-400 text-center mb-8">Login to save your favorite movies</p>

        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-2 rounded-lg mb-6 text-sm text-center">
            {errorMsg}
          </div>
        )}

        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-slate-400 text-sm font-bold mb-2">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-slate-400 text-sm font-bold mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <div className="flex gap-4 mt-4">
            <button 
              onClick={handleLogin}
              disabled={loading}
              className="flex-1 bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-4 rounded-xl transition-colors disabled:opacity-50"
            >
              {loading ? "Please wait..." : "Login"}
            </button>
            <button 
              onClick={handleSignUp}
              disabled={loading}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-4 rounded-xl transition-colors disabled:opacity-50"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;