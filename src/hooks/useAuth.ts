import { useState } from "react";
import type { UserCredential } from "firebase/auth";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../firebase";
import { FirebaseError } from "firebase/app";
import toast from "react-hot-toast";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const useAuth = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleRegister = async (
    email: string,
    password: string
  ): Promise<UserCredential | null> => {
    setLoading(true);
    setError("");

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      toast.success("Conta criada com sucesso");
      return result;
    } catch (error: unknown) {
      const errorMessage = error as FirebaseError;
      if (errorMessage.code === "auth/email-already-in-use") {
        setError("Email já está em uso");
      } else if (errorMessage.code === "auth/weak-password") {
        setError("Senha deve ter pelo menos 6 caracteres");
      } else {
        toast.error("Erro ao criar conta");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (
    email: string,
    password: string
  ): Promise<UserCredential | null> => {
    setLoading(true);
    setError("");

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login realizado com sucesso");
      return result;
    } catch {
      toast.error("Email ou senha incorretos");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (): Promise<UserCredential | null> => {
    setLoading(true);
    setError("");

    try {
      const result = await signInWithPopup(auth, googleProvider);
      toast.success("Login realizado com sucesso");
      return result;
    } catch (error: unknown) {
      const errorMessage = error as FirebaseError;
      if (errorMessage.code === "auth/popup-closed-by-user") {
        toast.error("Login cancelado pelo usuário");
      } else if (errorMessage.code === "auth/popup-blocked") {
        toast.error("Popup bloqueado pelo navegador");
      } else {
        toast.error("Erro ao fazer login com Google");
        console.error(errorMessage);
      }
      return null;
    } finally {
      setLoading(false);
    }
  };
  return {
    handleEmailLogin,
    error,
    handleGoogleLogin,
    loading,
    handleRegister,
  };
};
