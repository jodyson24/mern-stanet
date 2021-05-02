import React from 'react'

export default function LoadMoreBtn({ result, page, load, handleLoadMore }) {
    return (
        <>
            {
                result < 9 * (page - 1) ? '' :
                !load && <button className="btn btn-dark mx-auto d-block load_more"
                onClick={handleLoadMore}
                >Load more</button>
            }
        </>
    )
}
