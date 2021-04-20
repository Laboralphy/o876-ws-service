const ClientManager = require('../client-manager');

class ServiceManager {
    constructor() {
        this.clientManager = new ClientManager();
        this._services = [];
    }

    /**
     * Ajoute un plgin à la liste des service de service
     * @param instance {string|object}
     * @returns {*}
     */
    service(instance) {
        instance.clientManager = this.clientManager;
        this._services.push(instance);
        if ('init' in instance) {
            return instance.init();
        }
    }

    /**
     * Suppression du client de toutes les instances et les services
     * @param client {*}
     */
    destroyClient(client) {
        let id = client.id;
        this._services.forEach(p => p.disconnectClient(client));
        this.clientManager.unregisterClient(id);
        client.id = null;
    }

    /**
     * Iteration sur chaque micro service pour leurs signifier qu'ils peuvent définir des routes
     */
    registerRoutes(application, express) {
        return this._services.map(p => p.registerRoutes(application, express));
    }

    /**
     * Invoquée à chaque connection d'un client
     * @param socket
     */
    accept(socket) {
        let client = this.clientManager.register(socket.client.id);
        client.socket = socket;

        /**
         * Evènement : lorsqu'un client se déconnecte
         */
        socket.on('disconnect', () => {
            this.destroyClient(client);
        });

        this._services.forEach(p => p.connectClient(client));
    }
}

module.exports = ServiceManager;