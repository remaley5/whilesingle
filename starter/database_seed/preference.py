from . import db, Preference

def seed_preferences():
    p1 = Preference(preference='hookups')
    p2 = Preference(preference='new friends')
    p3 = Preference(preference='short-term dating')
    p4 = Preference(preference='long-term dating')
    p5 = Preference(preference='Monogamy')
    p6 = Preference(preference='Non-Monogamy')

    # use this array for generating random users
    preferences = [p1, p2, p3, p4, p5, p6]
    for preference in preferences:
        db.session.add(preference)
    return preferences
