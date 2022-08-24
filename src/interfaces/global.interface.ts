import { Request } from 'express';
import { AccountInfo } from './auth.interface';

export interface MulterRequest extends Request {
  file: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    bucket: string;
    key: string;
    acl: string;
    contentType: string;
    metadata: {
      fieldName: string;
    };
    location: string; // file url
    etag: string;
  };
}

export interface MulterRequestWithAccount extends MulterRequest {
  account: AccountInfo;
}
