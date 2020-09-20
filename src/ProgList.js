import React, { useState } from "react";
import i18n from "@dhis2/d2-i18n";
import { Menu, MenuItem, MenuSectionHeader } from "@dhis2/ui";
import styles from "./App.module.css";
import { useDataQuery } from "@dhis2/app-runtime";
import Details from "./activeDetails";

const programs = {
  programs: {
    resource: "programs",
    params: {
      paging: false,
      fields: ["id", "name", "created"],
    },
  },
};

export default function ProgList(){
  const { error, loading, data } = useDataQuery(programs);
  const [activeDetail, setActiveDetails] = useState();
  console.log(data);
  return (
    <div className={styles.container}>
      <nav className={styles.menu}>
        <MenuSectionHeader label={i18n.t("List")} />
        <Menu>
          {loading && <span>...loading</span>}
          {error && <span>{`ERROR: ${error.message}`}</span>}
          {data &&
            data.programs.programs.map((program) => (
              <MenuItem
                active={activeDetail && program.id === activeDetail.id}
                key={program.id}
                label={program.name}
                dataTest={`list-program-${program.id}`}
                onClick={() => setActiveDetails(program)}
              />
            ))}
        </Menu>
      </nav>
      <main className={styles.main}>
        {activeDetail && <Details {...activeDetail} />}
      </main>
    </div>
  );
};

