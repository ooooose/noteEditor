export type BaseEntity = {
  id: number
  createdAt: Date
}

export type Entity<T> = {
  [K in keyof T]: T[K]
} & BaseEntity
