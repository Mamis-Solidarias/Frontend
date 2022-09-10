const getItem = (items: any[], id: string): any | null => {
  const itemsList: any[] = items.filter(item => item.id === id)

  if (!!itemsList) {
    return itemsList[0]
  }

  return null
}

const editField = (items: any[], id: string, field: string, value: any): boolean => {
  const itemsList: any[] = items.filter(item => item.id === id)

  if (!!itemsList) {
    itemsList[0][field] = value

    return true
  }

  return false
}

export { getItem, editField }
