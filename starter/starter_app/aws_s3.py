import time
import boto3
import os

S3_KEY=os.environ.get('AWS_ACCESS_KEY_ID')
S3_SECRET=os.environ.get('AWS_SECRET_ACCESS_KEY')
S3_BUCKET=os.environ.get('S3_BUCKET')

# s3 credentials to be stored as env variables in a config file

s3 = boto3.client(
    "s3",
    aws_access_key_id='AKIARASXTV3LLH54LIOI',
    aws_secret_access_key='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'
)

#This function posts to aws and returns a photo url
def upload_file_to_s3(f, bucket_name, acl="public-read"):
    print('bucket and file ------------------------', f, bucket_name)

    try:
        # s3_client = boto3.client('s3')
        response = s3.upload_fileobj(
            f, bucket_name, f.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": f.content_type
            }
        )
        photoUrl = "{}{}".format(
            'https://while-single-two.s3-us-west-2.amazonaws.com/', f.filename)
        return photoUrl

    except Exception as e:
        # This is a catch all exception, edit this part to fit your needs.
        print("Something Happened: ", e)
        return e
    #Note your photo url will be different the correct url can be found in your
    #bucket when you click on an image and check the image info.

def change_name(file_name):
    return f"{time.ctime().replace(' ', '').replace(':', '')}.png"
