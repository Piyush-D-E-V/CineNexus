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
    <nav className="w-full bg-[#0b0b13]">
      <div className="w-full grid grid-rows-2 justify-center sm:flex justify-between items-center py-3 max-w-[1600px] mx-auto gap-2 px-4">
        
        <div className="gap-4 w-full flex justify-between items-center sm:justify-start">
          <Link to="/" className="text-2xl font-bold tracking-wider text-yellow-400">
            🎬 MovieApp
          </Link>
          
          <div className="flex items-center gap-3">
            <Link to="/watchlist" className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-sm flex items-center gap-2 transition-all shadow-lg shadow-purple-900/50">
              Watchlist
            </Link>

            {user ? (
              <button 
                onClick={handleLogout}
                className="bg-red-600/90 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-sm transition-colors border border-red-500/50"
              >
                Logout
              </button>
            ) : (
              <Link 
                to="/login"
                className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-5 rounded-sm transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        <div className="w-full sm:w-auto flex justify-end">
          <form onSubmit={handleSearch} className="w-full flex justify-end gap-2">
            <input 
              className="text-purple-100 bg-purple-400/10 px-3 py-1 rounded-sm focus:outline-none w-full max-w-[200px] sm:max-w-150 border-2 border-purple-600 flex self-end" 
              type="text"
              value={textval}
              onChange={(e) => setTextval(e.target.value)} 
              placeholder="Search for a movie..."
            />
            <button 
              type="submit" 
              className="bg-yellow-500 text-slate-900 font-semibold px-4 py-1 rounded-sm hover:bg-yellow-400 transition-colors flex"
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