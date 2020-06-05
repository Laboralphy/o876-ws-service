# WS service

## A quoi ça sert ?
C'est un service **http** + **websocket** basé sur les **micro-services**.
Il sert à rapidement créer des services websocket modulaires, dont chaque 
module (micro-service) couvre un domaine particulier. 
Les modules sont concrétisés sous la forme d'une classe basée sur un 
ServiceAbstract.
Les modules sont notifiés à chaque fois qu'un client se connecte ou se 
déconnecte.

