import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";

export const useSliderHook = (isNews) => {
  const desctop = useMediaQuery("(min-width:1198px");
  const tablet = useMediaQuery("(min-width: 850px");
  const mobile = useMediaQuery("(max-width:450px");
  const [slidesPerScreen, setSlidesPerScreen] = useState(isNews ? 4.25 : 3.25);

  useEffect(() => {
    console.log(desctop);
    if (desctop) {
      setSlidesPerScreen(isNews ? 4.1 : 3.25);
    } else if (tablet) {
      setSlidesPerScreen(2.15);
    } else {
      setSlidesPerScreen(1.35);
    }
  }, [desctop, tablet, mobile]);

  return slidesPerScreen;
};
