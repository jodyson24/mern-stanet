export const imageShow = (src, theme) => {
    return (
        <img src={src}
            alt="images"
            style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
            className="img-thumbnail"
        />
    )
}

export const videoShow = (src, theme) => {
    return (
        <video controls src={src}
            alt="videos"
            style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
            className="img-thumbnail"
        />
    )
}