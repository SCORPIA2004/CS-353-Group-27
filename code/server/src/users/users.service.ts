import { Injectable } from "@nestjs/common";
import { loginDto } from "@/src/users/dto/login.dto";
import { connection } from "@/db";

@Injectable()
export class UsersService {

  async login(data: loginDto) {
    console.log('Logging in user:', data);
    const res = await connection.execute("show databases");
    console.log('Result:', res);
    return 'login';
  }
}
