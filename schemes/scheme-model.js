const db = require('../data/db-config.js');

module.exports = {
    find, 
    findById, 
    findSteps, 
    add, 
    update, 
    remove
}

function find() {
    return db('schemes')
}

function findById(id) {
    return db('schemes')
    .where({id})
}

function findSteps(scheme_id) {
    return db('steps as st')
    .join('schemes as sc', 'sc.id', 'st.scheme_id')
    .select('st.id', 'sc.scheme_name', 'st.instructions')
    .where({scheme_id})
}

async function add(scheme) {
    const [id] = await db('schemes').insert(scheme)
    return findById(id)
}

async function update(change, id) {
    await db('schemes')
    .where({id})
    .update(change);
}

function remove(id) {
    return db('schemes')
    .where({id})
    .del();
}