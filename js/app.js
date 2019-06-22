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


const firstPromise = fetch('api/example/example2.json')
	.then((response) => response.json());

const secondPromise = fetch('api/example/example3.json')
	.then((response) => response.json());

secondPromise
	.then(person => {
		console.log(person.name);

		return firstPromise;
	})
	.then(person => {
		console.log(person.name);
	})
	.catch((error) => {
		console.warn(error);
	}) ;


const scenario = (resolve, reject) => {
	document.addEventListener('click', resolve);

	setTimeout(reject, 5000)
};

const clickPromise = new Promise(scenario);

clickPromise
	.then(
		() => console.log('success'),
		() => console.warn('error'),
	);
