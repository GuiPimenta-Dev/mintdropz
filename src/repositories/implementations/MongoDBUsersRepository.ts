import { IUsersRepository } from "../IUsersRepository";
import { ISignUpDTO } from "@auth/SignUp/SignUpDTO";
import { ISignInDTO } from "@auth/SignIn/SignInDTO";
export class MongoDbUsersRepository implements IUsersRepository {
  private users: any;
  constructor(schema) {
    this.users = schema;
  }

  async findByEmail(email: string): Promise<ISignUpDTO> {
    const user = await this.users.findOne({ email }).lean();

    return user;
  }

  async save(user: ISignUpDTO): Promise<ISignUpDTO> {
    await this.users.create(user);

    return user;
  }

  async comparePassword(dto: ISignInDTO): Promise<Boolean> {
    const user = await this.users.findOne({ email: dto.email });
    return await user.comparePassword(dto.password);
  }
}
