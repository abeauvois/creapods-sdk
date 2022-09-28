import { GroupFactory } from './group'
import { PodFactory } from './pod'
import { RoomFactory } from './room'
import { Category, ResourceType } from './types'

beforeAll(() => {
  jest.useFakeTimers('modern')
  jest.setSystemTime(new Date(2020, 3, 1))
})

afterAll(() => {
  jest.useRealTimers()
})

describe('pods', () => {
  it('should create a pod', () => {
    const factory = new PodFactory()
    const pod = factory.create({
      id: '1',
      name: 'pod1',
      description: 'pod1 description',
    })
    expect(pod.name).toBe('pod1')
    expect(pod.createdAt).toStrictEqual(new Date(2020, 3, 1))
    expect(pod.type).toBe(ResourceType.Pod)
  })

  it('should create a group of pods', () => {
    const podFactory = new PodFactory()
    const pod = podFactory.create({
      id: '1',
      name: 'pod1',
      description: 'pod1 description',
    })

    const groupFactory = new GroupFactory()
    const group = groupFactory.create({
      id: 'group1',
      name: 'pods 3D',
      category: Category.Create3D,
    })

    expect(group.id).toBe('group1')
    expect(group.name).toBe('pods 3D')
    expect(group.createdAt).toStrictEqual(new Date(2020, 3, 1))
    expect(group.category).toBe(Category.Create3D)
    expect(group.resources).toStrictEqual([])

    group.addResource(pod)

    expect(group.resources).toStrictEqual([pod])
  })
  it('should create a room with groups', () => {
    const roomFactory = new RoomFactory()
    const room = roomFactory.create({
      id: 'room1',
      name: "Sentier's Room",
      location: '2 rue du sentier, 75002 PARIS',
      groupsOptions: [{ id: 'g1', name: 'g1 relax', category: Category.Relax }],
    })

    expect(room.id).toBe('room1')
    expect(room.name).toBe("Sentier's Room")
    expect(room.createdAt).toStrictEqual(new Date(2020, 3, 1))
    expect(room.location).toBe('2 rue du sentier, 75002 PARIS')
    expect(room.groups[0]?.id).toBe('g1')
    expect(room.groups[0]?.category).toBe(Category.Relax)
  })
  it('should book a resource from a group', () => {
    const roomFactory = new RoomFactory()
    const room = roomFactory.create({
      id: 'room1',
      name: "Sentier's Room",
      location: '2 rue du sentier, 75002 PARIS',
      groupsOptions: [{ id: 'g1', name: 'g1 relax', category: Category.Relax }],
    })

    const podOptions = {
      id: 'p1',
      name: 'pod1',
      description: 'pod1 description',
    }

    room.groups[0]?.addResource({ type: ResourceType.Pod, ...podOptions })

    expect(room.groups[0]?.resources[0]?.id).toBe(podOptions.id)
    expect(room.groups[0]?.resources[0]?.createdAt).toStrictEqual(
      new Date(2020, 3, 1)
    )

    const book = room.groups[0]?.book({
      resourceId: podOptions.id,
      datetime: new Date(2020, 3, 1, 10, 0),
      duration: 60,
    })

    // room.groups[0]?.displayBookings(new Date(2020, 3, 1, 10, 0))

    expect(book?.resourceId).toBe(podOptions.id)
    expect(book?.datetime).toStrictEqual(new Date(2020, 3, 1, 10, 0))
  })
  it('should reject a conflicting resource booking', () => {
    const roomFactory = new RoomFactory()
    const room = roomFactory.create({
      id: 'room1',
      name: "Sentier's Room",
      location: '2 rue du sentier, 75002 PARIS',
      groupsOptions: [{ id: 'g1', name: 'g1 relax', category: Category.Relax }],
    })

    const podOptions = {
      id: 'p1',
      name: 'pod1',
      description: 'pod1 description',
    }

    room.groups[0]?.addResource({ type: ResourceType.Pod, ...podOptions })

    room.groups[0]?.book({
      resourceId: podOptions.id,
      datetime: new Date(2020, 3, 1, 10, 0),
      duration: 60,
    })
    const book2 = room.groups[0]?.book({
      resourceId: podOptions.id,
      datetime: new Date(2020, 3, 1, 9, 30),
      duration: 60,
    })
    const book3 = room.groups[0]?.book({
      resourceId: podOptions.id,
      datetime: new Date(2020, 3, 1, 10, 30),
      duration: 60,
    })

    expect(book2).toBeNull()
    expect(book3).toBeNull()
  })
  it('should look for other free resources from the same group', () => {
    const roomFactory = new RoomFactory()
    const room = roomFactory.create({
      id: 'room1',
      name: "Sentier's Room",
      location: '2 rue du sentier, 75002 PARIS',
      groupsOptions: [{ id: 'g1', name: 'g1 relax', category: Category.Relax }],
    })

    const podOptions = {
      id: 'p1',
      name: 'pod1',
      description: 'pod1 description',
    }
    const pod2Options = {
      id: 'p2',
      name: 'pod2',
      description: 'pod2 description',
    }

    room.groups[0]?.addResource({ type: ResourceType.Pod, ...podOptions })
    room.groups[0]?.addResource({ type: ResourceType.Pod, ...pod2Options })

    room.groups[0]?.book({
      resourceId: podOptions.id,
      datetime: new Date(2020, 3, 1, 10, 0),
      duration: 60,
    })

    const book2 = room.groups[0]?.book({
      resourceId: podOptions.id,
      datetime: new Date(2020, 3, 1, 9, 30),
      duration: 60,
    })

    expect(book2?.resourceId).toBe(pod2Options.id)
  })
})
