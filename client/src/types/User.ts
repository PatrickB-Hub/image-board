export interface User {
  _id?: string,
  email?: string,
  username?: string,
  followers?: string[],
  following?: string[],
  createdAt?: Date
}