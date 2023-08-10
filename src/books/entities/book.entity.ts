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
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  discountRate: number;

  @Column()
  coverImage: string;

  @Column()
  price: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  coverImageUrl: string;

  @AfterLoad()
  getUrl() {
    if (this.coverImage) {
      this.coverImageUrl = `${process.env.AWS_BASE_URL}/${this.coverImage}`;
    }
  }
}
