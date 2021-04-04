import React from "react";
import Header from "@components/Header";
import useUserSettings from "@utils/useUserSettings";
import { useSession } from "next-auth/client";
import Item from "@components/Item";

const Newsletters = () => {
  const [session, loading] = useSession();
  const settings = useUserSettings(session?.user?.id);

  const WEEK_ZERO_START = new Date(2021, 3, 4);
  const WEEK_MS = 1000 * 60 * 60 * 24 * 7;
  const getWeekNumber = (date) =>
    Math.abs(
      Math.round(
        (new Date(date).getTime() - WEEK_ZERO_START.getTime()) / WEEK_MS
      )
    );

  return (
    <div>
      <Header
        title={`${settings ? settings?._user?.name : "Someone"}'s Newsletter`}
      />
      <main>
        <div>
          <div>
            {settings?.recommendations
              .filter(({ timeLive }) => new Date(timeLive) <= Date.now())
              .map(({ item, body, timeLive }) => (
                <div key={item._id}>
                  <Item item={item} />
                  <p>
                    WEEK NUMBER {getWeekNumber(timeLive)}: {body}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Newsletters;
