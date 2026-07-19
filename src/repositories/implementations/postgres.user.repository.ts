import { db } from "../../config/db";
import { RegisterDTO } from "../../dto/register.dto";
import { User } from "../../types/user.type";
import { IUserRepository } from "../interfaces/user.repository.interface";
export class PostgresUserRepository implements IUserRepository {
  async createUser(data: RegisterDTO): Promise<User> {
    const result = await db.query<User>(
      `
      INSERT INTO users (
        username,
        email,
        mobile,
        password
      )
      VALUES ($1, $2, $3, $4)
      RETURNING *;
      `,
      [
        data.username,
        data.email,
        data.mobile,
        data.password,
      ]
    );

    return result.rows[0]!;
  }

  async findByEmail(email: string): Promise<User| null> {
    const result = await db.query<User>(
      `
      SELECT *
      FROM users
      WHERE email = $1;
      `,
      [email]
    );

    return result.rows[0] ?? null;
  }
  async findById(id: string): Promise<User | null> {
      const result = await db.query<User>(
        `
         SELECT *
         FROM users
         WHERE id =$1
        `,
        [id]
      )
     return result.rows[0] ?? null;
  }
}