export class FileClass {
    constructor() { }

    toBase64(img) {
        return new Promise((res, rej) => {
            let reader = new FileReader();

            reader.onloadend = function () {
                res(reader.result);
            }
            reader.onerror = function (ev) {
                rej(ev.error);
            }

            reader.readAsDataURL(img);
        });
    }
}