import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import '../assets/css/style.css';
import { Col, Container, Button, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
//import imgsrc from '../assets/pictures/study_header.jpg';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('contactus');
  };

  return (
    <Container fluid className='mt-5 full-height w-100 py-2 hero'>
      <Row className='justify-content-center '>
        <Col xs={12} md={7} className=' full-height col-section'>
          <h4 className=' py-2'>It's the process of continuous growth</h4>
          <hr className='solid col-3 '></hr>
          <h1 className=' py-2'>Moje Bilješke</h1>

          <p className=' py-2'>
            "Moje bilješke" je web aplikacija koja omogućava korisnicima da se prijave na svoj
            korisnički račun i upisuju, uređuju i brišu svoje bilješke. Aplikacija je napisana
            koristeći React i TypeScript te pruža intuitivan i jednostavan način za organiziranje i
            praćenje ličnih bilješki.
            <br />
            <br />
            Korisnici mogu stvoriti korisnički račun putem registracije na web stranici. Nakon
            prijave, imaju pristup interfejsu za upravljanje bilješkama, gdje mogu unijeti nove
            bilješke koristeći obrazac za unos teksta. Svaka bilješka ima naslov i sadržaj.
            <br />
            <br />
            Korisnici mogu pregledavati svoje postojeće bilješke u preglednom popisu. Također imaju
            mogućnost uređivanja postojećih bilješki, što im omogućuje ažuriranje sadržaja ili
            naslova bilješke prema potrebi. Uz to, mogu i trajno izbrisati bilješke koje više nisu
            potrebne.
            <br />
            <br />
            Uz funkcionalnosti za korisnike, aplikacija također ima administratorsku ulogu.
            Administrator ima ovlasti za upravljanje podacima korisnika. To uključuje pregled i
            uređivanje korisničkih podataka kao što je korisničko ime.
            <br />
            <br />
            Aplikacija "Moje bilješke" pruža sigurno okruženje za pohranu osobnih bilješki
            korisnika. Korištenjem Reacta i TypeScripta, pruža se moderno i responsivno korisnički
            interfejs koji omogućuje učinkovito i intuitivno upravljanje bilješkama. Bilo da
            korisnici trebaju organizirati svoje misli, zapisivati važne informacije ili pratiti
            zadatke, "Moje bilješke" je pouzdana aplikacija koja olakšava njihovu produktivnost i
            organizaciju.
          </p>
          <Button
            onClick={() => {
              handleClick();
            }}
            className='py-2 button'
          >
            {' '}
            Kontaktirajte nas
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default HeroSection;
