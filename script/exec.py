# Import
import os
import sys

# Tips : os.system('ls -al') si on veut exec la cmd
# Tips : os.popen('ls -al') si on veut recup la sortie

# Functions
## Function query_yes_no
def query_yes_no(question, default="yes"):
    """Ask a yes/no question via raw_input() and return their answer.

    "question" is a string that is presented to the user.
    "default" is the presumed answer if the user just hits <Enter>.
        It must be "yes" (the default), "no" or None (meaning
        an answer is required of the user).

    The "answer" return value is True for "yes" or False for "no".
    """
    valid = {"yes": True, "y": True, "ye": True,
             "no": False, "n": False}
    if default is None:
        prompt = " [y/n] "
    elif default == "yes":
        prompt = " [Y/n] "
    elif default == "no":
        prompt = " [y/N] "
    else:
        raise ValueError("invalid default answer: '%s'" % default)

    while True:
        sys.stdout.write(question + prompt)
        choice = raw_input().lower()
        if default is not None and choice == '':
            return valid[default]
        elif choice in valid:
            return valid[choice]
        else:
            sys.stdout.write("Please respond with 'yes' or 'no' "
                             "(or 'y' or 'n').\n")
## End : Function query_yes_no

# Partie graphique
# -> Choix du nom du token
token_Name = '';
while type(token_Name) != type('string') or len(token_Name) < 1 :
    try :
        token_Name = eval(raw_input("Token name :"))
# -> Verification des inputs :
#       - nom du token est bien du type ".."
    except :
        print("You have to write a string with the apostrophe (ex : 'Token_Name')")

print("The token's name is : " + token_Name)
os.system("sed -i '' 's/input_name/"+token_Name+"/g' test.sol")


# -> Choix du symbole
token_Symbol = '';
while type(token_Symbol) != type('string') or len(token_Symbol) < 1 :
    try :
        token_Symbol = eval(raw_input("Token symbol :"))
    # -> Verification des inputs :
    #       - symbole == 3 lettres (a verifier)okoko
    except :
        print("You have to write a string with the apostrophe (ex : 'Token_Symbol')")


print("The token's symbol is : " + token_Symbol)
os.system("sed -i '' 's/input_symbol/"+token_Symbol+"/g' test.sol")


# -> Choix du nombre de token emis
token_Supply = raw_input("Token supply :")
# -> Verification des inputs :
#       - Nombre de token emis est bien un nb
print("The token's supply is : " + token_Supply)
os.system("sed -i '' 's/input_supply/"+token_Supply+"/g' test.sol")

# -> Fenetre de validation de deploiement du SC
print("Thanks, your token is named : " + token_Name + "\n it symbol is : " + token_Symbol + "\n it supply is : " + token_Supply )

# Partie executable
answer = query_yes_no("Smart Contract's deployment")
if answer == True :
    os.system("truffle migrate --ropsten")
else :
    sys.exit()
#  bash cmd : truffle migrate --ropsten
#

# Partie graphique 2
# -> On donnes les informations relatives au SC
# adresse, avec un lien direct vers le site
# qui check le reseau Ropsten
# prix paye etc
