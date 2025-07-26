import { useState } from "react";
import { Logo } from "../../assets/svg";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleRegister, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await handleRegister(email, password);
    if (result) {
      console.log("Conta criada com sucesso", result.user);
      navigate("/");
    }
  };
  return (
    <div className="flex flex-col md:flex-row w-full h-full ">
      <div className="hidden md:flex w-1/2 h-full bg-[#F3FFF2] items-center justify-center">
        <img src={Logo} alt="logo" />
      </div>
      <div className="mx-4 mt-30 md:w-1/2 md:mt-50">
        <div className="w-full max-w-md mx-auto ">
          <h1 className="text-2xl text-md text-[#1A202C] font-bold mt-1">
            Faça seu cadastro
          </h1>
          <p className="text-sm mt-8 text-[#1A202C]">E-mail</p>
          <input
            className="border-1 border-[#E8E8E8] bg-[#F7FAFC] rounded p-2 mt-2 w-full"
            placeholder="exemplo@email.com"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && <p className="text-sm mt-2 text-[#FF0000]">{error}</p>}
          <p className="text-sm mt-8 text-[#1A202C]">Senha</p>
          <input
            className="border-1 border-[#E8E8E8] bg-[#F7FAFC] rounded p-2 mt-2 w-full"
            placeholder="Exemplo123"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            className="bg-[#1E9E6A] text-white rounded p-3 mt-22 w-full cursor-pointer active:scale-95 transition"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
