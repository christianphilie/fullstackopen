const SearchInput = ({ query, onInputChange, error }) => {
  let errorMessage = null;
  if (error) {
    errorMessage = <p>{error}</p>;
  }

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={onInputChange}
        placeholder="search for countries..."
      />
      {errorMessage}
    </div>
  );
};

export default SearchInput;
