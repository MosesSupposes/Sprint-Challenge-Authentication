const db = require('../database/dbConfig')

module.exports = {
    all() {
        return db('users')
    },

    findByUsername(username) {
        return db('users')
            .where({username})
            .first()
    },

    async create(user) {
        await db('users').insert(user, 'username')
        
        return this.findByUsername(user.username)
    },

    async update(username, changes) {
        await db('users').update(changes)

        return this.findByUsername(username)
    },

    delete(id) {
        return db('users')
            .where({id})
            .delete()
    }
}