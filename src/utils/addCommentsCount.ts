export const addCommentsCount = (article: any) => {
    const json = JSON.stringify(article)
    console.log(json)
    localStorage.setItem('addCount', json)
}