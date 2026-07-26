import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabase";

const Navbar = () => {
  const [textval, setTextval] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  function handleSearch(e) {
    e.preventDefault();
    if (!textval.trim()) return;
    navigate(`/search?query=${textval}`);
    setTextval('');
  }

  return (
    <nav className="w-full bg-[#0b0b13] border-b border-slate-800">
      {/* Flex-col for mobile (2 rows), Flex-row for desktop (1 row) */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-center py-3 max-w-[1600px] mx-auto gap-4 px-4">
        
        {/* ROW 1 (Mobile): Logo + Buttons */}
        <div className="w-full flex justify-between items-center sm:w-auto">
          <Link to="/" className="text-2xl font-bold tracking-wider text-yellow-400 whitespace-nowrap">
            🎬 CineNexus
          </Link>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <Link 
              to="/watchlist" 
              className="bg-purple-600 hover:bg-purple-500 text-white font-bold p-2.5 sm:py-2 sm:px-4 rounded-md flex items-center justify-center transition-all shadow-lg shadow-purple-900/50"
              title="Watchlist"
            >
              {/* Mobile par icon dikhega, Desktop par text */}
              <span className="text-lg leading-none sm:hidden">🔖</span>
              <span className="hidden sm:block">Watchlist</span>
            </Link>

            {user ? (
              <button 
                onClick={handleLogout}
                className="bg-red-600/90 hover:bg-red-500 text-white font-bold p-2.5 sm:py-2 sm:px-4 rounded-md transition-colors border border-red-500/50 flex items-center justify-center cursor-pointer"
                title="Logout"
              >
                <span className="text-lg leading-none sm:hidden">🚪</span>
                <span className="hidden sm:block">Logout</span>
              </button>
            ) : (
              <Link 
                to="/login"
                className="bg-green-600 hover:bg-green-500 text-white font-bold p-2.5 sm:py-2 sm:px-5 rounded-md transition-colors flex items-center justify-center"
                title="Login"
              >
                <span className="text-lg leading-none sm:hidden">👤</span>
                <span className="hidden sm:block">Login</span>
              </Link>
            )}
          </div>
        </div>

        {/* ROW 2 (Mobile): Search Bar */}
        <div className="w-full sm:flex-1 sm:max-w-xl lg:max-w-2xl flex justify-end">
          <form onSubmit={handleSearch} className="flex w-full gap-2">
            <input 
              className="flex-1 text-purple-100 bg-purple-400/10 px-4 py-2 rounded-md focus:outline-none border-2 border-purple-600 transition-all w-full " 
              type="text"
              value={textval}
              onChange={(e) => setTextval(e.target.value)} 
              placeholder="Search for a movie..."
            />
            <button 
              type="submit" 
              className="bg-yellow-500 text-slate-900 font-bold px-5 py-2 rounded-md hover:bg-yellow-400 transition-colors whitespace-nowrap cursor-pointer"
            >
              Search
            </button>
          </form>
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;