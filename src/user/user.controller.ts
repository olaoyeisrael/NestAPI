import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EditUserDto } from './dto';
import { UserService } from './user.service';
import { GetUser } from '../Auth/decorator';
import { User } from '@prisma/client';


@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    
    @Get('me')
    getMe(@GetUser() user:User){
        return user
    }


    
    @Patch()
    editUser(
    @GetUser('id') userId: number,
    @Body() dto: EditUserDto,
  ) {
    return this.userService.editUser(userId, dto);
  }
}
