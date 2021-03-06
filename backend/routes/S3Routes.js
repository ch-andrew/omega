/*
 Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/


/*
 * Import required packages.
 * Packages should be installed with "npm install".
 */
const express = require('express');
const aws = require('aws-sdk');
var dotenv = require('dotenv')
const router = express.Router()
dotenv.config('')

/*
 * Configure the AWS region of the target bucket.
 * Remember to change this to the relevant region.
 */
aws.config.region = 'ap-southeast-1';

/*
 * Load the S3 information from the environment variables.
 */
const S3_BUCKET = process.env.S3_BUCKET

/*
 * Respond to GET requests to /sign-s3.
 * Upon request, return JSON containing the temporarily-signed S3 request and
 * the anticipated URL of the image.
 */

router.get('/' , (req, res) => {
    res.send("Accessing Amazon S3");
})

router.get('/sign-s3', (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 600,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
});


module.exports = router