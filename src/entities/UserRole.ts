import { Column, DataType, ForeignKey, HasMany, IsUUID, Model, PrimaryKey, Sequelize, Table } from "sequelize-typescript";
import { Role } from "./Role";
import { User } from "./User";

@Table({tableName:'user_role',timestamps:false})
export class UserRole extends Model {
    
    @Column({
        field:'user_id',
        primaryKey:true,
        type:DataType.STRING(50)
    })
    @ForeignKey(()=>User)
    userId!:string

    @Column({
        field:'role_id',
        primaryKey:true,
        type:DataType.STRING(50)
    })
    @ForeignKey(()=>Role)
    roleId!:string;

   

}