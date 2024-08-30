import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users.module';
import { User, UserSchema } from './user.schema';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        MongooseModule.forRoot(process.env.MONGO_URL),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        UsersModule,
      ],
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
