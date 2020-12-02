from . import db, Reject


def seed_rejects():
    test_reject5 = Reject(user_id=1, reject_id=5)
    test_reject4 = Reject(user_id=1, reject_id=4)
    test_reject3 = Reject(user_id=1, reject_id=3)

    db.session.add(test_reject5)
    db.session.add(test_reject4)
    db.session.add(test_reject3)
    db.session.commit()
