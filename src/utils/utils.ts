export const createFileName = (fileName) => {
  return fileName
    .toLowerCase()
    .replace(".", "")
    .replace(/[é]/g, "e")
    .replace(/[É]/g, "E")
    .replace(/\s/g, "-");
};

export const resources = {
  en: {
    translation: {
      date: `today is the {{now, intlDate}}`,
      nav: {
        schedule: "Schedule",
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
        schedule: "Calendario",
        standings: "Clasificación",
        game: "Partido",
        player: "Jugador",
      },
      team: {
        schedule: {
          date: "Fecha",
          opponent: "Adversaria",
          time: "Hora (HNE)",
          result: "Resultado",
          record: "Record",
        },
      },
    },
  },
};
