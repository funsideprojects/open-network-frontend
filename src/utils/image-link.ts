export const getImageLink = (image: string) => {
  if (image) return `${process.env.REACT_APP_API_URL!.replace('graphql', 'images/')}${image}`

  return null
}
