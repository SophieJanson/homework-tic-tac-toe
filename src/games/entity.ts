import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, IsJSON, Matches } from 'class-validator'

@Entity()
export default class Game extends BaseEntity {
  @PrimaryGeneratedColumn()
    id?: number

  @Column('text', {nullable:false})
    @IsString()
    name: string
  
    @Column('json', {nullable:false})
    @IsJSON()
    board: JSON 

    @Column('text', {nullable:false})
    @IsString()
    @Matches(/(red|blue|green|yellow|magenta)/i)
    color: string
}