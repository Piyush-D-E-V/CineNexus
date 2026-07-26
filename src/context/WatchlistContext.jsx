import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../supabase"; // 🚨 IMPORTANT: Supabase import kiya humne

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  // 1. Initial state ab empty array hogi, kyunki data cloud se aayega
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true); // Data aane tak loading state

  // 2. App start hote hi Supabase se watchlist fetch karna
  useEffect(() => {
    const fetchWatchlist = async () => {
      // Pehle check karo ki user logged in hai ya nahi
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
        setWatchlist([]); // Agar login nahi hai toh list khali rakho
      }
      setLoading(false);
    };

    fetchWatchlist();
  }, []);

  // 3. Add movie (Local state + Cloud DB)
  const addToWatchlist = async (movie) => {
    // 🚨 LOGIN CHECK: Supabase se pucho user logged in hai ya nahi
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      // Agar session nahi hai, toh seedha Login page par redirect kar do
      window.location.href = "/login";
      return; // Code yahin ruk jayega, fake add nahi hoga
    }

    if (!watchlist.some((item) => item.id === movie.id)) {
      // Optimistic update: UI mein turant add karo jisse lag na feel ho
      setWatchlist([...watchlist, movie]);

      // Background mein Supabase cloud par save karo
      const { error } = await supabase
        .from("watchlist")
        .insert([{ movie_id: movie.id, movie_data: movie }]);

      if (error) {
        console.error("Error saving to cloud:", error);
      }
    }
  };

  // 4. Remove movie (Local state + Cloud DB)
  const removeFromWatchlist = async (id) => {
    // UI se turant hatao
    setWatchlist(watchlist.filter((item) => item.id !== id));

    // Background mein Supabase cloud se delete karo
    const { error } = await supabase
      .from("watchlist")
      .delete()
      .eq("movie_id", id);

    if (error) {
      console.error("Error deleting from cloud:", error);
    }
  };

  // 5. Helper function to check if a movie is already added
  const isAdded = (id) => watchlist.some((item) => item.id === id);

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isAdded, loading }}>
      {children}
    </WatchlistContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWatchlist = () => useContext(WatchlistContext);