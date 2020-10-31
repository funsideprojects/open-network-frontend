export enum HTTP_STATUS_CODE {
  // ? Client errors
  'Bad Request' = '400',
  'Unauthorized' = '401',
  'Not Found' = '404',
  'Method Not Allowed' = '405',
  'Unsupported Media Type' = '415',
  'Too Many Request' = '429',
  'Request Header Fields Too Large' = '431',
  // ? Server errors
  'Internal Server Error' = '500',
  'Service Unavailable' = '503',
}
