import { BookingOptions } from './types'

class Booking {
  resourceId: string
  datetime: Date
  duration: number

  constructor(options: BookingOptions) {
    this.resourceId = options.resourceId
    this.datetime = options.datetime
    this.duration = options.duration || 0
  }

  getEndDatetime = () => {
    return new Date(this.datetime.getTime() + this.duration * 60000)
  }

  display = (
    dayStartDatetime: Date,
    nbSlotsPerDay: number,
    slotDurationInMinutes: number
  ) => {
    const start = this.datetime.getHours() * 60 + this.datetime.getMinutes()
    const end =
      this.getEndDatetime().getHours() * 60 + this.getEndDatetime().getMinutes()

    const startSlot = Math.floor((nbSlotsPerDay * start) / (24 * 60))
    const endSlot = Math.floor((nbSlotsPerDay * end) / (24 * 60))

    for (let i = 0; i <= nbSlotsPerDay; i++) {
      const firstSlotDatetime = new Date(
        dayStartDatetime.getFullYear(),
        dayStartDatetime.getMonth(),
        dayStartDatetime.getDate(),
        0,
        0,
        0,
        0
      )
      const time = new Date(
        firstSlotDatetime.getTime() + i * slotDurationInMinutes * 60000
      )
      const displayLine = (car: string) =>
        `${
          this.resourceId
        }  ${time.getHours()}:${time.getMinutes()} ${car} ${i}`

      if (i === startSlot) {
        console.log(displayLine('['))
      } else if (i === endSlot) {
        console.log(displayLine(']'))
      } else {
        console.log(displayLine('.'))
      }
    }
  }
}

export { Booking }
export type { BookingOptions }
