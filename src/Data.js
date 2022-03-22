import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchData, hide, like } from "./dataSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro'
import './styles/css/cards.css'

export const Data =  () => {
  const dispatch = useDispatch()
  const cards = useSelector(({ data }) => data.cards)
  const [ allVisible, setAllVisible ] = useState(true)


  useEffect(() => {
    dispatch(fetchData(3))
  }, [dispatch])

  const handleDelete = (event) => {
    dispatch(hide(event.currentTarget.dataset.id))
  }

  const handleLike = (event) => {
    dispatch(like(event.currentTarget.dataset.id))
  }

  const handleFilter = () => {
    setAllVisible(!allVisible)
  }

  return (
    <div className="data">
      <div className="filter-wrapper" onClick={handleFilter}>
        <div className="button-filter">{allVisible ? 'Show liked' : 'Show all'}</div>
      </div>
      <div className="cards">
        {cards
          .filter(({ liked }) => allVisible || !allVisible && liked)
          .map((card) => {
            return (
              card &&
              <div 
                className="card"
                key={card.id}>
                <FontAwesomeIcon 
                  className="cards__button cards__button_delete"
                  icon={regular('circle-xmark')}
                  data-id={card.id}
                  onClick={handleDelete} />
                <img className="card__main-image" src={card.url} alt="main image" />
                <div className="card__title">{card.title}</div>
                <FontAwesomeIcon 
                  className={`cards__button cards__button_like ${card.liked && 'cards__button_like_liked'}`}
                  icon={card.liked ? solid('heart') : regular('heart')}
                  onClick={handleLike} 
                  data-id={card.id} />
              </div>
            )
        })}
        {allVisible 
          && cards.length === 0
          && <div className="empty">cards list is empty</div>}
        {!allVisible
          && cards.filter(({ liked }) => liked).length === 0
          && <div className="empty">cards list is empty</div>}
      </div>
    </div>
  )
}