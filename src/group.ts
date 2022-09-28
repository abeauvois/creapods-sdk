import { Booking, BookingOptions } from './booking'
import { PodFactory, podOptionsDefault } from './pod'
import type { Category, GroupOptions, Resource, ResourceOptions } from './types'
import { ValueOf } from './value-of'

class Group {
  id: string
  name: string
  category: ValueOf<typeof Category>
  description: string
  createdAt: Date
  updatedAt: Date

  resources: Resource[]
  bookings: Booking[]

  constructor(options: GroupOptions) {
    this.id = options.id
    this.name = options.name || podOptionsDefault.name
    this.category = options.category
    this.description = options.description || ''
    this.createdAt = options.createdAt || new Date()
    this.updatedAt = options.updatedAt || new Date()

    this.resources = []
    this.bookings = []
  }

  display = () => {
    console.log(`  Group : ${this.name}`)
    this.displayResources()
  }

  addResource = (resourceOptions: ResourceOptions) => {
    const m = new PodFactory().create(resourceOptions)
    if (m) {
      this.resources.push(m)
    }
  }

  displayResources = () => {
    this.resources.forEach((resource) => {
      console.log(resource)
    })
  }

  book = (bookingOptions: BookingOptions) => {
    // is there any conflict?
    const hasConflict = !this.checkAvailability(bookingOptions)

    if (hasConflict) {
      // find next available resource from this group
      const availableResources = this.findAvailableResources(
        bookingOptions.datetime,
        bookingOptions.duration
      )
      if (availableResources.length > 0 && availableResources[0]) {
        // book on the first available resource
        const availableResource = availableResources[0]
        const alternativeBooking = new Booking({
          ...bookingOptions,
          resourceId: availableResource.id,
        })
        this.bookings.push(alternativeBooking)
        return alternativeBooking
      } else {
        return null
      }
    } else {
      // book on this resource
      const expectedBooking = new Booking(bookingOptions)
      this.bookings.push(expectedBooking)
      return expectedBooking
    }
  }

  checkAvailability = (bookingOptions: BookingOptions): boolean => {
    const expectedBooking = new Booking(bookingOptions)
    const hasConflict = this.bookings.find((booking) => {
      return (
        booking.resourceId === expectedBooking.resourceId &&
        expectedBooking.getEndDatetime().getTime() >
          booking.datetime.getTime() &&
        expectedBooking.datetime.getTime() < booking.getEndDatetime().getTime()
      )
    })
    return !hasConflict
  }

  findAvailableResources = (datetime: Date, duration: number): Resource[] => {
    const availableResources = this.resources.filter((resource) => {
      return this.checkAvailability({
        resourceId: resource.id,
        datetime,
        duration,
      })
    })
    return availableResources
  }

  getBookings = (resourceId: string) => {
    return this.bookings.filter((booking) => {
      return booking.resourceId === resourceId
    })
  }

  getBookingsByDate = (resourceId: string, date: Date) => {
    return this.bookings.filter((booking) => {
      return (
        booking.resourceId === resourceId &&
        booking.datetime.getDate() === date.getDate() &&
        booking.datetime.getMonth() === date.getMonth() &&
        booking.datetime.getFullYear() === date.getFullYear()
      )
    })
  }

  displayBookings = (datetime: Date) => {
    this.bookings.forEach((booking) => {
      booking.display(datetime, 48, 30)
    })
  }
}

class GroupFactory {
  create = (options: GroupOptions): Group => {
    return new Group(options)
  }
}

export { GroupFactory, Category }
export type { Group, GroupOptions }
