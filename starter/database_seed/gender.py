from . import db, Gender

def seed_genders():
    g1 = Gender(gender='cis man')
    g2 = Gender(gender='cis woman')
    g3 = Gender(gender='trans man')
    g4 = Gender(gender='trans woman')
    g5 = Gender(gender='non-binary')
    g6 = Gender(gender='genderqueer')
    g7 = Gender(gender='gender fluid')
    g8 = Gender(gender='gender neutral')
    g9 = Gender(gender='man')
    g10 = Gender(gender='woman')

    # use this array for generating random users
    genders = [g3, g4, g5, g6, g7, g8, g9, g10, g1, g2]
    for gender in genders:
        db.session.add(gender)
    db.session.commit()
