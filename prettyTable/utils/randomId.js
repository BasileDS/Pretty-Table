export default function getRandomId(length) {
    let result = ''
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
    
    // Loop to generate characters to reach a specified length
    for (let i = 0; i < length; i++) {
        const randomInd = Math.floor(Math.random() * characters.length)
        result += characters.charAt(randomInd)
    }
    return result
}