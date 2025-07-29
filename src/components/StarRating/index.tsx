import { GreyStar, YellowStar } from "../../assets/svg";
import type { StarRatingProps } from "./modules";

const StarRating = ({ rating }: StarRatingProps) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <span key={index}>
          {index < rating ? (
            <img
              src={YellowStar}
              alt="Estrela preenchida"
              className="w-5 h-5"
            />
          ) : (
            <img src={GreyStar} alt="Estrela vazia" className="w-5 h-5" />
          )}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
