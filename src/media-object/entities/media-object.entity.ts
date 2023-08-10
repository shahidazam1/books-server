import {
  AfterLoad,
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class MediaObject extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  originalFileName: string;

  @Column()
  key: string;

  @Column()
  type: string;

  @Column({ nullable: true })
  subtype: string;

  @Column({ nullable: true })
  typeId: number;

  @Column()
  mediaType: string;

  @Column()
  mimeType: string;

  @Column()
  fileSize: number;

  @Column({ type: 'json' })
  storageDetails: any;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  url: string;

  @AfterLoad()
  updateUrls() {
    this.url = `${process.env.AWS_BASE_URL}/${this.key}`;
  }
}
