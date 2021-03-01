import React, { useContext, useEffect, useState } from "react";
import Logo from "../Logo/Logo.component";
import VideoDialog from "../VideoDialog/VideoDialog.component";
import Context from "../../context/context";

const Scoring = () => {
  const { goalsObjData, contentData }: any = useContext(Context);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [videoSource, setVideoSource] = useState<string>("");

  // Clear the Video Source when the Dialog closes.
  useEffect(() => {
    if (!showDialog) {
      setVideoSource("");
    }
  }, [showDialog]);

  return (
    <section className="game-summary-scoring">
      {Object.keys(goalsObjData).length > 0 ? (
        Object.keys(goalsObjData).map((period) => {
          return (
            <div className="game-summary-scoring-period" key={period}>
              <h4 className="game-summary-period-title">{period}</h4>
              {goalsObjData[period].map((goal, index) => {
                // Find the corresponding video to the goal.
                const videoUrl = contentData?.highlights.scoreboard.items
                  .find((video) => {
                    const id = video.keywords.find(
                      (elem) => elem.type === "statsEventId"
                    )?.value;

                    return goal.about.eventId === +id;
                  })
                  ?.playbacks.find(
                    (playback) => playback.name === "FLASH_1800K_896x504"
                  )?.url;

                return (
                  <div className="game-summary-scoring-period-data" key={index}>
                    <div className="game-summary-scoring-player-row">
                      <ul className="game-summary-scoring-player-row-players">
                        <li className="game-summary-scoring-player-row-players-time">
                          {goal.about.periodTime}
                        </li>
                        <li>
                          <Logo teamName={goal.team.name} />
                        </li>
                        <li className="game-summary-scoring-player-row-players-data">
                          {goal.players.map((playerObj) => {
                            const {
                              player,
                              playerType,
                              seasonTotal,
                            } = playerObj;
                            const { fullName, id } = player;

                            if (
                              playerType !== "Goalie" &&
                              playerType === "Scorer"
                            ) {
                              return (
                                <a
                                  href={`/player/${id}`}
                                  className="game-summary-scoring-player-row-players-data-scorer"
                                  key={id}
                                >
                                  {fullName} ({seasonTotal}){" "}
                                  {(goal.result.strength.code === "SHG" ||
                                    goal.result.strength.code === "PPG") &&
                                    `(${goal.result.strength.code})`}
                                  {goal.result.emptyNet && `(EN)`}
                                </a>
                              );
                            } else if (
                              playerType !== "Goalie" &&
                              playerType === "Assist"
                            ) {
                              return (
                                <span
                                  className="game-summary-scoring-player-row-players-data-assist"
                                  key={id}
                                >
                                  {fullName}
                                </span>
                              );
                            }
                          })}
                        </li>
                      </ul>
                      <div className="game-summary-scoring-player-row-goalStatus">
                        {Object.keys(goal.about.goals).map((team) => {
                          return (
                            <span
                              key={team}
                              className="game-summary-scoring-player-row-goalStatus-teams"
                            >
                              {goal.about.goals[team]}
                            </span>
                          );
                        })}
                      </div>
                      {videoUrl && (
                        <div className="game-summary-scoring-player-row-goalVideo">
                          <button
                            type="button"
                            onClick={() => {
                              setVideoSource(videoUrl);
                              setShowDialog(!showDialog);
                            }}
                          >
                            &#9654;
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })
      ) : (
        <div className="game-summary-scoring-period">
          <div className="game-summary-period-container">None.</div>
        </div>
      )}

      {showDialog && (
        <VideoDialog videoSource={videoSource} controlDialog={setShowDialog} />
      )}
    </section>
  );
};

export default Scoring;
