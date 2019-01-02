# Import
import os

# Tips : os.system('ls -al') si on veut exec la cmd
# Tips : os.popen('ls -al') si on veut recup la sortie

# Partie graphique
# -> Choix du nom du token
try :
    token_Name = eval(raw_input("Token name :"))
# -> Verification des inputs :
#       - nom du token est bien du type ".."
except :
    print("You have to write a string with the apostrophe (ex : 'Token_Name')")
else :
    print("The token's name is : " + token_Name)
    os.system("sed -i '' 's/input_name/"+token_Name+"/g' test.sol")

# -> Choix du symbole
token_Symbol = raw_input("Token symbol :")
# -> Verification des inputs :
#       - symbole == 3 lettres (a verifier)
print("The token's symbol is : " + token_symbol)
os.system("sed -i '' 's/input_symbol/"+token_Symbol+"/g' test.sol")

# -> Choix du nombre de token emis
token_Supply = raw_input("Token supply :")
# -> Verification des inputs :
#       - Nombre de token emis est bien un nb
print("The token's supply is : " + token_Supply)
os.system("sed -i '' 's/input_supply/"+token_Supplr+"/g' test.sol")

# -> Fenetre de validation de deploiement du SC

# Partie executable
#  bash cmd : truffle migrate --ropsten
#

# Partie graphique 2
# -> On donnes les informations relatives au SC
# adresse, avec un lien direct vers le site
# qui check le reseau Ropsten
# prix paye etc
