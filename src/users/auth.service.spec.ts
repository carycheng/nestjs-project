import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('AuthService', () => {
    let service: AuthService;
    let fakeUsersService: Partial<UsersService>;

    beforeEach( async () => {
        // Create a fake copy of the users service
        fakeUsersService = {
            find: () => Promise.resolve([]),
            create: (email: string, password: string) => Promise.resolve({ id: 1, email, password } as User)
        }
        const module = await Test.createTestingModule({
            providers: [AuthService, { provide: UsersService, useValue: fakeUsersService}]
        }).compile();
    
        service = module.get(AuthService);
    })
    
    it('can create an instance of auth service', async () => {
       
        expect(service).toBeDefined();
    });

    it('creates a new user with a salted and hashed password', async () => {
        const user = await service.signup('asdf@asdf.com', 'asdf');

        expect(user.password).not.toEqual('asdf');
        const [salt, hash] = user.password.split('.');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    });

    it('throws an error if user signs up with email that is already in use', (done) => {
        fakeUsersService.find = () => Promise.resolve([{ id: 1, email: 'a', password: '1' } as User])
        service.signup('asdf@asdf.com', 'asdf').catch(() => done());
    })

    it('throws if signin is called with an unused email', (done) => {
        service.signin('asdfasdf@asdf.com', 'password').catch(() => done());
    });

    it('throws if an invalid password is provided', (done) => {
        fakeUsersService.find = () => Promise.resolve([{ email: 'asdf@asdf.com', password: 'laskdjf'} as User ])
        service.signin('asdfasdf@asdf.com', 'password').catch(() => done());
    });

    it('returns a user if correct password is provided', async (done) => {
        fakeUsersService.find = () => Promise.resolve([{ email: 'asdf@asdf.com', password: 'laskdjf'} as User ])

        const user = await service.signin('asdf@asdf.com', 'password');
        console.log(user);
    });
});