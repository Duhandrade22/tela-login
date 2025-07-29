import { SearchIcon } from "../../assets/svg";

interface SearchFilterProps {
  onSearch: (search: string) => void;
}

const SearchFilter = ({ onSearch }: SearchFilterProps) => {
  return (
    <div className="w-full">
      <div className="relative">
        <input
          className="w-full border bg-white border-gray-300 rounded-md p-2"
          placeholder="Buscar..."
          type="text"
          onChange={(e) => onSearch(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="Ícone de busca"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
        />
      </div>
    </div>
  );
};

export default SearchFilter;
