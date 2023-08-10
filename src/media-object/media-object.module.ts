import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaObject } from './entities/media-object.entity';
import { MediaObjectController } from './media-object.controller';
import { MediaObjectService } from './media-object.service';
import { UploadResource } from './resources/upload.resource';

@Module({
  imports: [TypeOrmModule.forFeature([MediaObject])],
  controllers: [MediaObjectController],
  providers: [MediaObjectService, UploadResource],
  exports: [MediaObjectService],
})
export class MediaObjectModule {}
