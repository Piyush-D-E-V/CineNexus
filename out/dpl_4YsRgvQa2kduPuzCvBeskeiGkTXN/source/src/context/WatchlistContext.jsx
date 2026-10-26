import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../supabase"; 

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true); 

  // Modal States
  const [showConfirm, setShowConfirm] = useState(false);
  const [movieToRemove, setMovieToRemove] = useState(null);

  useEffect(() => {
    const fetchWatchlist = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        const { data, error } = await supabase.from("watchlist").select("*");
        if (error) {
          console.error("Error fetching from cloud:", error);
        } else if (data) {
          const cloudMovies = data.map(row => row.movie_data);
          setWatchlist(cloudMovies);
        }
      } else {
        setWatchlist([]); 
      }
      setLoading(false);
    };

    fetchWatchlist();
  }, []);

  const addToWatchlist = async (movie) => {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      window.location.href = "/login";
      return; 
    }

    if (!watchlist.some((item) => item.id === movie.id)) {
      setWatchlist([...watchlist, movie]);

      const { error } = await supabase
        .from("watchlist")
        .insert([{ movie_id: movie.id, movie_data: movie }]);

      if (error) console.error("Error saving to cloud:", error);
    }
  };

  const removeFromWatchlist = (id) => {
    setMovieToRemove(id);
    setShowConfirm(true); 
  };

  const executeRemove = async () => {
    const id = movieToRemove;
    
    setShowConfirm(false);
    setMovieToRemove(null);

    setWatchlist(watchlist.filter((item) => item.id !== id));

    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id;

    const { error } = await supabase
      .from("watchlist")
      .delete()
      .eq("movie_id", id)
      .eq("user_id", userId);

    if (error) console.error("Error deleting from cloud:", error);
  };

  const cancelRemove = () => {
    setShowConfirm(false);
    setMovieToRemove(null);
  };

  const isAdded = (id) => watchlist.some((item) => item.id === id);

  // 🚨 NAYA FUNCTION: Movie ya Show ka naam nikalne ke liye
  const getItemName = () => {
    const item = watchlist.find(m => m.id === movieToRemove);
    if (!item) return "this item";
    // Movies ke liye 'title' hota hai, TV shows ke liye 'name' hota hai
    return item.title || item.name || "this item";
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isAdded, loading }}>
      {children}

      {/* MODAL */}
      {showConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm transition-opacity">
          
          <div className="bg-[#12121a] border border-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl transform transition-all scale-100 opacity-100 animate-in fade-in zoom-in duration-200">
            
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mb-4 border border-red-500/20">
                <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Remove Item?</h3>
              
              {/* 🚨 UPDATE: Yahan naam dynamically aayega */}
              <p className="text-slate-400 text-sm mb-6 px-2">
                Are you sure you want to remove <span className="text-yellow-400 font-bold px-1">"{getItemName()}"</span> from your Watchlist? This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={cancelRemove}
                className="flex-1 px-4 py-3 rounded-xl font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={executeRemove}
                className="flex-1 px-4 py-3 rounded-xl font-bold text-white bg-red-400 hover:bg-red-500 transition-colors shadow-lg shadow-red-900/20 cursor-pointer"
              >
                Yes, Remove
              </button>
            </div>
          </div>
          
        </div>
      )}
    </WatchlistContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWatchlist = () => useContext(WatchlistContext);