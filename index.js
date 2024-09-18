const jwt = require('jsonwebtoken');
const zod = require('zod')
const jwtPassword = 'secret';

const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(6);

function signJwt(username, password) {
    const usernameResponse = emailSchema.safeParse(username);
    const passwordResponse = passwordSchema.safeParse(password);
    if (!usernameResponse.success || !passwordResponse.success) {
        return null ;
    }
    const signature =  jwt.sign({
        username,
        password
    }, jwtPassword);
    return signature;
}

const token = signJwt('as278@example.com', '123456');


function decodeJwt(token) {
    // true , false
    const decode = jwt.decode(token);
    if(decode){
        console.log("decode");
        return decode;
    }else{
        return false;
    }
}

console.log(decodeJwt('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFzIiwicGFzc3dvcmQiOiIyMDEzNjQ1IiwiaWF0IjoxNjU3NjY3MjIyfQ.0j0e6gqyZ1jxQq8Hl7fJiL5bqUZ8V7J6J1XmD5b6e2k'));

function verifyJwt(token) {

    try {
        jwt.verify(token, jwtPassword);
        console.log("verifyJwt");
        return true;
    } catch (error) {
        ans = false
    }
    
    return ans;
}

console.log(verifyJwt(token));

