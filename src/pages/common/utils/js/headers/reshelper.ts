import RSA from 'js-rsa';
import * as forge from 'node-forge';

export class RsaHelper {
    modulus = 'EFA82FF4684A031CBD3E268EC1E2689890E528BAF769E5BF64E14C1BDC334410FC7B4C48D06F6131504D3A6E97B083282C97' +
        '7B84BD25354B33171735DD1F83C19EBAC68A33B061227BE266F01EE57B014052B3263D4A7546661A66B4987359C1BD150B1A' +
        'D8BD6A2C78B72A359673ACD0D5A4B50DFF3C10AC0752E3214BC0438578DE394A9E04F28262FC25C6AC1C1D906CCA1B5C5E4' +
        '1D906A6C3C5381B8E0000EB6A49B512ED3CD204423CE39F481E9E121A262C17860236BAAD4D5A143C76E150C9D0134ECF00' +
        '400C7F8169E096FDB0BED687021649B7DE26BCDDCC6519CBE0B96900AA296BA2263FCBD5C81F62334D4B5A840C4683006DE0BA721BB49004F1';
    publicexp = '10001';
    keypair = new RSA.RSAKeyPair(this.publicexp, this.publicexp, this.modulus, 2048);

    KeyLen = 16;

    constructor() { }

    randomKeyStr(len: any) {
        const txt = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
            'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '_'];
        const length = len ? len : 8;
        const res = [];
        for (let i = 0; i < length; i++) {
            const idx = Math.floor(Math.random() * 1000) % txt.length;
            res.push(txt[idx]);
        }
        return res.join('');
    }

    hex2Bytes(str: string) {
        let pos = 0;
        let len = str.length;
        if (len % 2 !== 0) {
            return null;
        }

        len /= 2;
        const hexA = new Array();
        for (let i = 0; i < len; i++) {
            const s = str.substr(pos, 2);
            const v = parseInt(s, 16);
            hexA.push(v);
            pos += 2;
        }

        return hexA;
    }

    encryptRSA(txt: any) {
        const txtkey = this.randomKeyStr(this.KeyLen);
        const cipher = forge.cipher.createCipher('AES-ECB', txtkey);
        cipher.start();
        cipher.update(forge.util.createBuffer(txt, 'utf8'));
        cipher.finish();
        const bytes = cipher.output.bytes();
        const encoded = forge.util.encode64(bytes);

        const rsakeyraw = RSA.encryptedString(this.keypair, txtkey, RSA.RSAAPP.PKCS1Padding, RSA.RSAAPP.RawEncoding);
        const rsakey = forge.util.encode64(rsakeyraw);

        const res = encoded + ',' + rsakey;
        return res;
    }

    decryptRSA(txt: string) {
        const parts = txt.split(',');
        const keyWordAry = forge.util.decode64(parts[1]);
        const keycoded = forge.util.createBuffer(keyWordAry).toHex();
        const txtkeyStr = RSA.decryptedString(this.keypair, keycoded);
        const txtkey = this.extractKey(txtkeyStr);

        const coded = forge.util.decode64(parts[0]);
        const decipher = forge.cipher.createDecipher('AES-ECB', txtkey);
        decipher.start();
        decipher.update(forge.util.createBuffer(coded));
        decipher.finish();
        const plainraw = decipher.output.bytes();
        const plain = forge.util.decodeUtf8(plainraw);
        return plain;
    }

    extractKey(data: any) {
        let key = '';
        for (let i = this.KeyLen - 1; i >= 0; i--) {
            key += data[i];
        }
        return key;
    }
}
