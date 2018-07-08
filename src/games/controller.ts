import Game from './entity'
import { JsonController, Get, Post, Put, Param, Body, NotFoundError, BadRequestError, HttpCode, BodyParam } from 'routing-controllers'
import {defaultBoard, colors, randomColor, moves} from '../lib/gameconfig'

@JsonController()
export default class GameController {
  @Get('/games')
  async getGames() {
    return {
      games: await Game.find()
    }
  }

  @Post('/games')
  addGame(
    @HttpCode(201)
    @BodyParam('name', {required: true}) name :string
  ) {
    // const name = JSON.parse(JSON.stringify(body)).name,
    const game = new Game()
    if(!name) throw new BadRequestError("Missing required parameter 'name'.")
    console.log(typeof name)
    game.name = name
    game.board = JSON.parse(JSON.stringify(defaultBoard))
    game.color = randomColor()
    return game.save()
  }

  @Put('/games/:id')
  async updateGame(
    @Param('id') id: number,
    @Body() changes: Partial<Game>
  ) {
    const game = await Game.findOne(id)
    if (!game) throw new NotFoundError('Cannot find page')

    if(changes.id && changes.id !== id) throw new BadRequestError("Cannot change ID.")
    if(changes.color && !colors.includes(changes.color)) {
      throw new BadRequestError("Wrong color!")
    }

    if(changes.board && moves(changes.board, game.board) > 1 ) {
      throw new BadRequestError("Cheater! Only one move per turn allowed.")
    }
    return Game.merge(game, changes).save()
  }
}
