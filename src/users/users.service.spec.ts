import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersModule } from './users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        MongooseModule.forRoot(process.env.MONGO_URL),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
