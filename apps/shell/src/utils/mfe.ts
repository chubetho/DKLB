import { __federation_method_getRemote, __federation_method_unwrapDefault } from 'virtual:__federation__'

export async function useRemote(name: string) {
  const getModule = async <T>(path: string) => {
    const wrapped = await __federation_method_getRemote(name, `./${path}`)
    return __federation_method_unwrapDefault(wrapped) as T
  }

  return { getModule }
}
