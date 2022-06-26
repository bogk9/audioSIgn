const fs = require('fs');
const stream = require('stream');
const record = require('node-mic-record')
const Transform = stream.Transform

function streamToString(stream) {
    const chunks = [];
    return new Promise((resolve, reject) => {
        stream.on('close', function() {
            stream.destroy();
        });
        stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
        stream.on('error', (err) => {
            console.log("error:" + err);
            reject(err);
        });
        stream.on('end', () => {
            resolve(Buffer.concat(chunks).toString('utf8'));
            stream.destroy();
        });
    })
}

// -------------------------------------------

function setBit(buffer, i, bit, value) {
    if (value == 0) {
        buffer[i] &= ~(1 << bit);
    } else {
        buffer[i] |= (1 << bit);
    }
}

class Transformator extends Transform {
    constructor(condition) {
        super();
        this.condition = condition;
    }
    _transform(chunk, enc, next) {
        let b = Buffer.alloc(chunk.length);
        let offset = 0;
        for (let byte of chunk) {
            if (this.condition(byte))
                continue;
            b.writeUInt8(byte, offset);
            offset++;
        }
        const nb = b.slice(0, b.indexOf(0x00));
        this.push(nb);
        next();
    }
}

class LastByteExtractor extends Transform {
    constructor() {
        super();
    }
    _transform(chunk, enc, next) {
        let buffer = new Uint8Array(1);
        let pushCount = 0;

        let b = Buffer.alloc(chunk.length / 8);
        let offset = 0;

        for (let byte of chunk) {
            setBit(buffer, 0, pushCount, byte % 2);
            pushCount++;

            if (pushCount === 8) {
                b.writeUInt8(buffer[0], offset);
                offset++;
                pushCount = 0;
            }
        }
        this.push(b);
        next();
    }
}

// ----------------- driver code ---------------------------

const getBytes = async () => {

    const filterBoundaryBits = new Transformator((byte) => byte === 0 || byte === 255);
    const sampleAndHold = new Transformator(() => Math.floor(Math.random() * 256) % 2);
    const extractor = new LastByteExtractor();

    const input = record.start({
        sampleRate: 96000,
        verbose: true,
        recordProgram: 'SoX',
        threshold: 0.0,
        silence: 0.0
    });

    setTimeout(function() {
        record.stop()
    }, 500);

    let finalStream = input
        .pipe(filterBoundaryBits) // 0's and 255's rejected
        .pipe(sampleAndHold) // gets values if Math.random() * 256)%2 is truthy
        .pipe(extractor) // extracts last byte (%2)

    return await streamToString(finalStream)

}

let someFunc = async () => {
    console.log(await getBytes());
}

module.exports = getBytes;