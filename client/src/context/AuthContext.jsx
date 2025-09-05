import { createContext, useContext, useEffect, useState, useCallback } from "react";
import * as Auth from "../api/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // robust /api/auth/me boot
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const u = await Auth.me();
        if (!mounted) return;
        const isAuth = u && typeof u === "object" && !!u.is_authenticated;
        setUser(
          isAuth
            ? {
                username: u.username ?? "",
                role: u.role ?? "student",
                student_id: u.student_id ?? null,
              }
            : null
        );
      } catch {
        if (mounted) setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const doLogin = useCallback(async ({ role, email, studentId, password }) => {
    await Auth.login({ role, email, student_id: studentId, password });
    const u = await Auth.me();
    const isAuth = u && typeof u === "object" && !!u.is_authenticated;
    setUser(isAuth ? { username: u.username ?? "", role: u.role ?? "student", student_id: u.student_id ?? null } : null);
  }, []);

  const doRegister = useCallback(async ({ username, studentId, email, password }) => {
    await Auth.register({ username, student_id: studentId, email, password });
    const u = await Auth.me();
    const isAuth = u && typeof u === "object" && !!u.is_authenticated;
    setUser(isAuth ? { username: u.username ?? "", role: u.role ?? "student", student_id: u.student_id ?? null } : null);
  }, []);

  const doLogout = useCallback(async () => {
    try { await Auth.logout(); } finally { setUser(null); }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login: doLogin, register: doRegister, logout: doLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
