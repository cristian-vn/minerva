import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(false);

  function login(userData) {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  useEffect(() => {
    const loadUserFromLocalStorage = async () => { // Convertida en async
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error al leer datos de autenticación:", error);
        localStorage.removeItem('user'); // Limpia datos corruptos
      }
    };
    loadUserFromLocalStorage();
  }, []);

  const value = React.useMemo(() => ({ // Usamos useMemo para evitar re-renderizaciones innecesarias
    user,
    login,
    logout,
  }), [user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );

  /*useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error al leer datos de autenticación:", error);
      localStorage.removeItem('user'); // Limpia datos corruptos
    } finally {
      setLoading(false); // Finaliza la carga sin importar el resultado
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );*/
}

export function useAuth() {
  return useContext(AuthContext);
}
