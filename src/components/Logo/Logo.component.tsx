import React, { useEffect, useState } from "react";
import { createFileName } from "../../utils/utils";

const Logo = ({ teamName }) => {
  const [teamLogo, setTeamLogo] = useState("");

  useEffect(() => {
    async function renderLogos() {
      const teamNameModified = createFileName(teamName);
      const res = await import(
        `../../assets/images/${teamNameModified}-logo.svg`
      );

      setTeamLogo(res.default);
    }

    renderLogos();
  }, [teamName]);

  return <img src={teamLogo} alt={teamName} />;
};

export default Logo;
