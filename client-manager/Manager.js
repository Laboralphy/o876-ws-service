const Client = require('./Client');
const Events = require('events');

/**
 * Ce manager maintient une liste de clients et leurs données associées
 */
class Manager {
	constructor() {
		this.clients = {};
		this._events = new Events();
	}

	/**
	 * Renvoie l'instance EventEmitter créé lors de la construction de l'instance
	 * @return {EventEmitter}
	 */
	get events() {
		return this._events;
	}

	/**
	 * Ajoute un client qui vient de se connecter
	 * @param id {string} identifiant du client
	 * @returns {Client}
	 */
	register(id) {
		if (id in this.clients) {
			throw new Error('Client "' + id + '" is already registered !');
		}
		let oClient = new Client();
		oClient.id = id;
		this.clients[id] = oClient;
		return oClient;
	}

	/**
	 * Supprime un client de la liste de gestion
	 * @param id {string}
	 */
	unregisterClient(id) {
		if (id in this.clients) {
			delete this.clients[id];
		}
	}

	/**
	 * Renvoie une instance client
	 * @param id {string} identifiant client recherché
	 */
	client(id) {
		if (id in this.clients) {
			return this.clients[id];
		} else {
			throw new Error('client ' + id + ' not found');
		}
	}
}

module.exports = Manager;