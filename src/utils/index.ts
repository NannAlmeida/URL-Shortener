export function makeRandomString(): string {
    const chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const lengthChars: number = chars.length;
    let result: string = '';

    for(let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * lengthChars));
    }

    return result;
}