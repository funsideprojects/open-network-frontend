export const getImageLink = (image?: string) => {
  if (image) {
    return `${process.env.REACT_APP_API_URL!.replace('gql', 'images/')}${image}`
  }

  return undefined
}
