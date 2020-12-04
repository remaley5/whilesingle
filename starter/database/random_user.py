from . import db, User, fake, bio_list
from random import randrange
# from . import bio_list

fake_bio_list = bio_list


def seed_random_users(preferences, genders, pronouns, num_fake_users):
    # use this list later when adding fake mc/fr responses
    fake_user_list = []
    total_pref = len(preferences)
    for _ in range(num_fake_users):
        first_name = fake.first_name()
        last_name = fake.last_name()
        email = fake.unique.email()
        password = 'password'

        gender_id = genders[randrange(len(genders))].id
        pronoun_id = pronouns[randrange(len(pronouns))].id

        location = f'{fake.city()}, {fake.state_abbr(include_territories=False)}'

        bio = fake_bio_list[randrange(len(fake_bio_list))]
        # bio = fake.text(max_nb_chars=200)

        preference_list = []
        # number of preferences to include
        num_preferences = randrange(1, total_pref)
        for i in range(num_preferences):
            pref_num = randrange(total_pref)
            pref_to_add = preferences[pref_num]
            while pref_to_add in preference_list:
                pref_num = randrange(total_pref)
                pref_to_add = preferences[pref_num]
            preference_list.append(pref_to_add)

        user_info = {'first_name': first_name, 'last_name': last_name,
                     'email': email, 'password': password, 'gender_id': gender_id, 'pronoun_id': pronoun_id, 'location': location, 'preferences': preference_list, 'bio': bio}
        fake_user = User(**user_info)
        fake_user_list.append(fake_user)
        db.session.add(fake_user)
    db.session.commit()
    return fake_user_list
