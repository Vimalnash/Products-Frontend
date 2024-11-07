export function ProductCard({val}) {
    return (
        <div className='w-32 rounded-lg h-300 border border-2 hover:bg-gray-200 hover:shadow'>
          <img className='w-full rounded-t-lg border border-b-2' src= {val.thumbnail} height={50}/>
          <div className='p-2  rounded-b-lg'>
            <h2 className='words-break text-lg font-semibold'>{val.title}</h2>
            <h2>Rating: {val.rating}</h2>
            <h2>Price: <span className='font-semibold'>{val.price}</span></h2>
            <h2>Stock: {val.stock}</h2>
          </div>
        </div>
    )
  }