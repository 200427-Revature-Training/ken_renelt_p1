import express from 'express';
import * as ReimbService from '../services/reimbursment-service';
// import { Reimbursment } from '../data-models/reimbursment-model';

const jwt = require('jsonwebtoken');
const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');

export const reimRouter = express.Router();

const reimbursments = [];
const secretKey = 'justabunchofcharstolist';


const bucketName = 'kenrevatureproject';
const AWSAccessKeyId = 'AKIAJVMUVWXC5BJOKGGQ'
const AWSSecretKey = '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';

AWS.config.update({
    accessKeyId: AWSAccessKeyId,
    secretAccessKey: AWSSecretKey
  });

// configure AWS to work with promises
AWS.config.setPromisesDependency(bluebird);

// create S3 instance
const s3 = new AWS.S3();


const authenticateToken = (req, res, next) => {
     console.log('am i verifying auth' + req.headers.authorization);
  //  console.log('am i verifying req' +JSON.stringify( req));
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null)
        return res.sendStatus(401);

        console.log('token was not null');
    jwt.verify(token, secretKey, (err, user) => {
        //console.log('am i verified');
        if(err){
            console.log('auth err = ' + err);
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    })
}

reimRouter.get('', (request, response, next) => {
   // console.log('get request b4 auth');

   if(!authenticateToken)
    return response.sendStatus(403);
    //console.log('get request after auth');

    ReimbService.getAllReimbursments().then(reimbursments => {
        response.json(reimbursments);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
});

reimRouter.get('/:id',  (request, response, next) => {
    if(!authenticateToken)
    return response.sendStatus(403);

     const id = +request.params.id;
    ReimbService.getReimbursmentForUser(id).then(reimbursments => {
        response.json(reimbursments);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
})

reimRouter.get('/approved',  (request, response, next) => {
   console.log('b4 authenticate reimb router ');
    if(!authenticateToken)
    return response.sendStatus(403);

console.log('after auth');
    ReimbService.getReimbursmentApproved().then(reimbursments => {
        response.json(reimbursments);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
})
/*
reimRouter.get('/denied',  (request, response, next) => {
    if(!authenticateToken)
    return response.sendStatus(403);

     const id = +request.params.id;
    ReimbService.getReimbursmentNeedAppoval().then(reimbursments => {
        response.json(reimbursments);
        next();
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    });
})
*/

reimRouter.post('', (request, response, next) => {
    if(!authenticateToken)
    return response.sendStatus(403);

    const reimb = request.body;
    ReimbService.createReimbursment(reimb)
    .then(newItem => {
        response.json(newItem);
    }).catch(err => {
        // console.log('err');
        response.sendStatus(500);
    }).finally(() => {
        next();
    })
});



reimRouter.patch('', (request, response, next) => {

    if(!authenticateToken)
    return response.sendStatus(403);

   // console.log('i am trying to patch');
    const reimb = request.body;
    ReimbService.patchReimbursment(reimb)
    .then(newItem => {
        response.json(newItem);
    }).catch(err => {
        console.log(err);
        response.sendStatus(500);
    }).finally(() => {
        next();
    })
});

// abstracts function to upload a file returning a promise
const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: process.env.S3_BUCKET,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`
  };
  return s3.upload(params).promise();
};

export const saveReimbursment = (req, resp, next) => {
console.log('i am saving reimbursment');
    const reimb = req.body;
    ReimbService.createReimbursment(reimb)
    .then(newItem => {
        resp.json(newItem);
    }).catch(err => {
        // console.log('err');
        resp.sendStatus(500);
    }).finally(() => {
        next();
    })
}



// Define POST route
reimRouter.post('/file-upload', async (request, response, next) => {
  const form = new multiparty.Form();
  console.log('trying to log reciept and save reciept' + JSON.stringify(request.body));
    form.parse(request, async (error, fields, files) => {
    // if (error) throw new Error(error);
      try {
        const path = files.file[0].path;
        const buffer = fs.readFileSync(path);
        const type = fileType(buffer);
        const timestamp = Date.now().toString();
        const fileName = `bucketFolder/${timestamp}-lg`;
        const data = await uploadFile(buffer, fileName, type);
       // const saveReim = await saveReimbursment(request, response, next);
        return response.status(200).send(data);
      } catch (error) {
        return response.status(400).send(error);
      }
    });
});
