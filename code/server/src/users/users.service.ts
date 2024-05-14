import { Injectable, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { loginDto } from '@/src/users/dto/login.dto';
import { connection } from '@/db';
import { registerDto } from '@/src/users/dto/register.dto';
import { RowDataPacket } from 'mysql2';
import { encode } from '@/encryption/encoding';
import { createTraineeQuery, createTrainerQuery, getUserQuery, loginQuery, registerQuery } from '@/db/user.queries';
import { Role } from '@/enum/role.enum';
import { trainerRegisterDto } from '@/src/users/dto/trainer.register.dto';
import { traineeRegisterDto } from '@/src/users/dto/trainee.register.dto';

@Injectable()
export class UsersService {

  async login(data: loginDto) {
    const [QueryResult] = await connection.execute(loginQuery(data.email, data.password));

    if ((QueryResult as RowDataPacket[]).length === 0) {
      throw new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED); // Return 401 for unauthorized
    }

    return encode({
      id: (QueryResult as RowDataPacket[])[0].id,
      email: data.email,
      role: (QueryResult as RowDataPacket[])[0].role,
    });
  }

  async register(data: trainerRegisterDto | traineeRegisterDto, role: Role) {
    const [QueryResult] = await connection.execute(getUserQuery(data.email));

    if ((QueryResult as RowDataPacket[]).length > 0) {
      throw new HttpException(`User with email ${data.email} already exists`, HttpStatus.BAD_REQUEST); // Return 400 for bad request
    }

    const res = await connection.execute(registerQuery(data.email, data.password, data.firstname, data.lastname, data.dob, role));
    const userId = (res as RowDataPacket[])[0].insertId;

    if (role === Role.TRAINER && !(data instanceof traineeRegisterDto)) {
      await connection.execute(createTrainerQuery(userId, data.experience, data.speciality));
    } else if (role === Role.TRAINEE && !(data instanceof trainerRegisterDto)) {
      await connection.execute(createTraineeQuery(userId, data.height, data.weight));
    }

    return encode({
      id: userId,
      email: data.email,
      role: role,
    });
  }
}
