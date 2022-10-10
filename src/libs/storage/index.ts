import { env } from "process"
import LocalStorageService from "./drivers/local-storage"
import { StorageServiceInterface } from "./interface"

var StorageService: StorageServiceInterface

switch (env.STORAGE_TYPE) {
  default:
  case "LOCAL_STORAGE":
    StorageService = new LocalStorageService()
    break
}

export default StorageService
