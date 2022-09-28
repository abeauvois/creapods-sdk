import { Base } from './base'
import { GroupFactory } from './group'
import { ResourceType, PodFactory } from './pod'
import { RoomFactory } from './room'
import { Category } from './types'
import type { Config, RoomOptions, GroupOptions, PodOptions } from './types'

// applyMixins(Typicode, [Posts]);

class Creapods extends Base {
  constructor(config: Config) {
    super(config)
  }

  getTest = async () => {
    const rooms = await this.request('/posts/1')
    return rooms
  }

  getRooms = async () => {
    const rooms = await this.request('/getRooms')
    return rooms
  }

  createRoom = (options: RoomOptions) => {
    return new RoomFactory().create(options)
  }

  createGroup = (options: GroupOptions) => {
    return new GroupFactory().create(options)
  }

  createPod = (options: PodOptions) => {
    return new PodFactory().create(options)
  }

  display = () => {
    console.log('display')
  }
}

export { Creapods, RoomFactory, GroupFactory, PodFactory, Category }
export type { Config, ResourceType }
