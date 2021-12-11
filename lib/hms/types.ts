/**
 * List of Roles available 
 * @readonly
 */
export const rolesList = ['backstage' , 'stage' , 'invitee' ,'viewer'] as const

type UnionFromTuple<Tuple extends readonly (string | number | boolean)[]> = Tuple[number];

export type RolesType = UnionFromTuple<typeof rolesList>