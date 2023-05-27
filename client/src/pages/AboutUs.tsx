import { Container } from 'react-bootstrap';
import Card from '../components/ui/Card';
import classes from '../styles/utils.module.css';

type Props = {};

const AboutUs = (props: Props) => {
  return (
    <Container className={classes.flexCenter}>
      <Card
        img={''}
        text={[
          { prop: 'Datum rođenja', data: '08.04.1999' },
          { prop: 'Srednja škola', data: 'Gimnazija “Muhsin Rizvić“ Kakanj' },
          { prop: 'Visokoškolska ustanova', data: 'Politehnički fakultet' },
          { prop: 'Smjer', data: 'Softversko inženjerstvo' },
          { prop: 'Godina studija', data: 'II' },
          { prop: 'Broj indekas', data: '268' },
        ]}
        title={'Harun Aliefendić'}
        link={'https://www.linkedin.com/in/alshamaliallen/'}
      />
      <Card
        img={''}
        text={[
          { prop: 'Datum rođenja', data: '02.05.1995' },
          { prop: 'Srednja Škola', data: 'MSŠ "Vitez" u Vitezu' },
          { prop: 'Visokoškolska ustanova', data: 'Politehnički fakultet' },
          { prop: 'Smjer', data: 'Softversko inženjerstvo' },
          { prop: 'Godina studija', data: 'II' },
          { prop: 'Broj indekas', data: '265' },
        ]}
        title={'Allen Al-Shamali'}
        link={'https://www.linkedin.com/in/alshamaliallen/'}
      />
    </Container>
  );
};

export default AboutUs;
