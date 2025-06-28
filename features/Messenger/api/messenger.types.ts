export type GetDialogsByUserIdRequest = {
  dialoguePartnerId: number
  cursor: number
  pageSize: number
  searchName: string
}

export type GetDialogsByUserIdResponse = {
  pageSize: number
  totalCount: number
  notReadCount: number
  items: Item[]
}

export type Item = {
  id: number
  ownerId: number
  receiverId: number
  messageText: string
  createdAt: string
  updatedAt: string
  messageType: string
  status: string
}
