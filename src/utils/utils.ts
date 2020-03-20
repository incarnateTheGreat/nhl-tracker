export const createFileName = fileName => {
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
        player: "Player"
      }
    }
  },
  es: {
    translation: {
      date: `today is the {{now, intlDate}}`,
      nav: {
        schedule: "Calendario",
        standings: "Clasificación",
        game: "Partido",
        player: "Jugador"
      }
    }
  }
};
