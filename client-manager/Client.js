/**
 * Permet d'associer un client à une zone de données persistante
 */

class Client {
	constructor() {
		this._id = '';
		this._socket = null;
		this._status = 0;
		this._data = {};
		this.reset();
	}

	get id() {
		return this._id;
	}


	set id(value) {
		this._id = value;
	}

	get socket() {
		return this._socket;
	}

	set socket(value) {
		this._socket = value;
	}

	get status() {
		return this._status;
	}

	set status(value) {
		this._status = value
	}

	get data() {
		return this._data;
	}

	/**
	 * Remise à zéro des données d'un client
	 */
	reset() {
		this._id = '';
		this._name = '';
		this._socket = null;
		this._status = 0;
		this._data = {};
	}

	/**
	 * Renvoie le nom affichable d'un client
	 * @returns {string}
	 */
	display() {
		return this.name + '#' + this.id;
	}
}


module.exports = Client;