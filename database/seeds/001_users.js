exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()

  // Add the new data
  await knex('users').insert([
    {
      id: 1,
      username: 'admin',
      password: 'admin',
      email: 'admin@localhost',
      forename: 'Site',
      surname: 'Administrator',
      phone_no: '',
      roles: 'Admin'
    },
    {
      id: 2,
      username: 'user',
      password: 'user',
      email: 'user@localhost',
      forename: 'Site',
      surname: 'User',
      phone_no: '',
      roles: 'User'
    }
  ]);
};
