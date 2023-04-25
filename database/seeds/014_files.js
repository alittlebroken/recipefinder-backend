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
    {id:1, src: 'https://xsgames.co/randomusers/avatar.php?g=male', mimetype: 'image/png',resource: 'user', resourceid: 1, userid: 1, title: 'Yummy food 1'},
    {id:2, src: 'https://xsgames.co/randomusers/avatar.php?g=male', mimetype: 'image/png',resource: 'user', resourceid: 2, userid: 2, title: 'Yummy food 2'},
    {id:3, src: 'https://xsgames.co/randomusers/avatar.php?g=female', mimetype: 'image/png',resource: 'user', resourceid: 3, userid: 3, title: 'Yummy food 3'},
    {id: 4, src: `${faker.image.food()}`, mimetype: 'image/png', resource: 'recipe', resourceid: 1, userid: 1, title: 'Yummy food 4'},
    {id: 5, src: `${faker.image.food()}`, mimetype: 'image/png', resource: 'recipe', resourceid: 1, userid: 1, title: 'Yummy food 5'},
    {id: 6, src: `${faker.image.food()}`, mimetype: 'image/png', resource: 'recipe', resourceid: 1, userid: 1, title: 'Yummy food 6'},
    {id: 7, src: `${faker.image.food()}`, mimetype: 'image/png', resource: 'recipe', resourceid: 2, userid: 2, title: 'Yummy food 7'},
    {id: 8, src: `${faker.image.food()}`, mimetype: 'image/png', resource: 'recipe', resourceid: 2, userid: 2, title: 'Yummy food 8'},
    {id: 9, src: `${faker.image.food()}`, mimetype: 'image/png', resource: 'recipe', resourceid: 2, userid: 2, title: 'Yummy food 9'},
    {id: 10, src: `${faker.image.food()}`, mimetype: 'image/png', resource: 'recipe', resourceid: 3, userid: 1, title: 'Yummy food 10'},
    {id: 11, src: `${faker.image.food()}`, mimetype: 'image/png', resource: 'recipe', resourceid: 3, userid: 1, title: 'Yummy food 11'},
    {id: 12, src: `${faker.image.food()}`, mimetype: 'image/png', resource: 'recipe', resourceid: 3, userid: 1, title: 'Yummy food 12'},
    {id: 13, src: `${faker.image.food()}`, mimetype: 'image/png', resource: 'recipe', resourceid: 4, userid: 1, title: 'Yummy food 13'},
    {id: 14, src: `${faker.image.food()}`, mimetype: 'image/png', resource: 'recipe', resourceid: 4, userid: 1, title: 'Yummy food 14'},
    {id: 15, src: `${faker.image.food()}`, mimetype: 'image/png', resource: 'recipe', resourceid: 4, userid: 1, title: 'Yummy food 15'},
    {id: 16, src: `${faker.image.food()}`, mimetype: 'image/png', resource: 'recipe', resourceid: 5, userid: 2, title: 'Yummy food 16'},
    {id: 17, src: `${faker.image.food()}`, mimetype: 'image/png', resource: 'recipe', resourceid: 5, userid: 2, title: 'Yummy food 17'},
    {id: 18, src: `${faker.image.food()}`, mimetype: 'image/png', resource: 'recipe', resourceid: 5, userid: 2, title: 'Yummy food 18'},
  ]);

  await knex.raw('select setval(\'files_id_seq\', max(id)) from files');
};
