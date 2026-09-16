import satori from "satori";
import { SITE } from "@/config";
import loadGoogleFonts from "../loadGoogleFont";
import { OG } from "./palette";

export default async post => {
  const hostname = new URL(SITE.website).hostname;

  return satori(
    {
      type: "div",
      props: {
        style: {
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: OG.background,
          color: OG.foreground,
          padding: "80px",
          position: "relative",
        },
        children: [
          // 1. Background Decorative Element (Painted first = stays in background)
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                top: "-100px",
                right: "-100px",
                width: "600px",
                height: "600px",
                background: `linear-gradient(140deg, ${OG.accent}, ${OG.featured})`,
                filter: "blur(100px)",
                opacity: 0.18,
                borderRadius: "100%",
              },
            },
          },

          // 2. Header: Site name (Painted on top of background)
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "center",
                backgroundColor: OG.surface,
                padding: "10px 24px",
                borderRadius: "50px",
                border: `1px solid ${OG.border}`,
              },
              children: {
                type: "span",
                props: {
                  style: {
                    fontSize: 24,
                    fontWeight: "bold",
                    color: OG.accent,
                    letterSpacing: "2px",
                  },
                  children: hostname,
                },
              },
            },
          },

          // 3. Main Content: Post Title
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                width: "100%",
                // zIndex removed (not needed due to child order)
              },
              children: {
                type: "h1",
                props: {
                  style: {
                    fontSize: 84,
                    fontWeight: 900,
                    lineHeight: 1.1,
                    margin: 0,
                    color: OG.foreground,

                    overflow: "hidden",
                    display: "-webkit-box",
                    lineClamp: 3,
                    boxOrient: "vertical",
                  },
                  children: post.data.title,
                },
              },
            },
          },

          // 4. Footer: Author
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "center",
                width: "100%",
                // zIndex removed
              },
              children: [
                // Decorative separator line
                {
                  type: "div",
                  props: {
                    style: {
                      width: "60px",
                      height: "4px",
                      backgroundColor: OG.accent,
                      marginRight: "24px",
                    },
                  },
                },
                {
                  type: "span",
                  props: {
                    style: {
                      fontSize: 32,
                      color: OG.secondary,
                    },
                    children: [
                      "Written by ",
                      {
                        type: "span",
                        props: {
                          style: {
                            fontWeight: "bold",
                            color: OG.foreground,
                            marginLeft: "8px",
                          },
                          children: post.data.author,
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      embedFont: true,
      fonts: await loadGoogleFonts(
        post.data.title + post.data.author + hostname + "Writtenby"
      ),
    }
  );
};
