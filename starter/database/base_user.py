from . import db, User


def seed_base_users(pref, genders, pronouns):
    ian = User(first_name='Ian', last_name='Dude', email='ian@aa.io',
               password='password',
               preferences=[pref[0], pref[2], pref[4]], genders=genders[0],
               pronouns=pronouns[0])
    javier = User(first_name='Javier', last_name='Dude',
                  email='javier@aa.io', password='password')
    dean = User(first_name='Dean', last_name='Dude',
                email='dean@aa.io', password='password')
    angela = User(first_name='Angela', last_name='Dude',
                  email='angela@aa.io', password='password')
    soonmi = User(first_name='Soon-Mi', last_name='Dude',
                  email='soonmi@aa.io', password='password')
    alissa = User(first_name='Alissa', last_name='Dude',
                  email='alissa@aa.io', password='password')

    base_users = [ian, javier, dean, angela, soonmi, alissa]
    for base_user in base_users:
        db.session.add(base_user)
    db.session.commit()
    return base_users
