import { BelongsTo, BelongsToMany,Model, Column, DataType, ForeignKey, HasMany, IsUUID, PrimaryKey, Sequelize, Table } from "sequelize-typescript";

@Table({tableName:'board',timestamps:false})
export class Board extends Model{
    @IsUUID(4)
    @PrimaryKey
    @Column({
        type:DataType.UUID,
        defaultValue:Sequelize.literal('uuid_generate_v4()')
    })
    id :string;

    @Column({
        type:DataType.STRING,
    })
    name:string;

    @Column({
        type:DataType.STRING,
    })
    bgUrl:string;

    //level : private,public,...
    @Column({
        type:DataType.STRING,
    })
    visibility:string;

   
   

}