import Image from "next/image";
import styles from "./page.module.scss";

export default function Home() {
  return (
      <div className={styles.right}>
        <Image
          src={"/images/girl-and-pet.png"}
          width={775}
          height={900}
          priority
          alt={"Girl and pet image"}
          className={styles.right__image}
        />
      </div>
  );
}
