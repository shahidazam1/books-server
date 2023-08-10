import {
  Controller,
  HttpException,
  NotFoundException,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { UploadResource } from './resources/upload.resource';

@Controller('media-object')
export class MediaObjectController {
  constructor(private readonly uploadResource: UploadResource) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  uploadMedia(@UploadedFile() file: Express.Multer.File) {
    try {
      if (!file?.originalname) {
        throw new NotFoundException('File not found');
      }
      return this.uploadResource.uploadImage({
        file: file,
        type: 'book',
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
