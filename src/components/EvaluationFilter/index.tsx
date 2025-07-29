import { useState } from "react";
import type { EvaluationFilterProps } from "./modules";

const EvaluationFilter = ({ onSortChange }: EvaluationFilterProps) => {
  const [sortBy, setSortBy] = useState<"date" | "rating">("date");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const handleSortChange = (sortBy: "date" | "rating") => {
    setSortBy(sortBy);
    onSortChange(sortBy, order);
  };

  const handleOrderChange = (newOrder: "asc" | "desc") => {
    setOrder(newOrder);
    onSortChange(sortBy, newOrder);
  };

  return (
    <div className="mt-4 flex gap-4 items-center">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">Filtar por:</label>
        <select
          value={sortBy}
          onChange={(e) =>
            handleSortChange(e.target.value as "date" | "rating")
          }
          className="border bg-white border-gray-300 rounded-md p-2"
        >
          <option value="date">Data</option>
          <option value="rating">Avaliação</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">Ordenar:</label>
        <select
          value={order}
          onChange={(e) => handleOrderChange(e.target.value as "asc" | "desc")}
          className="border bg-white border-gray-300 rounded-md p-2"
        >
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>
    </div>
  );
};

export default EvaluationFilter;
