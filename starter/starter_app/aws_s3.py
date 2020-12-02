import time
import boto3
import os

S3_BUCKET=os.environ.get('S3_BUCKET')
S3_KEY=os.environ.get('AWS_ACCESS_KEY_ID')
S3_SECRET=os.environ.get('AWS_SECRET_ACCESS_KEY')

# s3 credentials to be stored as env variables in a config file

s3 = boto3.client(
    "s3",
    aws_access_key_id=S3_KEY,
    aws_secret_access_key=S3_SECRET
)

#This function posts to aws and returns a photo url
def upload_file_to_s3(f, bucket_name, acl="public-read"):

    try:
        # s3_client = boto3.client('s3')
        response = s3.upload_fileobj(
            f, bucket_name, f.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": f.content_type,
            }
        )
        photoUrl = "{}{}".format(
            'https://while-single.s3-us-west-2.amazonaws.com/', f.filename)
        return photoUrl

    except Exception as e:
        print("Something Happened: ", e)
        return e

def change_name(file_name):
    return f"{time.ctime().replace(' ', '').replace(':', '')}.png"
