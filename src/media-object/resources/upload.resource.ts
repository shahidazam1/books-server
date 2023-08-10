import { v4 as uuidv4 } from 'uuid';
import { MediaObjectManager } from '../media-object.manager';

export interface UploadProps {
  file: Express.Multer.File;
  typeId?: number;
  type: string;
}

export class UploadResource extends MediaObjectManager {
  public async uploadImage(props: UploadProps) {
    const fileExtension = props.file.originalname.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;

    return this.uploadToS3bucket({
      type: props?.type,
      file: props.file,
      key: fileName,
      mediaType: this.getMediaType(props.file.mimetype),
      typeId: props.typeId,
    });
  }
}
