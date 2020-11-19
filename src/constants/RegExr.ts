export const fullNameRegex = /^((?!\s{2,})(?!\r{1,})(?!\n{1,})(?!\t{1,}).){1,40}$/

export const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const usernameRegex = /^(?!.*[_.]{2,})(?=^[^_.].*[^_.]$)[\w_.]{3,20}$/

export const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]*$/

export const responsePrefixRegex = /^(__[\w]{0,}__)/
