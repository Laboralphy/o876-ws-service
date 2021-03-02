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
		this._serviceManager.service(oService);
	}

	/**
	 * Renvoie l'instance d'application, pour permettre au service de définir des routes
	 */
	get application() {
		return this._application;
	}

	/**
	 * Active l'ecoute du service "http" et du service "ws" sur le port spécifié.
	 * @param nPort {number} numéro du port d'écoute
	 * @param sAddr {string} addresse d'écoute du serveur
	 * @return {Promise<void>}
	 */
	listen(nPort, sAddr = '0.0.0.0') {
		return new Promise(resolve => {
			this._serviceManager.registerRoutes(this.application, express);
			this._io = socket_io(this._httpServer);
			this._io.on('connection', socket => {
				this._serviceManager.accept(socket);
			});
			this._httpServer.listen(nPort, sAddr, () => {
				resolve();
			});
		})
	}
}

module.exports = WSService;
