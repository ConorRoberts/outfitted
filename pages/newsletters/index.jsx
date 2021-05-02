import React, { useEffect, useState } from "react";
import Header from "@components/Header";
import useUserSettings from "@utils/useUserSettings";
import { useSession } from "next-auth/client";
import Item from "@components/Item";
import styles from "@styles/Newsletter.module.scss";
import _ from "lodash";
import { BsPlusCircle } from "react-icons/bs";
import Container from "@components/Container";

const WEEK_ZERO_START = new Date(2021, 5, 3);
const WEEK_MS = 1000 * 60 * 60 * 24 * 7;

// Function to convert date to a week number relative to WEEK ZERO
const getWeekNumber = (date) =>
  Math.abs(
    Math.round((new Date(date).getTime() - WEEK_ZERO_START.getTime()) / WEEK_MS)
  );

const Recommendation = ({ recommendation }) => {
  const [open, setOpen] = useState(false);
  const { item, body } = recommendation;
  return (
    <div className={styles.recommendation}>
      <div className={styles.item}>
        <Item item={item} />
      </div>
      <div className={styles.bigScreen}>
        <div className={styles.text}>
          <h4>What we think...</h4>
          <p>{body}</p>
        </div>
      </div>
      <div className={styles.smallScreen}>
        <div className={styles.openButton}>
          <BsPlusCircle onClick={() => setOpen(!open)} />
        </div>
        {open && (
          <div className={styles.text}>
            <h4>What we think...</h4>
            <p>{body}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Newsletters = () => {
  const [session, loading] = useSession();
  const settings = useUserSettings(session?.user?.id);

  const [items, setItems] = useState([]);

  // Create a valid settings list from the one we're given from the API
  useEffect(() => {
    if (settings) {
      const filteredItems = settings.recommendations
        .slice()
        .sort((a, b) => new Date(a.timeLive) - new Date(b.timeLive))
        .filter(
          ({ timeLive }) =>
            new Date(timeLive) <= Date.now() &&
            new Date(timeLive) >= WEEK_ZERO_START
        )
        .map((item) => ({
          ...item,
          weekNumber: getWeekNumber(item.timeLive),
        }));
      setItems(_.groupBy(filteredItems, "weekNumber"));
    }
  }, [settings]);

  return (
    <div>
      <Header
        title={`${settings ? settings?._user?.name : "Someone"}'s Newsletter`}
      />
      <Container>
        {Object.entries(items)
          .reverse()
          .map(([week, recommendations]) => (
            <div className={styles.weekContainer} key={`items-week-${week}`}>
              <h3 className={styles.weekTitle}>Week #{week}</h3>
              {recommendations.map((r) => (
                <Recommendation recommendation={r} key={r._id} />
              ))}
            </div>
          ))}
      </Container>
    </div>
  );
};

export default Newsletters;
