import { IsEmail, IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class CreateUserDto {
  @IsMongoId()
  @IsNotEmpty()
  _id: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  provider: string;

  @IsNotEmpty()
  @IsString()
  providerId: string;

  @IsNotEmpty()
  @IsString()
  picture: string;
}
