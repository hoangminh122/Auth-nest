import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { Transaction } from "sequelize";
@Injectable()
export class UnitOfWork {
  constructor(
    @Inject(forwardRef(() => 'SequelizeInstance'))
    private readonly sequelizeInstance,
  ) {}

  async scope<T>(callback: (trans) => Promise<T>): Promise<T> {
    const isolationLevel = Transaction.ISOLATION_LEVELS.SERIALIZABLE;


    return new Promise<T>((resolve, reject) => {
      this.sequelizeInstance
        .transaction({ isolationLevel }, callback)
        .then(value => {
          resolve(value);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}