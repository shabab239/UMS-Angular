export interface User {
  id: number
  name: string
  cell: string
  status: string
  role: string
  university: University
  email: string
  gender: string
  address: string
  avatar: any
  dateOfBirth: string
  bloodGroup: string
  joiningDate: string
  username: any
  password: any
  authorities: Authority[]
  idString: string
  enabled: boolean
  accountNonExpired: boolean
  credentialsNonExpired: boolean
  accountNonLocked: boolean
}

export interface University {
  id: number
  name: string
  contact: string
  email: string
  establishedYear: number
  address: string
}

export interface Authority {
  authority: string
}
