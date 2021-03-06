declare namespace Express {
  interface Request {
    user?: {
      _id: string,
      email: string,
      username: string,
      followers: string[],
      following: string[]
    }
  }
}