import React from 'react'

export default function Carousel({ images, id, theme }) {
    const isActive = index => {
        if (index === 0) return "active"
    }
    return (
        <>
            <div id={`image${id}`} className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    {
                        images.map((img, index) => (
                            <button key={index} type="button" data-bs-target={`#image${id}`}
                                data-bs-slide-to={index} className={isActive(index)} aria-current="true"
                                aria-label="Slide 1"></button>
                        ))
                    }
                </div>
                <div className="carousel-inner">
                    {
                        images.map((img, index) => (
                            <div key={index} className={`carousel-item ${isActive(index)}`}>
                                <img src={img.url} className="d-block w-100" alt={img.url}  
                                style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />
                            </div>
                        ))
                    }
                </div>
                <button className="carousel-control-prev" type="button"
                    data-bs-target={`#image${id}`} data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button"
                    data-bs-target={`#image${id}`} data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            {/* <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    {
                        images.map((img, index) => (
                            <li key={index} data-target={`#image${id}`} 
                            data-slide-to={index} class={isActive(index)} ></li>
                        ))
                    }

                </ol>
                <div class="carousel-inner">
                {
                        images.map((img, index) => (
                            <div  key={index} class={`carousel-item ${isActive(index)}`}>
                            <img src={img.url} class="d-block w-100" alt={img.url} />
                        </div>
                        ))
                    }
                  

                </div>
                <a class="carousel-control-prev" href={`#image${id}`}  role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href={`#image${id}`}  role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div> */}


        </>
    )
}
