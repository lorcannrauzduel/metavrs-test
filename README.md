
### 1. Comment garantir par notre protocole que la fonction de airdrop soit exécutable uniquement sur notre site internet ?
##### Hypothèse :
On peux mettre en place un « code secret » à envoyer avec la transaction. Au moment de la transaction, ce code est vérifié, s’il n’est pas valide la fonction revert.

##### Solutions mis en place : 
- Arbre de Merkle : On hash ce code secret et à chaque airdrop on vérifie que le code fait partie de ce hash là.
- Fonction airdrop(_receiver, _quantity, _key)
- Le troisième paramètre correspond au code secret.

##### Limites :
- Supposons que ce code ou cette phrase secrète soit communiqué en interne, le risque sera une fuite d'information ou un piratage de nos données
- Attaque brut force 
- Niveau de sécurité du code secret faible


### 2. Comment modifier le smart contract à l'avenir ?

##### Hypothèse :
Il est impossible de modifier un smart contract en soi ça serait contraire à l’immuabilité de la blockchain. Mais il est possible de modifier son état et que la logique sous-jacente soit modifiée à tout moment sans perdre les données précédentes, du coup le client interagit toujours avec le même contrat.

##### Solutions mis en place : 
- Proxy : Pattern UUPS

##### Limites :
- On doit implémenter la fonctionnalité de mise à jour dans chaque nouveau contrat. Sinon, on ne sera plus en mesure de les mettre à jour.
