import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import classes from '../../styles/utils.module.css';
import ListGroup from 'react-bootstrap/ListGroup';

interface Info {
  prop: string;
  data: string;
}

interface Props {
  img: string;
  title: string;
  text: Info[];
  link: string;
}

function CardUser(props: Props) {
  return (
    <Card style={{ width: '25rem' }}>
      <Card.Img variant='top' src={`${props.img}`} />
      <Card.Body>
        <Card.Title>{props.title} </Card.Title>
      </Card.Body>
      <ListGroup className='list-group-flush'>
        {props.text.map((info) => (
          <ListGroup.Item>
            {' '}
            <span>{info.prop}</span> {info.data}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Card.Body>
        <Button variant='primary'>
          <a className={classes.link} href={props.link} rel='noreferrer' target='_blank'>
            Linkedin profile
          </a>
        </Button>
      </Card.Body>
    </Card>
  );
}

export default CardUser;
