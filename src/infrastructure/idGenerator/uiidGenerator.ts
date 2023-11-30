import { IIdGenerator } from "../../domain/interfaces/IIdGenerator";

import { v4 as uuid4 } from "uuid";

export class UuidGenerator implements IIdGenerator {
  generate(): string {
    return uuid4();
  }
}
