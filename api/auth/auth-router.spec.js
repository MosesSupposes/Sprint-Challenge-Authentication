const request = require('supertest')

const server = require('../server')
const db = require('../database/dbConfig')

describe('Environment', () => {
    it('should have a NODE_ENV value of "test"', () => {
        expect(process.env.NODE_ENV).toBe("testing")
    })
})

describe('GET /api/users', () => {
    beforeEach(async () => {
        await db('users').truncate()
    })

    it('should return one user', async () => {
        // register new user
        await request(server)
            .post('/api/auth/register')
            .send({
                username: 'Pickle Rick',
                password: 'Look Morty, I\'m a pickle! I\'m Pickle Riiiiiiiick!'
            })

        // login new user to get token
        const { body: { token } } = await request(server)
            .post('/api/auth/login')
            .send({
                username: 'Pickle Rick',
                password: 'Look Morty, I\'m a pickle! I\'m Pickle Riiiiiiiick!'
            })
            
        let users = await request(server).get('/api/users').set({Authorization: token})
        expect(users.body).toHaveLength(1)
    })

    it('should return a status code of 200', async () => {
         // register new user
        await request(server)
            .post('/api/auth/register')
            .send({
                username: 'Pickle Rick',
                password: 'Look Morty, I\'m a pickle! I\'m Pickle Riiiiiiiick!'
            })

        // login new user to get status
        const { status } = await request(server)
            .post('/api/auth/login')
            .send({
                username: 'Pickle Rick',
                password: 'Look Morty, I\'m a pickle! I\'m Pickle Riiiiiiiick!'
            })
         
        expect(status).toBe(200)
    })
})

describe('Auth Router', () => {
    beforeEach(async () => {
        await db('users').truncate()
    })

    describe('POST /register', () => {
        it('should return a new user', async () => {
            // register new user
            await request(server)
                .post('/api/auth/register')
                .send({
                    username: 'Pickle Rick',
                    password: 'Look Morty, I\'m a pickle! I\'m Pickle Riiiiiiiick!'
                })
        
            // login new user to get token
            const { body: { token } } = await request(server)
                .post('/api/auth/login')
                .send({
                    username: 'Pickle Rick',
                    password: 'Look Morty, I\'m a pickle! I\'m Pickle Riiiiiiiick!'
                })
                
                let users =  await request(server).get('/api/users').set({Authorization: token})
                expect(users.body).toHaveLength(1)
        })

        it('should return a status code of 201', async () => {
            // register new user
            const { status } = await request(server)
                .post('/api/auth/register')
                .send({
                    username: 'Pickle Rick',
                    password: 'Look Morty, I\'m a pickle! I\'m Pickle Riiiiiiiick!'
                })

            expect(status).toBe(201)
        })

        it('should return a hashed password upon success', async () => {
             // register new user
            const { body: { password } } = await request(server)
                .post('/api/auth/register')
                .send({
                    username: 'Pickle Rick',
                    password: 'Look Morty, I\'m a pickle! I\'m Pickle Riiiiiiiick!'
                })

            expect(password[0]).toBe('$')
            expect(password.length).toBe(60)
        })
    })

    describe('POST /login', async () => {
        it('should return a welcome message', async () => {
            // register new user
            await request(server)
                .post('/api/auth/register')
                .send({
                    username: 'Pickle Rick',
                    password: 'Look Morty, I\'m a pickle! I\'m Pickle Riiiiiiiick!'
                })

            // login new user 
            const { body } = await request(server)
              .post('/api/auth/login')
              .send({
                  username: 'Pickle Rick',
                  password: 'Look Morty, I\'m a pickle! I\'m Pickle Riiiiiiiick!'
              })

            
            expect(body['success']).toBe('Welcome Pickle Rick!')
        })

        it('should return a status code of 200', async () => {
            // register new user
            await request(server)
                .post('/api/auth/register')
                .send({
                    username: 'Pickle Rick',
                    password: 'Look Morty, I\'m a pickle! I\'m Pickle Riiiiiiiick!'
                })

            // login new user to get status code
            const { status } = await request(server)
                .post('/api/auth/login')
                .send({
                    username: 'Pickle Rick',
                    password: 'Look Morty, I\'m a pickle! I\'m Pickle Riiiiiiiick!'
                })
            
            expect(status).toBe(200)
        })
    })
})

describe('Jokes Router', () => {
    it('should return a list of jokes', async() => {
        // login new user 
        const { body: { token } } = await request(server)
            .post('/api/auth/login')
            .send({
                username: 'Pickle Rick',
                password: 'Look Morty, I\'m a pickle! I\'m Pickle Riiiiiiiick!'
            })
        
        const { body: jokes } = await request(server)
            .get('/api/jokes')
            .set('Authorization', token)
        
        expect(jokes.slice(0,10)).toHaveLength(10)
    })

    it('should return a status of 200', async () => {
        // login new user 
        const { body: { token } } = await request(server)
            .post('/api/auth/login')
            .send({
                username: 'Pickle Rick',
                password: 'Look Morty, I\'m a pickle! I\'m Pickle Riiiiiiiick!'
            })

        const { status } = await request(server)
        .get('/api/jokes')
        .set('Authorization', token)

        expect(status).toBe(200)
    })
})