import React, { useEffect } from 'react'
import { axiosPoderJudicial } from '../../utils/configAxios'

const SalidaProduct = () => {

  useEffect(() => {
  axiosPoderJudicial
  .patch(`/used/${id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }, [])
  
  return (
    <section>
      <form action="">
        <label htmlFor="dateFinal">Fecha de salida:</label>
        <input type="date" {...register("dateFinal")} id='dateFinal' name='dateFinal' required />
      </form>
    </section>
  )
}

export default SalidaProduct