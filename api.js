const axios = require("axios");

const options = {
  method: 'GET',
  url: 'https://sudoku-all-purpose-pro.p.rapidapi.com/sudoku',
  params: {create: '32', output: 'raw'},
  headers: {
    'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
    'X-RapidAPI-Host': 'sudoku-all-purpose-pro.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});
