export const returnCommentsCount = () => {

    const count = localStorage.getItem('addCount')

    if (count) {
        return JSON.parse(count) || []
    }
}