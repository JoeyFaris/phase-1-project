
////create
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c34eab33acmshdd5f894180ecbdcp12bcabjsne2f2f6a1f75b',
		'X-RapidAPI-Host': 'sudoku-all-purpose-pro.p.rapidapi.com'
	}
};

fetch('https://sudoku-all-purpose-pro.p.rapidapi.com/sudoku?create=32&output=raw', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

    //solve
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'c34eab33acmshdd5f894180ecbdcp12bcabjsne2f2f6a1f75b',
            'X-RapidAPI-Host': 'sudoku-all-purpose-pro.p.rapidapi.com'
        }
    };
    
    fetch('https://sudoku-all-purpose-pro.p.rapidapi.com/sudoku?solve=000000001000060020901000000710000005000000403000000700000000089000478000060000070', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));

        // verify
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'c34eab33acmshdd5f894180ecbdcp12bcabjsne2f2f6a1f75b',
                'X-RapidAPI-Host': 'sudoku-all-purpose-pro.p.rapidapi.com'
            }
        };
        
        fetch('https://sudoku-all-purpose-pro.p.rapidapi.com/sudoku?verify=900200700000075080000000000000000000040701000509060134300020800001000206000007000', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
