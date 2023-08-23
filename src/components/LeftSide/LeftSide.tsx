import styles from "./left.module.scss";
import { currentPageProps } from "@/Interfaces/SelectedPageInterface";
import Cards from "./Cards";


export default function LeftSide({
  currentPath,
}: currentPageProps) {

  return (
    <div className={currentPath === "" ? styles.left : styles.left__disable}>
      <h1>Hi!👋</h1>
      <h2>Welcome to MacPaw Bootcamp 2023</h2>
      <h3>Lets start using The Cat API</h3>
      <Cards currentPath={currentPath}/>
    </div>
  );
}
