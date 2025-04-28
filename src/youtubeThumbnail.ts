
type Quality = 'max' | 'hq' | 'mq' | 'sd' | 'default'

export function getVideoIdFromUrl(url:string) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
}

export function getThumbnail(link: string, quality: Quality) {
    if (link && quality) {
        const videoid = getVideoIdFromUrl(link)
        if (videoid) {
            switch (quality) {
                case 'max':
                    return `https://i1.ytimg.com/vi/${videoid}/maxresdefault.jpg`
                case 'hq':
                    return `https://i1.ytimg.com/vi/${videoid}/hqdefault.jpg`
                case 'mq':
                    return `https://i1.ytimg.com/vi/${videoid}/mqdefault.jpg`
                case 'sd':
                    return `https://i1.ytimg.com/vi/${videoid}/sddefault.jpg`
                case 'default':
                    return `https://i1.ytimg.com/vi/${videoid}/default.jpg`
                default:
                    throw new Error('Invalid quality. Valid qualities: max, hq, mq, sd, default')
            }
        } else {
            throw new Error('Invalid link')
        }
    } else {
        throw new Error('Invalid link or quality. Valid qualities: max, hq, mq, sd, default')
    }
}