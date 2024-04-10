import React from 'react'

const AmountAsignation = ({ handleClickChangeShowAmountAsignation }) => {
  return (
    <section className='bg-white max-w-2xl rounded-md p-12 relative'>
      <button onClick={() => handleClickChangeShowAmountAsignation()} className='font-bold text-2xl absolute right-0 top-0 px-2 rounded-md m-2' >
        <box-icon color='red' name='x-circle' type='solid' ></box-icon>
      </button>
      
     
    </section>
  )
}

export default AmountAsignation