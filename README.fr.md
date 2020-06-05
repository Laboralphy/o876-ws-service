# WS service

## A quoi ça sert ?
C'est un service **http** + **websocket** basé sur les **micro-services**.

Il sert à créer rapidement des services websocket modulaires. 
Chaque module (micro-service) peut :
 - définir des routes http et/ou et définir le comportement du micro-service
 lorsqu'une de ses routes est sollicitée.
 - écouter des évènements websocket.
 - émettre des paquets websocket.

## Comment faire ?  
Pour satisfaire ces fonctionnalités, les modules sont concrétisés sous 
la forme d'une classe basée sur un ServiceAbstract et doivent implementer
des méthodes afin de réagir aux évènements déclenchés par l'activité des 
clients.
 - la méthode **clientConnected** est invoquée à chaque fois qu'un client ouvre une connexion websocket.
 - la méthode **clientDisconnected** est invoquée à chaque fois qu'un client ferme sa connexion websocket.
 - la méthode **registerRoutes** est invoquée avant la mise en écoute du service et permet au 
 micro-service de définir ses propres routes afin de réagir aux requêtes http des clients.
