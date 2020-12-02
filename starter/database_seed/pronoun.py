from . import db, Pronoun

def seed_pronouns():
    n1 = Pronoun(pronoun='They/Them/Theirs')
    n2 = Pronoun(pronoun='She/Her/Hers')
    n3 = Pronoun(pronoun='He/Him/His')
    n4 = Pronoun(pronoun='Ze/Hir/Hirs')
    n5 = Pronoun(pronoun='Per/Per/Pers')
    n6 = Pronoun(pronoun='Ve/Ver/Vis')
    n7 = Pronoun(pronoun='Xe, Xem, Xyr')
    # use this array for generating random users
    pronouns = [n1, n2, n3, n4, n5, n6, n7]
    for pronoun in pronouns:
        db.session.add(pronoun)
    return pronouns
