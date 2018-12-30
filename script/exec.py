# Import
import os

# Tips : os.system('ls -al') si on veut exec la cmd
# Tips : os.popen('ls -al') si on veut recup la sortie

# Partie graphique
# -> Choix du nom du token
token_Name = eval(raw_input("Token name :"))
print("The token's name is : " + token_Name)
#os.system(sed -re "s/input_name/token_Name" test.sol)
# -> Choix du symbole
token_Symbol = raw_input("Token symbol :")
#os.system(sed -re "s/input_symbol/token_Symbol" test.sol)
# -> Choix du nombre de token emis
token_supply = input("Token supply :")
#os.system(sed -re "s/input_supply/token_Supply" test.sol)
# -> Verification des inputs :
#       - nom du token est bien du type ".."
#       - symbole == 3 lettres (a verifier)
#       - Nombre de token emis est bien un nb
# -> Fenetre de validation de deploiement du SC

# Partie executable
#  bash cmd : truffle migrate --ropsten
#

# Partie graphique 2
# -> On donnes les informations relatives au SC
# adresse, avec un lien direct vers le site
# qui check le reseau Ropsten
# prix paye etc
