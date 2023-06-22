import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdateUserRequestDto, FindUserRequestDto } from './user.dto';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public async updateUser(payload: UpdateUserRequestDto): Promise<any> {
    let user: User = await this.repository.findOne({
      where: { email: payload.email },
    });
    if (!user) user = new User();
    user.address = payload.address;
    user.email = payload.email;
    user.profileImage = payload.profileImage;
    await user.save();

    return { error: null, status: HttpStatus.OK };
  }

  public async findUser(payload: FindUserRequestDto): Promise<any> {
    const user: User = await this.repository.findOne({
      where: { email: payload.email },
    });
    if (!user) throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
    return { data: user, error: null, status: HttpStatus.OK };
  }
}
