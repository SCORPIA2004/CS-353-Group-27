import { Injectable, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { loginDto } from '@/src/users/dto/login.dto';
import { connection } from '@/db';
import { registerDto } from '@/src/users/dto/register.dto';
import { getUserQuery, loginQuery, registerQuery } from '@/db/db.queries';
import { RowDataPacket } from 'mysql2';
import { encode } from '@/encryption/encoding';

@Injectable()
export class UsersService {

  @HttpCode(HttpStatus.OK)
  async login(data: loginDto) {
    const [QueryResult] = await connection.execute(loginQuery(data.email, data.password));

    if ((QueryResult as RowDataPacket[]).length === 0) {
      throw new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED); // Return 401 for unauthorized
    }

    return encode({ email: data.email, role: (QueryResult as RowDataPacket[])[0].role });
  }

  @HttpCode(HttpStatus.OK)
  async register(data: registerDto) {
    const [QueryResult] = await connection.execute(getUserQuery(data.email));

    if ((QueryResult as RowDataPacket[]).length > 0) {
      throw new HttpException(`User with email ${data.email} already exists`, HttpStatus.BAD_REQUEST); // Return 400 for bad request
    }

    await connection.execute(registerQuery(data.email, data.password, data.firstname, data.lastname, data.dob, data.role));
    return encode({ email: data.email, role: data.role });
  }
}
