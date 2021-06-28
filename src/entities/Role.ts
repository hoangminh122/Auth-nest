import { BelongsTo, BelongsToMany,Model,CreatedAt,UpdatedAt, Column,DeletedAt, DataType, ForeignKey, HasMany, IsUUID, PrimaryKey, Sequelize, Table } from "sequelize-typescript";

@Table({tableName:'role',timestamps:false})
export class Role extends Model {
    @IsUUID(4)
    @PrimaryKey
    @Column({
        type:DataType.UUID,
        defaultValue:Sequelize.literal('uuid_generate_v4()')
    })
    id!:string;

    @Column({
        allowNull: false,
        field: 'name'
    })
    roleName: string;

    @Column({
        field: 'description'
    })
    description: string;
    
   

    @CreatedAt
    @Column({ field: 'created_at', type: DataType.DATE })
    public createdAt: Date;

    @UpdatedAt
    @Column({ field: 'updated_at', type: DataType.DATE })
    public updatedAt: Date;

    @DeletedAt
    @Column({ field: 'daleted_at', type: DataType.DATE })
    public deletedAt: Date;

}