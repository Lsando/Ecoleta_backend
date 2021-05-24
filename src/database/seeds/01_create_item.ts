import Knex from 'knex';
export async function seed(knex: Knex){
    await knex('items').insert([
        {title: 'lampadas', image: 'image.svg'},
        {title: 'Pilhas e baterias', image: 'image.svg'},
        {title: 'papeis e papelao', image: 'image.svg'},
        {title: 'Residuos eletronicos', image: 'image.svg'},
        {title: 'Residuos organicos', image: 'image.svg'},
        {title: 'Oleo de cozinha', image: 'image.svg'},
    ]);
}
