import Component from "../Component.js";

export default class PhoneViewer extends Component {
	state;
	constructor(element, props) {
		super(element, props);

		this.state = {
			currentPicture: this.props.phone.images[0]
		};

		this.render();

		this.on('click', 'back-button', this.props.onBack);

		this.on('click', 'thumbnail', (event) => {
			this.setState({
				currentPicture: event.delegateTarget.src,
			});
		});

		this.on('click', 'add-button', () => {
			this.props.onAdd(this.props.phone.id);
		});

	}


	render() {
		const { phone } = this.props; // const phone = this.props.phone;
		const { currentPicture } = this.state;

		this.element.innerHTML = `
			<div>
				<img class="phone" src="${ currentPicture }">
	
				<button data-element="back-button">Back</button>
				<button data-element="add-button" data-phone-id="${phone.name}">Add to basket</button>
	
				<h1>${phone.name}</h1>
				<p>${phone.description}</p>
	
				<ul class="phone-thumbs">
					${phone.images.map(imageUrl => `
						<li>
							<img 
								src="${imageUrl}" alt=""
								data-element="thumbnail"
							>
						</li>
					`).join('') }
				</ul>
			</div>
		`;
	}
}