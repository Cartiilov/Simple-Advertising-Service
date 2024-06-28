import { Link } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';


function CardItem(props) {
  const navigate = useNavigate ()

  const handleCardClick = () => {
    navigate(`/post/${props.id}`);
  };
  return (
    <div onClick={handleCardClick}>
      <li className='cards__item'>
        <Link className='cards__item__link' to={props.path}>
          <figure className='cards__item__pic-wrap' data-category={props.label}>
            <img src={props.src} alt='Example selling image' className='cards__item__img' />
          </figure>
          <div className='cards__item__info'>
            <h5 className='cards__item__text'>{props.text}</h5>
          </div>
        </Link>
      </li>
    </div>
  )
}

export default CardItem
