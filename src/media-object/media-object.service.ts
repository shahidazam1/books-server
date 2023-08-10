import { Injectable } from '@nestjs/common';
import { UploadResource } from './resources/upload.resource';

@Injectable()
export class MediaObjectService {
  public readonly uploadResource: UploadResource;

  constructor() {
    this.uploadResource = new UploadResource();
  }
}
