const URL = 'http://localhost:3000'

const apiHelper = async (endpoint, ...restParams) => {
  const urlParams = restParams
    .slice(0)
    .unshift('/')
    .join('/')
  const response = await fetch(`${URL}/${endpoint}${urlParams}`)
  const jsonData = await response.json()

  return jsonData
}

const getAllAssets = async () => apiHelper('asset')

const getAsset = async id => {
  await apiHelper('asset', id)
}

const getAllFolders = async () => apiHelper('folder')

const getFolder = async id => {
  apiHelper('folder', id)
}

const getAllUsers = async () => apiHelper('user')

const getUser = async id => {
  await apiHelper('user', id)
}

export {
  getAllAssets,
  getAsset,
  getAllFolders,
  getFolder,
  getAllUsers,
  getUser,
}
