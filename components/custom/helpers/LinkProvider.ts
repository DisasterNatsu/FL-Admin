export const LinkProvider = (s: string) => {
  let link;

  switch (s) {
    case "LuckBazar":
      link = "post-luckBazar-winloss";
      break;

    case "Fatafat":
      link = "post-fatafat-winloss";
      break;

    case "SmartMatka":
      link = "post-smartMatka-winloss";
      break;

    case "OpenClose":
      link = "post-openClose-winloss";
      break;

    default:
      break;
  }

  return link;
};
