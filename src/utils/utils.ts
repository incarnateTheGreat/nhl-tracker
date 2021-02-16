export const createFileName = (fileName) => {
  return fileName
    .toLowerCase()
    .replace(".", "")
    .replace(/[é]/g, "e")
    .replace(/[É]/g, "E")
    .replace(/\s/g, "-");
};

export const createImageLink = async (teamName) => {
  const teamNameModified = createFileName(teamName);
  const res = await import(`../assets/images/${teamNameModified}-logo.svg`);

  return res.default;
};

export const resources = {
  en: {
    translation: {
      date: `today is the {{now, intlDate}}`,
      nav: {
        scores: "Scores",
        standings: "Standings",
        game: "Game",
        player: "Player",
      },
      team: {
        schedule: {
          date: "Date",
          opponent: "Opponent",
          time: "Time (EST)",
          result: "Result",
          record: "Record",
        },
      },
    },
  },
  es: {
    translation: {
      date: `today is the {{now, intlDate}}`,
      nav: {
        scores: "Resultados",
        standings: "Clasificación",
        game: "Partido",
        player: "Jugador",
      },
      team: {
        schedule: {
          Scoresdate: "Fecha",
          opponent: "Adversaria",
          time: "Hora (HNE)",
          result: "Resultado",
          record: "Record",
        },
      },
    },
  },
};
