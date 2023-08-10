import {
  BadRequestException,
  HttpException,
  Injectable,
  Query,
} from '@nestjs/common';
import { MediaObject } from 'src/media-object/entities/media-object.entity';
import { BookQueryDto, CreateBookDto, UpdateBookDto } from '../dto/book.dto';
import { Book } from '../entities/book.entity';

@Injectable()
export class BooksService {
  async create(body: CreateBookDto) {
    try {
      const title = await Book.findOne({ where: { title: body.title } });
      if (title) {
        throw new BadRequestException(
          `A Book with this title already exists` + title?.title,
        );
      }

      let book = new Book();
      book.title = body.title;
      book.description = body.description;
      book.discountRate = body.discountRate;
      book.price = body.price;

      if (body.coverImage) {
        const media = await MediaObject.findOne({
          where: { key: body.coverImage },
        });
        if (!media) {
          throw new BadRequestException(`Cover Image not found`);
        }

        book.coverImage = media?.key;
      }

      await book.save();

      return {
        success: true,
        message: 'Book created successfully',
        data: book,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(@Query() query: BookQueryDto) {
    try {
      const builder = Book.createQueryBuilder('b');

      if (query.search) {
        builder.where('b.title LIKE :title', {
          title: `%${query.search}%`,
        });
      }

      const count = await builder.getCount();

      if (query.limit) {
        builder.limit(+query.limit);
      }

      if (query.offset) {
        builder.offset(+query.offset);
        if (!query.limit) {
          builder.limit(Number.MAX_SAFE_INTEGER);
        }
      }

      const books = await builder.getMany();

      return { count, books };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number) {
    try {
      const book = await Book.findOne({ where: { id } });
      if (!book) {
        throw new BadRequestException(`Book not found`);
      }

      return book;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: number, body: UpdateBookDto) {
    try {
      const book = await Book.findOne({ where: { id } });
      if (!book) {
        throw new BadRequestException(`Book not found`);
      }

      const title = await Book.findOne({ where: { title: body.title } });
      if (title && title.id !== id) {
        throw new BadRequestException(
          `A Book with this title already exists` + title?.title,
        );
      }

      book.title = body.title;
      book.description = body.description;
      book.discountRate = body.discountRate;
      book.price = body.price;
      if (body.coverImage) {
        const media = await MediaObject.findOne({
          where: { key: body.coverImage },
        });
        if (!media) {
          throw new BadRequestException(`Cover Image not found`);
        }

        book.coverImage = media?.key;
      }

      await book.save();

      return {
        success: true,
        message: 'Book updated successfully',
        data: book,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: number) {
    try {
      const book = await Book.findOne({ where: { id } });
      if (!book) {
        throw new BadRequestException(`Book not found`);
      }

      await book.remove();

      return {
        success: true,
        message: 'Book deleted successfully',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
