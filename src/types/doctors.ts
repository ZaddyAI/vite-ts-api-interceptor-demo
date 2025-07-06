import type { AvailableTime, Image } from "./shared"

export interface Doctor {
    data: Doctors[]
    total: number
  }

  export interface Doctors {
    Id: number
    FirstName: string
    LastName: string
    Gender: string
    PhoneNumber: string
    Email: string
    Password: any
    Bio: string
    Specialty: string
    Experience: string
    IsFeatured: boolean
    Images: Image[]
    AvailableDays: string[]
    AvailableTimes: AvailableTime[]
    DateOfBirth: string
  }
