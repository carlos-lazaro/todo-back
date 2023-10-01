import { ObjectId } from "mongoose";

export class UserJsonwebtokenPayload {
  id: string | undefined;
  name: string | undefined;
  email: string | undefined;

  constructor(dependencies: { _id: ObjectId; name: string; email: string }) {
    dependencies._id && (this.id = dependencies._id.toString());
    dependencies.name && (this.name = dependencies.name);
    dependencies.email && (this.email = dependencies.email);
  }
}
