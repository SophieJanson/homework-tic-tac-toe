import Game from './entity'
import { JsonController, Get, Post, Put, Param, Body, NotFoundError, BadRequestError } from 'routing-controllers'

@JsonController()
export default class GameController {
  @Get('/games')
  async getGames(
  ) {
    return {
      games: await Game.find()
    }
  }
  colors = ['red', 'blue', 'green', 'yellow', 'magenta'] 

  @Post('/games')
  addGame(
    @Body() body :string
  ) {
    const defaultBoard = [
      ['o', 'o', 'o'],
      ['o', 'o', 'o'],
      ['o', 'o', 'o']
    ]
    const color = this.colors[Math.floor(Math.random() * 4) - 1]
    let game = new Game()
    game.name = JSON.parse(JSON.stringify(body)).name
    game.board = JSON.parse(JSON.stringify(defaultBoard))
    game.color = color
    return game.save()
  }

  @Put('/games/:id')
  async updateGame(
    @Param('id') id: number,
    @Body() changes: Partial<Game>
  ) {
    const game = await Game.findOne(id)
    if (!game) throw new NotFoundError('Cannot find page')
    if(changes.color && !this.colors.includes(changes.color)) {
      throw new BadRequestError("You chose the wrong color!")
    }
    return Game.merge(game, changes).save()
  }
}
