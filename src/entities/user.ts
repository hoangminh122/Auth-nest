import { BelongsTo, BelongsToMany,Model,CreatedAt,UpdatedAt, Column,DeletedAt, DataType, ForeignKey, HasMany, IsUUID, PrimaryKey, Sequelize, Table } from "sequelize-typescript";

@Table({tableName:'user',timestamps:false})
export class User extends Model {
    @IsUUID(4)
    @PrimaryKey
    @Column({
        type:DataType.UUID,
        defaultValue:Sequelize.literal('uuid_generate_v4()')
    })
    id!:string;

    @Column({
        allowNull: false,
        field: 'first_name'
    })
    firstName: string;
    
    @Column({
    allowNull: false,
    field: 'last_name'
    })
    lastName: string;

    @Column({
        allowNull:false,
        type:DataType.STRING
    })
    email:string;

    @Column({
        allowNull:false,
        type:DataType.STRING
    })
    username: string;

    @Column({
        allowNull:false,
        type:DataType.STRING
    })
    password:string;

    @Column({
        allowNull:true,
        defaultValue:false,
        type:DataType.BOOLEAN
    })
    isVerify:boolean;

    @Column({
        defaultValue:false,
        type:DataType.BOOLEAN
    })
    isActive:boolean;

    @CreatedAt
    @Column({ allowNull:true, field: 'created_at', type: DataType.DATE })
    public createdAt: Date;

    @UpdatedAt
    @Column({  allowNull:true,field: 'updated_at', type: DataType.DATE })
    public updatedAt: Date;

    @DeletedAt
    @Column({  allowNull:true,field: 'deleted_at', type: DataType.DATE })
    public deletedAt: Date;

}