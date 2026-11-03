export function hasPrivilege(requiredPrivilegeId: number) {
  const privilege = localStorage.getItem("privilegies");
  if (privilege === null) return false;
  const privileges = JSON.parse(privilege) || [];

  return privileges.some(
    (privilege: any) => privilege.key_privileges === requiredPrivilegeId,
  );
}
