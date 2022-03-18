import { ISignUpDTO } from "@auth/SignUp/SignUpDTO";
import { ISignInDTO } from "@auth/SignIn/SignInDTO";

export interface IUsersRepository {
  findByEmail(email: string): Promise<ISignUpDTO>;
  save(user: ISignUpDTO): Promise<ISignUpDTO>;
  comparePassword(user: ISignInDTO): Promise<Boolean>;
}
