import countries from "world-countries";

const formattedValue = countries.map((country) => ({
  value: country.cca2, // code ISO 3166-1 alpha-2 (cca2)
  label: country.translations["fra"].common, // || country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

const useCountries = () => {
  const getAll = () => formattedValue;
  const getByValue = (value: string) => {
    return formattedValue.find((item) => item.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default useCountries;
