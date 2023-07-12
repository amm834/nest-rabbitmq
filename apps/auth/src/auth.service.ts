import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  createUser(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ email });
    if (user && user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user, response: any) {
    const payload = { email: user.email, sub: user._id };
    const token = this.jwtService.sign(payload);
    response.cookie('Authentication', token, { httpOnly: true });
  }
}
