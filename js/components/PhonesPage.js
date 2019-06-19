import PhonesCatalog from './PhonesCatalog.js';
import PhoneViewer from './PhoneViewer.js';
import ShoppingCart from './ShoppingCart.js';
import {getAll, getById} from '../api/phone.js';
import Component from "../Component.js";

export default class PhonesPage extends Component {
	state;
	constructor(element) {
		super(element);

		this.state = {
			phones: [],
			selectedPhone: null,
			basketItems: [],
			itemAdded: null,
		};

		this.addBasketItem = (phoneId) => {
			this.setState({
				basketItems: [
					...this.state.basketItems,
					phoneId
				],
			});
		};
		this.deleteBasketItem = (index) => {
			const items = this.state.basketItems;

			this.setState({
				basketItems: [
					...items.slice(0, index),
					...items.slice(index + 1, -1)
				],
			})
		};

		this.showPhone = (phoneId) => {
			getById(phoneId)
				.then(phoneDetails => {
					this.setState({ selectedPhone: phoneDetails });
				});
		};
		this.hidePhone = () => {
			this.setState({
				selectedPhone: null,
			});
		};

		this.render();

		const phonePromise = getAll();

		phonePromise
			.then(phones => {
				this.setState({ phones: phones });
			});

	}

	render() {
		this.element.innerHTML = `
			<div class="row">
				<!--Sidebar-->
				<div class="col-md-2">
					<section>
						<p>
							Search:
							<input>
						</p>
						<p>
							Sort by:
							<select>
								<option value="name">Alphabetical</option>
								<option value="age">Newest</option>
							</select>
							</p>
					</section>

					<ShoppingCart></ShoppingCart>

				</div>

				<!--Main content-->
				<div class="col-md-10">
					${ this.state.selectedPhone ? `
						<PhoneViewer></PhoneViewer>
					` : `
						<PhonesCatalog></PhonesCatalog>
					`}
				</div>
			</div>
		`;

		this.initComponent(PhonesCatalog, {
			phones: this.state.phones,
			items: this.state.basketItems,
			onPhoneSelected: this.showPhone,
			onAdd: this.addBasketItem,
		});

		this.initComponent(PhoneViewer, {
			phone: this.state.selectedPhone,
			onBack: this.hidePhone,
			onItemRemoved: (removedElem) => {
				this.state.basketItems.splice(removedElem, 1);
				this.render();
			},
			onAdd: this.addBasketItem
		});

		this.initComponent(ShoppingCart, {
			phones: this.state.phones,
			items: this.state.basketItems,
			onDelete: this.deleteBasketItem,
			onAdd: this.addBasketItem
		});



	}
}