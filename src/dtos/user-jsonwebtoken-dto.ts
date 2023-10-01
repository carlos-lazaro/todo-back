export class UserJsonwebtokenDto {
  id: string | undefined;
  name: string | undefined;
  email: string | undefined;

  constructor(dependencies: { id: string; name: string; email: string }) {
    this.id = dependencies.id;
    this.name = dependencies.name;
    this.email = dependencies.email;
  }
}
