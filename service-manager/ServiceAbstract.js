const CONSTS = require('./consts');

class Abstract {

	constructor() {
		this._clientManager = null;
	}

	init() {
	}

	get clientManager() {
		return this._clientManager;
	}

	set clientManager(value) {
		this._clientManager = value;
	}

	/**
	 * Invoquée lors de la mise en écoute du serveur, afin de définir les routes.
	 * @param application
	 * @param express
	 */
	registerRoutes(application, express) {
	}

	/**
	 * appelée quand un client se déconnecte du service
	 * @param client {Client}
	 */
	disconnectClient(client) {
	}

	/**
	 * Appelée lorsqu"un client se déconnecte du service.
	 * @param client {Client}
	 */
	connectClient(client) {
	}

	/**
	 * Renvoie l'instaance du client dont l'id est spécifié en paramètre
	 * @param id {string}
	 * @return {Client}
	 */
	getClient(id) {
		return this._clientManager.client(id);
	}

	/**
	 * Emission d'un packet à destination d'un client
	 * @param idClient {string|string[]} identifiant ou liste d'identifiants destinataire
	 * @param sEvent {string} évènement
	 * @param data {*}
	 * @protected
	 */
	socketEmit(idClient, sEvent, data) {
		try {
			if (Array.isArray(idClient)) {
				idClient.forEach(id => {
					this.socketEmit(id, sEvent, data);
				});
			} else {
				this.getClient(idClient).socket.emit(sEvent, data);
			}
		} catch (e) {
			console.error(data);
			console.error(e.stack);
		}
	}

	/**
	 * Transmet une information à tous les plugins
	 * @param sEvent {string} nature de l'évènement
	 * @param data {*} information supplémentaire
	 */
	serviceBroadcast(sEvent, data) {
		this.clientManager.events.emit(CONSTS.OPCODE_SERVICE_BROADCAST, sEvent, data);
	}

	addBroadcastListener(sEvent, pHandler) {
		this.clientManager.events.on(CONSTS.OPCODE_SERVICE_BROADCAST, (sEvent, data) => {
			pHandler(data);
		});
	}
}

module.exports = Abstract;
