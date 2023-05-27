import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import utilsStyles from '../../styles/utils.module.css';

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: any, e: any) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className='d-block w-100'
          src='https://s9.pik.ba/galerija/2021-09/28/09/slika-2580104-61536dcf68ec8-velika.jpg'
          alt='First slide'
        />
        <Carousel.Caption>
          <h3>Zabolila vas je ruka pisajući bilješke?</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className='d-block w-100'
          src='https://miro.medium.com/v2/resize:fit:800/1*re49nuN5UQ31fm8C40f_aw.jpeg'
          alt='Second slide'
        />

        <Carousel.Caption className={utilsStyles.textBlack}>
          <h3>Nestalo vam je prostora?</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className='d-block w-100'
          src='https://www.thebeaverton.com/wp-content/uploads/2022/09/man-thinking-800x600.jpg'
          alt='Third slide'
        />

        <Carousel.Caption className={utilsStyles.textBlack}>
          <h3>Registrujte se na Moje bilješke</h3>
          <p>Besplatno kreirajte, uređivajte i brišite vaše bilješke.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

//render(<ControlledCarousel />);
export default ControlledCarousel;
