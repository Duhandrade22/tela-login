import { useEvaluation } from "../../hooks/useEvaluation";
import StarRating from "../../components/StarRating";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Evaluation = () => {
  const navigate = useNavigate();
  const { evaluations, loading, error } = useEvaluation();
  const { handleLogout } = useAuth();

  const onLogout = async () => {
    await handleLogout();
    navigate("/");
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F3FFF2] p-6">
        <div className="max-w-250 mx-auto">
          <p>Carregando Avaliações...</p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen bg-[#F3FFF2] p-6">
        <div className="max-w-250 mx-auto">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#F3FFF2] p-6">
      <div className="max-w-250 mx-auto">
        <h1 className="text-2xl font-bold text-[#1A202C]mb-6 mt-6">
          Avaliações
        </h1>

        <div className="bg-[#fff] rounded-lg shadow-lg p-6 mt-6">
          {evaluations.length === 0 ? (
            <p>Nenhuma avaliação encontrada</p>
          ) : (
            evaluations.map((evaluation) => (
              <div
                key={evaluation.id}
                className="mb-4 border-gray-300 border rounded p-4"
              >
                <StarRating rating={evaluation.rating} />
                <p className="mt-2">{evaluation.description}</p>
                <p className="text-sm text-gray-500 mt-1">
                  ID do usuário: {evaluation.userId}
                </p>
              </div>
            ))
          )}
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={onLogout}
            className="bg-[#1E9E6A] text-white px-4 py-2 rounded-md min-w-50 cursor-pointer active:scale-95 transition"
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
};

export default Evaluation;
