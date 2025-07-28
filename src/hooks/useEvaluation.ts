import { useEffect, useState } from "react";
import { collection, getDocs, query, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

interface Evaluation {
  id: string;
  description: string;
  rating: number;
  userId: string;
  userName: string;
  createdAt: Timestamp;
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

        // const evaluationWithUserName = await Promise.all(
        //   evaluationsData.map(async (evaluation) => {
        //     try {
        //       const userDoc = await getDoc(doc(db, "users", evaluation.userId));
        //       const userData = userDoc.data();
        //       return {
        //         ...evaluation,
        //         userName:
        //           userData?.name || userData?.displayName || " Usuário Anônimo",
        //       };
        //     } catch (error) {
        //       console.error("Erro ao buscar nome do usuário:", error);
        //       return {
        //         ...evaluation,
        //         userName: "Usuário Anônimo",
        //       };
        //     }
        //   })
        // );

        setEvaluations(evaluationsData);
        console.log("dados recebidos", evaluationsData);

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
