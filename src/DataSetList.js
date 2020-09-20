import React, { useState } from "react";
import i18n from "@dhis2/d2-i18n";
import { Menu, MenuItem, MenuSectionHeader } from "@dhis2/ui";
import styles from "./App.module.css";
import { useDataQuery } from "@dhis2/app-runtime";
import Details from "./activeDetails";

const dataSets = {
  dataSets: {
    resource: "dataSets",
    params: {
      paging: false,
      fields: ["id", "name", "created"],
    },
  },
};

export default function DataSetList() {
  const { error, loading, data } = useDataQuery(dataSets);
  const [activeDetail, setActiveDetails] = useState();
  return (
    <div className={styles.container}>
      <nav className={styles.menu}>
        <MenuSectionHeader label={i18n.t("List")} />
        <Menu>
          {loading && <span>...loading</span>}
          {error && <span>{`ERROR: ${error.message}`}</span>}
          {data &&
            data.dataSets.dataSets.map((dataSet) => (
              <MenuItem
                active={activeDetail && dataSet.id === activeDetail.id}
                key={dataSet.id}
                label={dataSet.name}
                dataTest={`list-dataSet-${dataSet.id}`}
                onClick={() => setActiveDetails(dataSet)}
              />
            ))}
        </Menu>
      </nav>
      <main className={styles.main}>
        {activeDetail && 
          <Details {...activeDetail}/>
        }
      </main>
    </div>
  );
};