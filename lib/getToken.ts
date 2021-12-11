import { RolesType } from "./hms/types";

const endPoint = process.env.NEXT_PUBLIC_HMS_TOKEN_ENDPOINT;

/**
 * Generates a Token for joining room
 */
export const getToken = async (
  role: RolesType,
  room_id: string
): Promise<string> => {
  const response = await fetch(`${endPoint}api/token`, {
    method: 'POST',
    body: JSON.stringify({
      user_id: '5fc62c5872909272bf9995e1', // User ID assigned by you (different from 100ms' assigned id)
      role: role, // listener , speaker , moderator
      room_id
    })
  });

  const { token } = await response.json();

  return token;
};