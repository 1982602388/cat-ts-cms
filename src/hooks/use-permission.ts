import { useStore } from '@/store'

export function usePermission(pageName: string, hanldeName: string) {
  const store = useStore()
  const permissions = store.state.login.permissions
  const verifyPermission = `system:${pageName}:${hanldeName}`
  // console.log('verifyPermission', verifyPermission)
  // system:menu:update

  // name = "coderwhy"
  // !name -> false
  // !!name -> true
  return !!permissions.find((item) => item === verifyPermission)
}
