import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { Subjects } from './Subjects';
import { useStateContext } from '../../contexts/StateContextProvider';
import { WageRange } from './WageRange';
import '../../stylesheets/AdvancedSearch.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const AdvancedSearch = () => {
  const { advancedSearch, setAdvancedSearch } = useStateContext();
  const [subjects, setSubjects] = useState([]);
  const [wages, setWages] = useState([200, 2000]);
  const { searchParams, setNewSearchParams } = useStateContext();

  const updateParams = () => {
    const newParams = { subjects, wages };
    setNewSearchParams(newParams);
    setAdvancedSearch(false);
  };

  return (
    <ReactModal
      isOpen={advancedSearch}
      className="AdvancedSearch"
      overlayClassName="AdvancedSearchOverlay"
    >
      <div className="optionsContainer">
        <div className="d-inline-flex">
          <p className="align-self-center me-5">Subjects:</p>&nbsp;&nbsp;<Subjects subjects={searchParams.subjects} onSubjectChange={(newSubjects) => setSubjects(newSubjects)} />
        </div>
        <div className="d-inline-flex">
          <p className="align-self-center me-5">Wages:</p><WageRange wages={searchParams.wages} onWageChange={(newWages) => setWages(newWages)} />
        </div>
        <div className="d-inline-flex">
          <button type="button" onClick={updateParams}>Search</button>
          <button type="button" onClick={() => setAdvancedSearch(false)}>Cancel</button>
        </div>
      </div>
    </ReactModal>
  );
};
