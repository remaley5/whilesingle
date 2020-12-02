from . import db, Photo
from random import randrange


def seed_photos(num_fake_users):
    for _ in range(num_fake_users):
        db.session.add(Photo(photo_url='https://while-single-bucket.s3-us-west-2.amazonaws.com/rita-wilson-photo-u24.jpeg',
                             user_id=randrange(1, num_fake_users)))
        db.session.add(Photo(photo_url='https://while-single-bucket.s3-us-west-2.amazonaws.com/ThuOct291654392020.png',
                             user_id=randrange(1, num_fake_users)))
        db.session.add(Photo(photo_url='https://while-single-bucket.s3-us-west-2.amazonaws.com/ThuOct291519152020.png',
                             user_id=randrange(1, num_fake_users)))
        db.session.add(Photo(photo_url='https://while-single-bucket.s3-us-west-2.amazonaws.com/ThuOct291710322020.png',
                             user_id=randrange(1, num_fake_users)))
        db.session.add(Photo(photo_url='https://while-single-two.s3-us-west-2.amazonaws.com/SunNov11437042020.png',
                             user_id=randrange(1, num_fake_users)))
        db.session.add(Photo(photo_url='https://while-single-two.s3-us-west-2.amazonaws.com/SunNov11446152020.png',
                             user_id=randrange(1, num_fake_users)))
        db.session.add(Photo(photo_url='https://while-single-two.s3-us-west-2.amazonaws.com/SunNov11448092020.png',
                             user_id=randrange(1, num_fake_users)))
        db.session.add(Photo(photo_url='https://while-single-two.s3-us-west-2.amazonaws.com/SunNov11450292020.png',
                             user_id=randrange(1, num_fake_users)))
        db.session.add(Photo(photo_url='https://while-single-two.s3-us-west-2.amazonaws.com/SunNov11453242020.png',
                             user_id=randrange(1, num_fake_users)))
        db.session.add(Photo(photo_url='https://while-single-two.s3-us-west-2.amazonaws.com/SunNov11507092020.png',
                             user_id=randrange(1, num_fake_users)))

    db.session.commit()
