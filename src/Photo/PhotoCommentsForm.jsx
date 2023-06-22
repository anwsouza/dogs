import React from 'react'
import {ReactComponent as Enviar} from '../Assets/enviar.svg'
import useFetch from '../Hooks/useFetch'
import Error from '../Components/Helper/Error'
import { COMMENT_POST } from '../api'
import styles from './PhotoCommentsForm.module.css'

const PhotoCommentsForm = ({id, setComments, single}) => {
  const [comment, setCommment] = React.useState('')
  const {request, error} = useFetch()

  async function handleSubmit(event) {
    event.preventDefault();
    const{url, options} = COMMENT_POST(id, {comment})
    const {response, json} = await request(url, options)
    console.log(json)
    if(response.ok) {
      setCommment('')
      setComments((comments) => [...comments, json])
    }
  }

  return (
    <form className={`${styles.form} ${single ? styles.single : ''}`} onSubmit={handleSubmit}>
      <textarea className={styles.textarea}
      id='comment'
      name='comment'
      placeholder='Comente...' 
      value={comment}
      onChange={({target}) => setCommment(target.value)}
      />
      <button className={styles.button}>
        <Enviar />
      </button>
      <Error error={error} />
    </form>
  )
}

export default PhotoCommentsForm