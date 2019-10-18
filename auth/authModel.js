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

    create(user) {
        const [username] = db('users').insert(user, 'username')

        return this.findByUsername(username)
    },

    update(username, changes) {
        db('users').update(changes)

        return this.findByUsername(username)
    },

    delete(id) {
        return db('users')
            .where({id})
            .delete()
    }
}