import { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";

interface Evaluation {
  id: string;
  description: string;
  rating: number;
  userId: string;
}

export const useEvaluation = () => {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvaluations() {
      try {
        const evaluationsRef = collection(db, "evaluations");
        const q = query(evaluationsRef);
        const querySnapshot = await getDocs(q);

        const evaluationsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Evaluation[];

        setEvaluations(evaluationsData);
        setLoading(false);
      } catch (error) {
        setError("Erro ao carregar avaliações");
        setLoading(false);
        console.error("Erro ao carregar avaliações:", error);
      }
    }
    fetchEvaluations();
  }, []);

  return { evaluations, loading, error };
};
