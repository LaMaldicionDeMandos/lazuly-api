const
  AWS = require('aws-sdk'),
  Bluebird = require('bluebird');

const apiKey = config.get('aws.s3.api_key');
const secret = config.get('aws.s3.secret');
const bucket = config.get('aws.s3.bucket');

console.log(`Credenciales: api key: ${apiKey}, secret: ${secret}, bucket: ${bucket}`);
const _s3 = Bluebird.promisifyAll(new AWS.S3({
  accessKeyId: apiKey,
  secretAccessKey: secret,
  params: {Bucket: bucket}
}));

class FileBuilder {
  constructor(service, fileName, data) {
    this.service = service;
    this.fileName = fileName;
    this.data = data;
  }

  encoded(encode) {
    this.encode = encode;
    return this;
  }

  contentType(contentType) {
    this.mimeType = contentType;
    return this;
  }

  upload() {

    return this.service.upload(this.fileName, this.data, this.encode, this.mimeType);
  }

}

class FileStorageService {
  builder(fileName, data) {
    return new FileBuilder(this, fileName, data);
  }

  upload(fileName, data, encoding, contentType) {
    var params = {
      Key: fileName,
      Body: data,
      ACL: 'public-read'
    };
    if (encoding) {
      params.ContentEncoding = encoding;
    }
    if (contentType) {
      params.ContentType = contentType;
    }
    return _s3.uploadAsync(params)
      .then((uploadedData) => {
        return uploadedData.Location;
      });
  }
}

module.exports = FileStorageService;

