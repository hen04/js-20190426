import PhonesPage from './components/PhonesPage.js'

new PhonesPage(
	document.querySelector('App')
);

fetch('http://swapi.com/api/people/1')
	.then((response) => {
		return response.json();
	})
	.then((json) => {
		console.log(json.name);
	})
	.catch((error) => {
		console.log('error');
	});