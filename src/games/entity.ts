import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString } from 'class-validator'

const defaultBoard = [
	['o', 'o', 'o'],
	['o', 'o', 'o'],
	['o', 'o', 'o']
]

const colors = ['red', 'blue', 'green', 'yellow', 'magenta'] 
const color = colors[Math.floor(Math.random() * 4) - 1]

@Entity()
export default class Game extends BaseEntity {
  @PrimaryGeneratedColumn()
    id?: number

  @Column('text', {nullable:false})
    @IsString()
    name: string
  
    @Column('json', {nullable:false, default: defaultBoard})
    @IsString()
    board: JSON

    @Column('text', {nullable:false, default: color})
    @IsString()
    color: string
}