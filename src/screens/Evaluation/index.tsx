import { useEvaluation } from "../../hooks/useEvaluation";
import StarRating from "../../components/StarRating";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import EvaluationFilter from "../../components/EvaluationFilter";
import SearchFilter from "../../components/SearchFilter";

const formatTimestamp = (timestamp: Timestamp) => {
  if (!timestamp) return "";

  const date = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
  );

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const Evaluation = () => {
  const navigate = useNavigate();
  const { evaluations, loading, error } = useEvaluation();
  const { handleLogout } = useAuth();
  const [sortedEvaluations, setSortedEvaluations] = useState([...evaluations]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvaluations, setFilteredEvaluations] = useState([
    ...evaluations,
  ]);

  useEffect(() => {
    const filtered = evaluations.filter((evaluation) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        evaluation.userName.toLowerCase().includes(searchLower) ||
        evaluation.description.toLowerCase().includes(searchLower)
      );
    });
    setFilteredEvaluations(filtered);
    setSortedEvaluations(filtered);
  }, [evaluations, searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleSort = (sortBy: "date" | "rating", order: "asc" | "desc") => {
    const sorted = [...filteredEvaluations].sort((a, b) => {
      if (sortBy === "date") {
        const timeA = a.createdAt.seconds;
        const timeB = b.createdAt.seconds;
        return order === "asc" ? timeA - timeB : timeB - timeA;
      } else {
        return order === "asc" ? a.rating - b.rating : b.rating - a.rating;
      }
    });
    setSortedEvaluations(sorted);
  };

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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-[#1A202C]mb-6 mt-6">
            Avaliações
          </h1>
          <EvaluationFilter onSortChange={handleSort} />
        </div>

        <SearchFilter onSearch={handleSearch} />

        <div className="bg-[#fff] rounded-lg shadow-lg p-6 mt-6">
          {sortedEvaluations.length === 0 ? (
            <p>Nenhuma avaliação encontrada</p>
          ) : (
            sortedEvaluations.map((evaluation) => (
              <div
                key={evaluation.id}
                className="mb-4 border-gray-300 border rounded p-4"
              >
                <StarRating rating={evaluation.rating} />
                <p className="mt-2">{evaluation.description}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {formatTimestamp(evaluation.createdAt)}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {evaluation.userName}
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
