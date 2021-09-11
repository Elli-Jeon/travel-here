import { dbService } from 'firebase.js';

export const getPassword = async (id) => {
  const response = await dbService
    .collection('users')
    .where('password', '==', id)
    .get();
  return response;
};
