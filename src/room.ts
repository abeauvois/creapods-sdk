import { GroupFactory } from './group'
import type { Group, GroupOptions } from './group'
import { RoomOptions } from './types'

class Room {
  id: string
  name: string
  location: string
  description: string
  createdAt: Date
  updatedAt: Date

  groups: Group[]

  constructor(options: RoomOptions) {
    this.id = options.id
    this.name = options.name
    this.location = options.location
    this.description = options.description || ''
    this.createdAt = options.createdAt || new Date()
    this.updatedAt = options.updatedAt || new Date()
    this.groups = []
    if (options.groupsOptions) {
      this.groups = options.groupsOptions.map((group) => {
        return this.addGroup(group)
      })
    }
  }

  addGroup = (groupOtions: GroupOptions) => {
    const group = new GroupFactory().create(groupOtions)
    if (group) {
      console.log('group added', group)
      this.groups.push(group)
      return group
    }
    throw new Error('group not added')
  }

  display = () => {
    console.log(`Room: ${this.name}`)
    this.groups.forEach((group) => {
      group.display()
    })
  }
}

class RoomFactory {
  create = (options: RoomOptions): Room => {
    return new Room(options)
  }
}

export { RoomFactory, Room }
