from . import db, FR_Question


def seed_fr_questions():
    fr_q_and_alt_list = [
        [
            'How many cats do you have, and do you want 50?'
        ],
        [
            'Why is my shit like, all busted?',
            'Have you tried turning it off?'
        ],
        [
            'My current goal',
            'Aim high'
        ],
        [
            'My favorite furry friend',
            'Fur not required'
        ],
        [
            'I could probably beat you at',
            'Go ahead and brag a little, champ'
        ],
        [
            'My golden rule',
            'The thing you live by'
        ],
    ]
    fr_q_db_list = []
    for q in fr_q_and_alt_list:
        # only add the alt if present - otherwise let db use default value
        fr_q = FR_Question(fr_question=q[0]) if len(
            q) == 1 else FR_Question(fr_question=q[0], alt=q[1])
        fr_q_db_list.append(fr_q)
        db.session.add(fr_q)

    db.session.commit()
    return fr_q_db_list
