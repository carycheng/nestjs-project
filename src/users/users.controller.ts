import { Body, Controller, Post, Get, Patch, Param, Query, Delete } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        this.usersService.create(body.email, body.password);
    }

    @Get('/:id')
    findUser(@Param('id') id: string) {
        this.usersService.fineOne(parseInt(id));
    }

    @Get()
    findAllUsers(@Query('email') email: string) {
        this.usersService.find(email);
    }
    
    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.usersService.remove(parseInt(id));
    }

    @Patch(':/id')
    updateUser(@Param('id') id: string, body: UpdateUserDto) {
        return this.usersService.update(parseInt(id), body);
    }
}
