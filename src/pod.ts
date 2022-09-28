import { PodOptions, ResourceType } from './types'

const podOptionsDefault = {
  type: ResourceType.Pod,
  name: 'pod',
}

class Pod {
  id: string
  name: string
  type: ResourceType
  description: string
  createdAt: Date
  updatedAt: Date

  constructor(options: PodOptions) {
    this.id = options.id
    this.name = options.name || podOptionsDefault.name
    this.type = options.type || podOptionsDefault.type
    this.description = options.description
    this.createdAt = options.createdAt || new Date()
    this.updatedAt = options.updatedAt || new Date()
  }
}
class PodFactory {
  create = (options: PodOptions) => {
    const pod = new Pod(options)
    return pod
  }
}

export { PodFactory, ResourceType, Pod, podOptionsDefault }
export type { PodOptions }
