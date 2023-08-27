import { useThemeContext } from "@/utils/Theme";
import styles from "./pagination.module.scss";
import Prev from "../../../public/images/prev.svg";
import Next from "../../../public/images/next.svg";

export default function Pagination({ state }: { state: boolean }) {
  const { allowClick, page, setPage } = useThemeContext();

  return (
    <div className={styles.wrapper}>
      <button
        onClick={() => setPage((prev: any) => String(prev - 1))}
        disabled={page <= "0" || !allowClick}
      >
        <Prev />
        <p>PREV</p>
      </button>
      <button
        onClick={() => setPage((prev: any) => String(+prev + 1))}
        disabled={state || !allowClick}
      >
        <Next />
        <p>NEXT</p>
      </button>
    </div>
  );
}
