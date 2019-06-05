import PhonesCatalog from './PhonesCatalog.js';
import {getAll, getById} from '../api/phone.js';

export default class PhonesPage {
	state;
	constructor(element) {
		this.element = element;

		this.render();

		this.state = {
			phones: getAll(),
		};

		new PhonesCatalog(
			document.querySelector('PhonesCatalog'),
			{ phones: this.state.phones }
		);
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

					<section>
						<p>Shopping Cart</p>
						<ul>
						<li>Phone 1 <button>x</button></li>
						<li>Phone 2 <button>x</button></li>
						<li>Phone 3 <button>x</button></li>
						</ul>
					</section>
				</div>

				<!--Main content-->
				<div class="col-md-10">
					<PhonesCatalog></PhonesCatalog>
				</div>
			</div>
		`;
	}
}