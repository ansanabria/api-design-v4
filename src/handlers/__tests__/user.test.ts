import * as user from '../user'

describe('user handler', () => {
  it('should create a new user', async () => {
    const req = { body: { username: 'pola', password: 'telas' } }
    const res = {
      json({ token }) {
        expect(token).toBeTruthy()
      },
    }
    const newUser = await user.createNewUser(req, res, () => {})
  })
})
