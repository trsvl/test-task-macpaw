import { ThemeI } from "@/Interfaces/Theme";
import { useThemeContext } from "@/utils/Theme";
import styles from "./imagehistory.module.scss";
import Image from "next/image";
const { v4: uuidv4 } = require("uuid");

export default function ImageHistory() {
  const { imageHistory } = useThemeContext() as ThemeI;

  return (
    <>
      {imageHistory?.length !== 0 ? (
        <div className={styles.wrapper}>
          {imageHistory.map((item) => {
            return (
              <div key={uuidv4()}>
                <div>
                  <div className={styles.time}>
                    <p> {item.time}</p>
                  </div>
                  <div className={styles.text}>
                    <p>
                      Image ID: <strong>{item.id} </strong>was
                      {item.action ? " added to " : " removed from "}
                      {item.value === "likes"
                        ? "Likes"
                        : item.value === "favourites"
                        ? "Favourites"
                        : "Dislikes"}
                    </p>
                  </div>
                </div>
                <div className={styles.img__wrapper}>
                  {item.action &&
                    (item.value === "likes" ? (
                      <Image
                        src={"/images/smiling-face-green-small.svg"}
                        width={20}
                        height={20}
                        alt="Like"
                      />
                    ) : item.value === "favourites" ? (
                      <Image
                        src={"/images/favourite-red-small-border.svg"}
                        width={20}
                        height={20}
                        alt="Favourite"
                      />
                    ) : (
                      <Image
                        src={"/images/sad-face-yellow-small.svg"}
                        width={20}
                        height={20}
                        alt="Dislike"
                      />
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </>
  );
}
