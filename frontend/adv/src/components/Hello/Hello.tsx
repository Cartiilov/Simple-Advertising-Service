// import { Button } from '../Button/Button';
import styles from './Hello.module.css';

export default function Hello() {
  return (
    <div className={styles.helloContainer}>
      {/* <img src='/images/img-3.jpg' autoPlay loop muted /> */}
      <h1>POST IT</h1>
      <p>YOUR GO TO SERVICE FOR ADVERTISING</p>
      {/* <div className='hello-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          GET STARTED
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
          WATCH TRAILER <i className='far fa-play-circle' />
        </Button>
      </div> */}
    </div>
  );
}
