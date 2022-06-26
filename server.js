const express = require('express')
const cors = require('cors')
const forge = require('node-forge');
const getBytes = require('./processor.js');

const app = express()
const port = 8080

app.use(cors());

app.get('/getIdentity', async (req, res) => {
    var seed = await getBytes();
    var bits = 4096;
    var {
        privateKey,
        publicKey
    } = forge.pki.rsa.generateKeyPair({
        bits,
        seed,
        workers: 2
    });

    const pubPem = forge.pki.publicKeyToPem(publicKey).split('-')[10].replace(/\r?\n|\r/g, '');
    const privPem = forge.pki.privateKeyToPem(privateKey).split('-')[10].replace(/\r?\n|\r/g, '');

    res.json({
        privateKey: privPem,
        publicKey: pubPem
    });

})

app.get('/signMessage', async (req, res) => {
    let message = req.query.message;
    let privateKey = forge.pki.privateKeyFromPem(`-----BEGIN RSA PRIVATE KEY-----${req.query.key}-----END RSA PRIVATE KEY-----`);

    const md = forge.md.sha256.create();
    md.update(message);

    const sign = privateKey.sign(md);
    console.log(forge.util.encode64(sign))

    res.json({
        sign: forge.util.encode64(sign)
    })

})


app.get('/verifySign', async (req, res) => {
    let message = req.query.message;
    let sign = forge.util.decode64(req.query.sign);
    let key = `-----BEGIN PUBLIC KEY-----${req.query.key}-----END PUBLIC KEY-----`;
    let publicKey, error, valid = false;

    const md = forge.md.sha256.create();
    md.update(message);
    const data = md.digest().bytes();

    try {
        publicKey = forge.pki.publicKeyFromPem(key);
        valid = publicKey.verify(data, sign);
    } catch (e) {
        error = e;
    }

    res.json({
        "valid": valid,
        error
    })
})

app.listen(port, () => {
    console.log(`API listening on port ${port}`)
})