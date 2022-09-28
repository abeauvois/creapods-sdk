import type { ValueOf } from './value-of'

const Category = {
  Work: 'work',
  Play: 'play',
  Relax: 'relax',
  Photo: 'photo',
  Audio: 'audio',
  Stream: 'stream',
  Create3D: 'create3d',
  CreateVR: 'createvr',
  PlayVR: 'playvr',
} as const

enum ResourceType {
  Pod,
}

interface Config {
  apiKey: string
  baseUrl?: string
  headers?: unknown
}

interface RoomOptions {
  id: string
  name: string
  location: string
  description?: string
  createdAt?: Date
  updatedAt?: Date
  groupsOptions?: GroupOptions[]
}

interface PodOptions {
  id: string
  name: string
  description: string
  type?: ResourceType.Pod
  createdAt?: Date
  updatedAt?: Date
}

interface BookingOptions {
  resourceId: string
  datetime: Date
  duration: number
}

interface Resource {
  id: string
  name: string
  description?: string
  createdAt?: Date
  updatedAt?: Date
}
type ResourceOptions = PodOptions

interface GroupOptions extends Resource {
  category: ValueOf<typeof Category>
}

export { Category, ResourceType }
export type {
  Config,
  RoomOptions,
  BookingOptions,
  GroupOptions,
  PodOptions,
  ResourceOptions,
  Resource,
}
