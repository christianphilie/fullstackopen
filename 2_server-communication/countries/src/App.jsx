import { useState, useEffect } from 'react';
import SearchInput from './components/SearchInput';
import CountriesList from './components/CountriesList';
import CountryDetails from './components/CountryDetails';
import countryService from './services/countries';

function App() {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    if (query) {
      countryService
        .getAll()
        .then((allCountries) => {
          const filteredCountries = allCountries.filter((country) =>
            country.name.common.toLowerCase().includes(query.toLowerCase())
          );
          setCountries(filteredCountries);
          setError('');
        })
        .catch(() => {
          setError('Error fetching data');
        });
    } else {
      setCountries([]);
    }
  }, [query]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    setSelectedCountry(null);
  };

  const handleShowCountry = (country) => {
    setSelectedCountry(country);
  };

  const countryToShow = selectedCountry || (countries.length === 1 ? countries[0] : null);

  return (
    <div>
      <h1>Countries</h1>
      <SearchInput query={query} onInputChange={handleInputChange} error={error} />
      {!selectedCountry && (
        <CountriesList countries={countries} onShowCountry={handleShowCountry} />
      )}
      {countryToShow && <CountryDetails country={countryToShow} />}
    </div>
  );
}

export default App;
