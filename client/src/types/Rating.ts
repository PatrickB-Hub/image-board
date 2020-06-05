interface IndividualRating {
  userId: string,
  rating: number
}

export interface Rating {
  overallRating: number,
  totalRating: number,
  individualRatings: IndividualRating[]
}