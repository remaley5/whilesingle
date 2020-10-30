#import the model you need to add the photo url to
import os
from starter_app.models import (db, Photo)
from flask import Blueprint, request
from ..aws_s3 import upload_file_to_s3, change_name
upload_routes = Blueprint("upload_routes", __name__, url_prefix="")

@upload_routes.route("/<int:userId>/upload", methods=['POST'])
def upload(userId):
    # print('ON LINE 9 --------------', request.form["photoFile"])
    # print('ON LINE 10 --------------', request.files)
    # A
    # if "file" not in request.files:
    #     return "No file key in request.files --------------------"

    # B
    f = request.files['file']
    print('f----------------------->', f)
    f.filename = change_name(f.filename)
    print('os.path ==========', os.path)
    # f.save(os.path.join('uploads', f.filename))
    photo_url = upload_file_to_s3(f, 'while-single-two')
    """
        These attributes are also available

        file.filename               # The actual name of the file
        file.content_type
        file.content_length
        file.mimetype
    """
    # D.
    if f:
        print('ON LINE 27 --------------')
        # file.filename = secure_filename(file.filename)
        # photo_url = upload_file_to_s3(file, 'while-single-bucket')

        print('PHOTO_URL!!!!!!!!!!!!!!!!!!!', photo_url)
        try:
            print('ON LINE 32 --------------')
            photo = Photo(
                user_id=userId, photo_url=photo_url)
            db.session.add(photo)
            db.session.commit()

            return {'photo': photo.to_dict()}
        except AssertionError as message:
            print('ON LINE 40 --------------')
            return jsonify({"error": str(message)}), 400


    else:
        print('something went wrong-----------------')
    # request.form.getlist to add access form data
