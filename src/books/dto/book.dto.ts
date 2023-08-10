import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'title' })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'Description' })
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'Discount Rate' })
  @Min(1)
  @Max(99)
  discountRate: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'Cover Image' })
  coverImage: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'Price' })
  price: number;
}

export class BookQueryDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, description: 'search' })
  search: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, description: 'limit' })
  limit: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, description: 'offset' })
  offset: string;
}

export class UpdateBookDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'title' })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'Description' })
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'Discount Rate' })
  discountRate: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'Cover Image' })
  coverImage: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'Price' })
  price: number;
}
