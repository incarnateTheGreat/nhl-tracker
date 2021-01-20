import React, { useEffect, useState } from "react";
import { createImageLink } from "../../utils/utils";

const Logo = ({ teamName, size = "medium" }) => {
  const [teamLogo, setTeamLogo] = useState("");

  useEffect(() => {
    async function renderLogos() {
      const res = await createImageLink(teamName);

      setTeamLogo(res);
    }

    renderLogos();
  }, [teamName]);

  return <img className={`logo logo-${size}`} src={teamLogo} alt={teamName} />;
};

export default Logo;
