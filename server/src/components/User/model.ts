import { hash } from "bcryptjs";
import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  @Exclude()
  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert() async hashPassword() {
    this.password = await hash(this.password, 12);
  }
}
