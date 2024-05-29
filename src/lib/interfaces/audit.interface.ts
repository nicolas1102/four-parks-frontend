import { UserInterface } from './user.interface'

export interface AuditInterface {
  id?: number
  ip?: string
  happening_date: string
  activityShowable: ActivityInterface
  userShowable: UserInterface
}

export interface ActivityInterface {
  id?: number
  name: string
}

export interface DateRangeInterface {
  beginning: string
  ending: string
}

