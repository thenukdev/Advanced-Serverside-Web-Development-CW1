const axios = require('axios');

const getCountries = async (req, res) => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    const filteredData = response.data.map(country => ({
      name: country.name.common,
      capital: country.capital ? country.capital[0] : 'N/A',
      currencies: country.currencies ? Object.values(country.currencies)[0].name : 'N/A',
      languages: country.languages ? Object.values(country.languages) : [],
      flag: country.flags.png
    }));
    res.json(filteredData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch country data' });
  }
};

module.exports = { getCountries };