let users = [
  { id: 1, username: 'user1', role: 'Usuario' },
  { id: 2, username: 'user2', role: 'Usuario' },
  { id: 3, username: 'user3', role: 'Usuario' },
];

export const getUsers = () => users;

export const addUser = (newUser) => {
  users = [...users, newUser];
};

export const updateUser = (id, updatedUser) => {
  users = users.map((user) => (user.id === id ? { ...user, ...updatedUser } : user));
};

export const deleteUser = (id) => {
  users = users.filter((user) => user.id !== id);
};