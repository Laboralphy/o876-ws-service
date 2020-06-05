/**
 * Permet d'associer un client à une zone de données persistante
 */

class Client {
	constructor() {
		this._id = '';
		this._socket = null;
		this._data = {};
		this.reset();
	}

	get id() {
		return this._id;
	}

	/**
	 * @param value {string}
	 */
	set id(value) {
		this._id = value;
	}

	get socket() {
		return this._socket;
	}

	set socket(value) {
		this._socket = value;
	}

	get data() {
		return this._data;
	}

	/**
	 * Remise à zéro des données d'un client
	 */
	reset() {
		this._id = '';
		this._socket = null;
		this._data = {};
	}
}


module.exports = Client;