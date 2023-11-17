import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRockets } from "../../store/rocketsSlice";
import Button from "../Button";
import Modal from "../Modal";

import styles from "./Main.module.css";

function Main() {
  const dispatch = useDispatch();
  const rocketsData = useSelector((state) => state.rockets);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRocket, setSelectedRocket] = useState(null);

  const openModal = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    dispatch(fetchRockets());
  }, [dispatch]);

  const handleButtonClick = (rocket) => {
    if (rocket) {
      setSelectedRocket(rocket);
    }
    openModal();
  };

  return (
    <article className={styles.mainContainer}>
      <section className={styles.mainSection}>
        {rocketsData &&
          rocketsData.data.map((rocket) => (
            <div key={rocket.id} className={styles.mainCard}>
              <div className={styles.upperCardPart}>
                <img src={rocket.flickr_images[0]} alt={rocket.name}></img>
                <h3>{rocket.name}</h3>
                <p>{rocket.description}</p>
              </div>
              <Button
                background="white"
                buttonText="READ MORE"
                margin="0 auto"
                marginTop="20px"
                marginBottom="20px"
                onClick={() => handleButtonClick(rocket)}
              />
            </div>
          ))}
      </section>
      <section>
        {modalOpen && (
          <Modal closeModal={setModalOpen} selectedRocket={selectedRocket} />
        )}
      </section>
    </article>
  );
}

export default Main;
