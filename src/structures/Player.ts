import { RoboRumble } from '../utils/RoboRamble'
import type { PlayerResponse } from '../types/PlayerResponse'
import type { BattleLogResponse } from 'types/BattleLogResponse'
import type { Brawler, Gadget, Gear, StarPower } from '../types/Brawler'
export class Player {
	public tag: string
	public name: string
	public nameColor: string
	public icon: { id: number }
	public trophies: number
	public level: number
	public xp: number
	public highestTrophies: number
	public highestPowerPlayPoints: number
	public isQualifiedFromChampionshipChallenge: boolean
	public soloVictories: number
	public duoVictories: number
	public '3vs3Victories': number
	public bestRoboRumbleTime: string
	public club: { name: string; tag: string }
	public brawlers: Brawler[]
	public battlelog: BattleLogResponse[]
	constructor(data: PlayerResponse) {
		this.name = data.name
		this.tag = data.tag
		this.nameColor = data.nameColor
		this.icon = data.icon
		this.trophies = data.trophies
		this.level = data.expLevel
		this.xp = data.expPoints
		this.highestTrophies = data.highestTrophies
		this.highestPowerPlayPoints = data.highestPowerPlayPoints
		this.isQualifiedFromChampionshipChallenge = data.isQualifiedFromChampionshipChallenge
		this.soloVictories = data.soloVictories
		this.duoVictories = data.duoVictories
		this['3vs3Victories'] = data['3vs3Victories']
		this.bestRoboRumbleTime = RoboRumble[data.bestRoboRumbleTime]
		this.club = data.club
		this.brawlers = data.brawlers
		this.battlelog = data.battlelog
	}
	public getBrawler(name: string): Brawler | undefined {
		return this.brawlers.find(
			(brawler) => brawler.name.toLowerCase() === name.toLowerCase()
		)
	}
	public getGadget(name: string): Gadget | undefined {
		return this.brawlers
			.find((brawler: Brawler) =>
				brawler.gadgets.some((gadget) => gadget.name.toLowerCase() === name.toLowerCase())
			)
			?.gadgets.find((gadget) => gadget.name.toLowerCase() === name.toLowerCase())
	}
	public getStarPower(name: string): StarPower | undefined {
		return this.brawlers
			.find((brawler) =>
				brawler.starPowers.some(
					(starPower) => starPower.name.toLowerCase() === name.toLowerCase()
				)
			)
			?.starPowers.find(
				(starPower) => starPower.name.toLowerCase() === name.toLowerCase()
			)
	}
	public getGear(name: string): Gear | undefined {
		return this.brawlers
			.find((brawler) =>
				brawler.gears.some((gear) => gear.name.toLowerCase() === name.toLowerCase())
			)
			?.gears.find((gear) => gear.name.toLowerCase() === name.toLowerCase())
	}
	public sortBrawlers(
		filter: 'TROPHIES' | 'POWER' | 'RANK',
		criteria: 'ASCENDING' | 'DESCENDING'
	): Brawler[] {
		switch (filter) {
			case 'TROPHIES':
				{
					return criteria === 'ASCENDING'
						? this.brawlers.sort((a, b) => b.trophies - a.trophies)
						: this.brawlers.sort((a, b) => a.trophies - b.trophies)
				}
				break
			case 'POWER':
				{
					return criteria === 'ASCENDING'
						? this.brawlers.sort((a, b) => b.power - a.power)
						: this.brawlers.sort((a, b) => a.power - b.power)
				}
				break
			case 'RANK':
				{
					return criteria === 'ASCENDING'
						? this.brawlers.sort((a, b) => b.rank - a.rank)
						: this.brawlers.sort((a, b) => a.rank - b.rank)
				}
				break
			default: {
				return this.brawlers
			}
		}
	}
}
