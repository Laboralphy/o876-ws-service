const http = require('http');

const express = require('express');
const socket_io = require('socket.io');

const ServiceManager = require('./service-manager');

/**
 * Service http + ws
 * @class WSService
 */
class WSService {

	/**
	 * instanciation des composant principaux
	 * notament le service http
	 */
	constructor() {
		this._serviceManager = new ServiceManager();
		this._application = express();
		this._httpServer = http.createServer(this._application);
	}

	/**
	 * Renvoie l'instance du service manager
	 * @return {ServiceManager}
	 */
	get serviceManager() {
		return this._serviceManager;
	}

	/**
	 * Ajoute un micro-service au service manager
	 * @param oService {ServiceAbstract}
	 */
	service(oService) {
		const r = this._serviceManager.service(oService);
		if (r instanceof Promise) {
			return r
		} else {
			return Promise.resolve(r)
		}
	}

	/**
	 * Renvoie l'instance d'application, pour permettre au service de définir des routes
	 */
	get application() {
		return this._application;
	}

	/**
	 * Active l'ecoute du service "http" et du service "ws" sur le port spécifié.
	 * @param port {number} numéro du port d'écoute
	 * @param address {string} addresse d'écoute du serveur
	 * @param ioOptions {object} options passées à socket.io
	 * @return {Promise<void>}
	 */
	async listen ({ port, address = '0.0.0.0', ioOptions = {} }) {
		await this._serviceManager.registerRoutes(this.application, express);
		return new Promise(resolve => {
			this._io = socket_io(this._httpServer, ioOptions);
			this._io.on('connection', socket => {
				this._serviceManager.accept(socket);
			});
			this._httpServer.listen(port, address, () => {
				resolve();
			});
		})
	}
}

module.exports = WSService;
