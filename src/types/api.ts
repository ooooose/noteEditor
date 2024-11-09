export type BaseEntity = {
  id: number
  createdAt: Date
}

export type Entity<T> = {
  [K in keyof T]: T[K]
} & BaseEntity

export type Meta = {
  page: number
  total: number
  totalPages: number
  next: number
  last: number
}
