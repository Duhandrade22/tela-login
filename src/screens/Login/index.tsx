import { useState } from "react";
import { GoogleIcon, Logo } from "../../assets/svg";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleEmailLogin, handleGoogleLogin, loading } = useAuth();

  const onEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await handleEmailLogin(email, password);
    if (result) {
      navigate("/evaluation");
    }
  };

  const onGoogleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await handleGoogleLogin();
    if (result) {
      navigate("/evaluation");
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-full ">
      <div className="hidden md:flex w-1/2 h-full bg-[#F3FFF2] items-center justify-center">
        <img src={Logo} alt="logo" />
      </div>
      <div className="mx-4 mt-30 md:w-1/2 md:mt-50">
        <div className="w-full max-w-md mx-auto ">
          <h2 className="text-lg text-[#1A202C]">Bem-vindo de volta</h2>
          <h1 className="text-2xl text-md text-[#1A202C] font-bold mt-1">
            Faça login na sua conta
          </h1>
          <p className="text-sm mt-8 text-[#1A202C]">E-mail</p>
          <input
            className="border-1 border-[#E8E8E8] bg-[#F7FAFC] rounded p-2 mt-2 w-full"
            placeholder="exemplo@email.com"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="text-sm mt-8 text-[#1A202C]">Senha</p>
          <input
            className="border-1 border-[#E8E8E8] bg-[#F7FAFC] rounded p-2 mt-2 w-full"
            placeholder="Exemplo123"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="bg-[#1E9E6A] text-white rounded p-3 mt-22 w-full cursor-pointer active:scale-95 transition"
            onClick={onEmailLogin}
            disabled={loading}
          >
            {loading ? "Carregando..." : "Entrar"}
          </button>
          <button
            className="bg-[#1A202C] rounded p-3 mt-6 w-full cursor-pointer active:scale-95 transition"
            onClick={onGoogleLogin}
            disabled={loading}
          >
            <div className="flex items-center justify-center gap-3">
              <img src={GoogleIcon} alt="google" />
              <p className="text-white">
                {loading ? "Carregando..." : "Ou faça login com o Google"}
              </p>
            </div>
          </button>
          <div className="flex justify-center items-center mt-12 gap-1">
            <p className="text-sm text-[#1A202C]">Não tem uma conta? </p>
            <p
              className="text-sm text-[#1E9E6A] cursor-pointer active:scale-95 transition"
              onClick={() => navigate("/register")}
            >
              Cadastre-se
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
