import { rejects } from 'assert'
import fs from 'fs'
import { resolve } from 'path'

const getFiles = (path: string) => {
    return new Promise((res, rej) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                rej(err)
                return
            }
            res(data)
        })
    })
}

const doSomething = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('do something')
        }, 200);
    })
}

// getFiles('./src/console.ts').then(res => console.log(res))
doSomething().then((res => console.log(res)))