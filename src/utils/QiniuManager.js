const qiniu = require('qiniu')

class QiniuManager {
    constructor(accessKey, secretKey, bucket ) {
        //generate mac
        this.mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
        this.bucket = bucket

        // init config class
        this.config = new qiniu.conf.Config()
        // huadong zone
        this.config.zone = qiniu.zone.Zone_z0

        this.bucketManager = new qiniu.rs.BucketManager(this.mac, this.config);
    }
    uploadFile(key, localFilePath) {
        // generate uploadToken
        const options = {
          scope: this.bucket + ":" + key,
        };
        const putPolicy = new qiniu.rs.PutPolicy(options)
        const uploadToken=putPolicy.uploadToken(this.mac)
        const formUploader = new qiniu.form_up.FormUploader(this.config)
        const putExtra = new qiniu.form_up.PutExtra()
        //upload
        return new Promise((resolve, reject) => {
          formUploader.putFile(uploadToken, key, localFilePath, putExtra, this._handleCallback(resolve, reject));
        })
    
    }
}