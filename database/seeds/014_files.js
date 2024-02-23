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
    {id:1, src: `${process.env.APP_URL}/media/default_user.png`, mimetype: 'image/png',resource: 'user', resourceid: 1, userid: 1, title: 'Default user profile picture'},
    {id:2, src: `${process.env.APP_URL}/media/default_user.png`, mimetype: 'image/png',resource: 'user', resourceid: 2, userid: 2, title: 'Default user profile picture'},
    {id:3, src: `${process.env.APP_URL}/media/default_user.png`, mimetype: 'image/png',resource: 'user', resourceid: 3, userid: 3, title: 'Default user profile picture'},
    {id: 4, src: `${process.env.APP_URL}/media/vegan_chilli.jpg`, mimetype: 'image/jpg', resource: 'recipe', resourceid: 1, userid: 1, title: 'Bowl of Vegan Chilli with garnish'},
    {id: 5, src: `${process.env.APP_URL}/media/vegan_chilli_two.jpg`, mimetype: 'image/jpg', resource: 'recipe', resourceid: 1, userid: 1, title: 'Pot of vegan chilli on a table'},
    {id: 6, src: `${process.env.APP_URL}/media/vegan_burger.jpg`, mimetype: 'image/jpg', resource: 'recipe', resourceid: 2, userid: 2, title: 'Two vegan burgers on plates'},
    {id: 7, src: `${process.env.APP_URL}/media/cheese_on_toast.jpg`, mimetype: 'image/jpg', resource: 'recipe', resourceid: 3, userid: 1, title: 'Slices of bread with melted cheese on top of them arranged in a grid 9x9'},
    {id: 8, src: `${process.env.APP_URL}/media/meaty_burgers.jpg`, mimetype: 'image/jpg', resource: 'recipe', resourceid: 4, userid: 1, title: '3 Juicy burgers within a bun topped with cheese and bacon'},
    {id: 9, src: `${process.env.APP_URL}/media/breaded_chicken.jpeg`, mimetype: 'image/jpeg', resource: 'recipe', resourceid: 5, userid: 2, title: 'Plate of braded chicken with dip'},
    {id: 10, src: `${process.env.APP_URL}/media/spaghetti_bolognese.jpg`, mimetype: 'image/jpg', resource: 'recipe', resourceid: 6, userid: 2, title: 'Bowl of Spaghetti Bolonese on a table'},
    {id: 11, src: `${process.env.APP_URL}/media/vegetable_soup.jpg`, mimetype: 'image/jpg', resource: 'recipe', resourceid: 7, userid: 2, title: 'Bowl of vegetable soup next to a spoon on a table'},
    {id: 12, src: `${process.env.APP_URL}/media/pancakes_lemons.jpg`, mimetype: 'image/jpg', resource: 'recipe', resourceid: 8, userid: 2, title: 'Pancake on aplate with slices of lemon and sugar.'},
    {id: 13, src: `${process.env.APP_URL}/media/pancakes.jpg`, mimetype: 'image/jpg', resource: 'recipe', resourceid: 8, userid: 2, title: 'Folded pancakes on plates'}
  ]);

  await knex.raw('select setval(\'files_id_seq\', max(id)) from files');
};
