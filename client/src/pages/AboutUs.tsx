import { Col, Container, Row } from 'react-bootstrap';
import Card from '../components/ui/Card';
import classes from '../styles/utils.module.css';

type Props = {};

const AboutUs = (props: Props) => {
  return (
    <Container className={classes.flexCenter}>
      <Row sm={1} xs={1} md={2} lg={2} xl={2} className={`g-4 ${classes.notesGrid}`}>
        <Col>
          <Card
            key={1}
            img={
              'https://scontent.xx.fbcdn.net/v/t1.15752-9/348366300_787206496148110_4926956364125719446_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=aee45a&_nc_eui2=AeGxgEoXzpVf-uUSFH5X3fxCJ5uSG8cFPkcnm5IbxwU-RxR_fAjzTHrGwCwYhg28Y1EZhaTbGGvc0qkh3qfWnsJx&_nc_ohc=RaU_577hG3wAX-BOSRB&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdTxL74oqjzBg_jqq3IldUxqgUY1ZmT-tdkOolBXeTC8BA&oe=6499BB3C'
            }
            text={[
              { prop: 'Datum rođenja', data: '08.04.1999' },
              { prop: 'Srednja škola', data: 'Gimnazija “Muhsin Rizvić“ Kakanj' },
              { prop: 'Visokoškolska ustanova', data: 'Politehnički fakultet' },
              { prop: 'Smjer', data: 'Softversko inženjerstvo' },
              { prop: 'Godina studija', data: 'II' },
              { prop: 'Broj indekas', data: '268' },
            ]}
            title={'Harun Aliefendić'}
            link={'https://www.linkedin.com/in/harun-aliefendi%C4%87-164499217/'}
          />
        </Col>
        <Col>
          <Card
            key={1}
            img={
              'https://scontent.xx.fbcdn.net/v/t1.15752-9/350106581_146695591730754_5829535763349489211_n.jpg?stp=dst-jpg_p2048x2048&_nc_cat=102&ccb=1-7&_nc_sid=aee45a&_nc_eui2=AeE0iKSk71McilXIhHzpYHbc3B7gUg9kZa7cHuBSD2RlrktM8oLQrRKpw5aXnwUOZSsQxjo8roKTNqCT0o53Wnr8&_nc_ohc=8OdJ5CHDJoYAX_Cf9cM&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdQlJzoIFhcfUSzwid3RN75QcTx5Irdqk9fWzUnhwY3FpA&oe=6499EE3A'
            }
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
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
