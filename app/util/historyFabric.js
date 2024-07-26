import { isDev } from "./cfg";

export const historyFabricAdd = (fabricCanvas) => {

  if (!isDev) {
    return;
  }

  window.historyfab = [JSON.stringify(fabricCanvas), ...(window.historyfab || [])]

}
