import React, { useState } from "react";
import i18n from '@dhis2/d2-i18n'
import { Menu, MenuItem, MenuSectionHeader } from '@dhis2/ui'
import styles from './App.module.css'
import { useDataQuery } from "@dhis2/app-runtime"
import ProgList from './ProgList'
import DataSetList from "./DataSetList";


const MyApp = () => {

    const [activeProg, setPrograms] = useState(false);
    const [activeData, setDataset] = useState(false);
    return (
        <div className={styles.container}>
            <nav className={styles.menu} data-test-id="menu">
                <MenuSectionHeader label={i18n.t('Menu')} />
                <Menu>
                    <MenuItem
                        active={activeProg}
            		label={i18n.t("Programs")}
            		dataTest="menu-programs"
            		onClick={() => {
              			setDataset(false);
              			setPrograms(true);
            		}}		
                    />
                    <MenuItem
                        active={activeData}
            		label={i18n.t("Data sets")}
            		dataTest="menu-dataSets"
            		onClick={() => {
              			setDataset(true);
              			setPrograms(false);
            		}}
                    />
                </Menu>
            </nav>

	    
            <main className={styles.main}>
	    {activeData && <DataSetList />}
            {activeProg && <ProgList />}
            </main>
	     
              

        </div>
	     	
    )
}
export default MyApp
