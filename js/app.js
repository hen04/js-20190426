import PhonesPage from './components/PhonesPage.js'

new PhonesPage(
	document.querySelector('App')
);

fetch('api/example/example.json')
	.then((response) => {
		return response.json();
	})
	.then((json) => {
		console.log(json.name);
	})
	.catch((error) => {
		console.log('error');
	});