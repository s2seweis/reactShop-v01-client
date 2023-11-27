import { useDocumentTitle, useScrollTop } from 'hooks';
import React from 'react';
import { useState } from "react";

const Docs = () => {
  useDocumentTitle('Welcome | Admin Docs');
  useScrollTop();

  const [isActive, setIsActive] = useState(false);
  const [selected, setIsSelected] = useState("Öffnen");

  return (
    <div className="loader-new">
      <h2 style={{ textAlign: "center" }}
      >Welcome to the Docs</h2>
      <div className="dropdown-new">
      </div>
    </div>
  );
};

export default Docs;