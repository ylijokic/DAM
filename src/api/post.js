const URL = 'http://localhost:3000'

const methods = {
  DELETE: 'DELETE',
  POST: 'POST',
  PUT: 'PUT',
}

const apiHelper = async (method, endpoint = '', data, ...restParams) => {
  const urlParams = restParams
    .slice(0)
    .unshift('/')
    .join('/')

  const response = await fetch(`${URL}/${endpoint}${urlParams}`, {
    method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const jsonData = await response.json()

  return jsonData
}

const addNewAsset = async asset => {
  try {
    const response = await apiHelper(methods.POST, 'asset', asset)
    return response
  } catch (e) {
    console.error('Error posting asset:', e)
    return undefined
  }
}

const updateAsset = async (assetId, updatedAsset) => {
  try {
    const response = await apiHelper(
      methods.PUT,
      'asset',
      assetId,
      updatedAsset,
    )
    return response
  } catch (e) {
    console.error('Error updating asset:', e)
    return undefined
  }
}

const deleteAsset = async assetId => {
  try {
    const response = await apiHelper(methods.DELETE, 'asset', assetId)
    return response
  } catch (e) {
    console.error('Error deleting asset:', e)
    return undefined
  }
}

const addNewFolder = async folder => {
  try {
    const response = await apiHelper(methods.POST, 'folder', folder)
    return response
  } catch (e) {
    console.error('Error adding folder:', e)
    return undefined
  }
}

const updateFolder = async updatedFolder => {
  try {
    const response = await apiHelper(methods.PUT, 'folder', updatedFolder)
    return response
  } catch (e) {
    console.error('Error updating folder:', e)
    return undefined
  }
}

const deleteFolder = async folderId => {
  try {
    const response = await apiHelper(methods.DELETE, 'folder', folderId)
    return response
  } catch (e) {
    console.error('Error deleting folder:', e)
    return undefined
  }
}

const addNewUser = async user => {
  try {
    const response = await apiHelper(methods.POST, 'user', user)
    return response
  } catch (e) {
    console.error('Error adding user:', e)
    return undefined
  }
}

const updateUser = async updatedUser => {
  try {
    const response = await apiHelper(methods.PUT, 'user', updatedUser)
    return response
  } catch (e) {
    console.error('Error updating user:', e)
    return undefined
  }
}

const deleteUser = async userId => {
  try {
    const response = await apiHelper(methods.DELETE, 'user', userId)
    return response
  } catch (e) {
    console.error('Error deleting user:', e)
    return undefined
  }
}

export {
  addNewAsset,
  updateAsset,
  deleteAsset,
  addNewFolder,
  updateFolder,
  deleteFolder,
  addNewUser,
  updateUser,
  deleteUser,
}
