import { ScriptProps } from 'next/script';
import classes from './Card.module.css';

const Card: React.FC<ScriptProps> = ({children}) => {
  return <div className={classes.card}>{children}</div>;
}

export default Card;