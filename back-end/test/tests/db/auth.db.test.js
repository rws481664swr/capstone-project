import {Credentials} from "../../../db/schemas/models.js";
import {compare, hash} from "bcrypt";
import {login, signUp} from "../../../db/creds.js";
let testUsername = 'testuser'
import{connect} from "../../../db/db.js";
import{should as _should} from "chai";

let testPassword = 'testpassword'
const should = _should()
const hashedPassword = await hash(testPassword, 1)
let conn=await connect()

process.env.NODE_ENV='test'
describe('signUp', () => {
    afterEach(async () => {
        await Credentials.deleteMany({});
    });

    it('should create a new user with hashed password', async () => {
        const username = 'testuser';
        const rawPassword = 'testpassword';

        await signUp(username, rawPassword);

        const user = await Credentials.findOne({ username });
        user.should.exist;
        user.username.should.equal(username);
        (await compare(rawPassword, user.password)).should.be.true;
    });
});
describe('login', () => {

    beforeEach(async function ()  {
        this.timeout(20000)

        // create test user
        await Credentials.create({ username: testUsername, password: hashedPassword })
    })

    afterEach(async function ()  {
        this.timeout(20000)

        // remove test user
        await Credentials.deleteOne({ username: testUsername })
    })

    it('should return true with correct credentials', async function ()  {
        this.timeout(20000)
        const result = await login(testUsername, testPassword)
        result.should.be.true
    })

    it('should return false with incorrect password', async function ()  {
        this.timeout(20000)
        const result = await login(testUsername, 'wrongpassword')
        result.should.be.false
    })

    it('should throw an error if username does not exist', async function ()  {
        this.timeout(10000)
        try {
            await login('nonexistentuser', 'password')
            should.fail('Expected error to be thrown')
        } catch (error) {
            error.message.should.equal('User not found')
        }
    })
    after(()=>conn.disconnect())
})
