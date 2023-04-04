// Bring in any packages needed
require('dotenv').config();

const { faker } = require('@faker-js/faker')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('files').del()
  await knex('files').insert([
    {id:1, name: 'https://xsgames.co/randomusers/avatar.php?g=male', mimetype: 'image/png',resource: 'user', resourceid: 1, userid: 1},
    {id:2, name: 'https://xsgames.co/randomusers/avatar.php?g=male', mimetype: 'image/png',resource: 'user', resourceid: 2, userid: 2},
    {id:3, name: 'https://xsgames.co/randomusers/avatar.php?g=female', mimetype: 'image/png',resource: 'user', resourceid: 3, userid: 3},
    {id: 4, name: `${faker.image.food()}`, mimetype: 'image/png', resource: 'recipe', resourceid: 1, userid: 1},
    {id: 5, name: `${faker.image.food()}`, mimetype: 'image/png', resource: 'recipe', resourceid: 1, userid: 1},
    {id: 6, name: `${faker.image.food()}`, mimetype: 'image/png', resource: 'recipe', resourceid: 1, userid: 1},
    {id: 7, name: `${faker.image.food()}`, mimetype: 'image/png', resource: 'recipe', resourceid: 2, userid: 2},
    {id: 8, name: `${faker.image.food()}`, mimetype: 'image/png', resource: 'recipe', resourceid: 2, userid: 2},
    {id: 9, name: `${faker.image.food()}`, mimetype: 'image/png', resource: 'recipe', resourceid: 2, userid: 2},
    {id: 10, name: `${faker.image.food()}`, mimetype: 'image/png', resource: 'recipe', resourceid: 3, userid: 1},
    {id: 11, name: `${faker.image.food()}`, mimetype: 'image/png', resource: 'recipe', resourceid: 3, userid: 1},
    {id: 12, name: `${faker.image.food()}`, mimetype: 'image/png', resource: 'recipe', resourceid: 3, userid: 1},
    {id: 13, name: `${faker.image.food()}`, mimetype: 'image/png', resource: 'recipe', resourceid: 4, userid: 1},
    {id: 14, name: `${faker.image.food()}`, mimetype: 'image/png', resource: 'recipe', resourceid: 4, userid: 1},
    {id: 15, name: `${faker.image.food()}`, mimetype: 'image/png', resource: 'recipe', resourceid: 4, userid: 1},
    {id: 16, name: `${faker.image.food()}`, mimetype: 'image/png', resource: 'recipe', resourceid: 5, userid: 2},
    {id: 17, name: `${faker.image.food()}`, mimetype: 'image/png', resource: 'recipe', resourceid: 5, userid: 2},
    {id: 18, name: `${faker.image.food()}`, mimetype: 'image/png', resource: 'recipe', resourceid: 5, userid: 2},
  ]);

  await knex.raw('select setval(\'files_id_seq\', max(id)) from files');
};
