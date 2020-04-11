const qiniu = require('qiniu')

class QiniuManager {
    constructor(accessKey, secretKey, bucket ) {
        //generate mac
        this.mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
        this.bucket = bucket

        // init config class
        this.config = new qiniu.conf.Config()
        // 空间对应的机房
        this.config.zone = qiniu.zone.Zone_z0

        this.bucketManager = new qiniu.rs.BucketManager(this.mac, this.config);
    }
}