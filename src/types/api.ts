export type BaseEntity = {
  id: number
  createdAt: string
}

export type Entity<T> = {
  [K in keyof T]: T[K]
} & BaseEntity
