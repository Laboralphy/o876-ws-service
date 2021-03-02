# WS service

## A quoi ça sert ?
C'est un service **http** + **websocket** basé sur les **micro-services** qui peut servir de base à une
application web avec un support des websockets.


### La notion de micro-service
Dans le contexte de cet outil, un micro service est un plugin enregistré dans le **ws-service**.
Chaque micro service peut :
 - définir le comportement du micro-service lorsqu'une route est sollicité.
 - écouter des évènements websocket.
 - émettre des paquets websocket.

## Comment faire ?  
Pour satisfaire ces fonctionnalités, les micro-services sont concrétisés sous 
la forme d'une classe basée sur un _ServiceAbstract_ et doivent implementer
des méthodes afin de réagir aux évènements déclenchés par l'activité des 
clients.

#### Liste des méthodes à implémenter
 - la methode **init** sera lancée un seule fois, à l'installation du micro-service dans le service
 - la méthode **connectClient** est invoquée à chaque fois qu'un client ouvre une connexion websocket.
 - la méthode **disconnectClient** est invoquée à chaque fois qu'un client ferme sa connexion websocket.
 - la méthode **registerRoutes** est invoquée avant la mise en écoute du service et permet au
 micro-service de définir ses propres routes afin de réagir aux requêtes http des clients.


#### Liste des methodes proposées par le ServiceAbstract
 - la méthode **addBroadcastListener** est utilisée par les micro-services pour déclarer un écouteur 
  de messages inter-micro-services.
 - la méthode **serviceBroadcast** est utilisée par les micro-services pour envoyer des messages à 
 d'autres services.

