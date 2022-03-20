import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { ISignUpDTO } from "./SignUpDTO";
import { IMailProvider } from "../../../providers/IMailProvider";

export class SignUpUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute(dto: ISignUpDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(dto.email);

    if (!!userAlreadyExists) {
      throw new Error("User already exists.");
    }

    this.mailProvider.sendMail({
      to: {
        name: dto.name,
        email: dto.email,
      },
      from: {
        name: "Equipe do Meu App",
        email: "equipe@meuapp.com",
      },
      subject: "Seja bem-vindo à plataforma",
      body: "<p>Você já pode fazer login em nossa plataforma.</p>",
    });

    const { name, email } = await this.usersRepository.create(dto);

    return { name, email };
  }
}
