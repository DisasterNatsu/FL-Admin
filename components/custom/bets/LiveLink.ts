export const LiveLinks = (type: string) => {
  switch (type) {
    case "LuckBazar":
      return "get-current-lb-game";
      break;

    case "Fatafat":
      return "get-current-ff-game";
      break;

    case "SmartMatka":
      return "get-current-sm-game";
      break;

    case "OpenClose":
      return "get-current-oc-game";
      break;

    default:
      break;
  }
};

export const LivePostLink = (type: string) => {
  switch (type) {
    case "LuckBazar":
      return "lb-game-number";
      break;

    case "Fatafat":
      return "ff-game-number";
      break;

    case "SmartMatka":
      return "sm-game-number";
      break;

    case "OpenClose":
      return "oc-game-number";
      break;
  }
};
