import satori from "satori";
import { SITE } from "@/config";
import loadGoogleFonts from "../loadGoogleFont";
import { OG } from "./palette";

/**
 * Generates an OG image for a tag page.
 * @param {string} tagName - The display name of the tag (e.g. "javascript")
 */
export default async tagName => {
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
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: OG.background,
          backgroundImage: `radial-gradient(circle at 25px 25px, ${OG.dot} 2%, transparent 0%), radial-gradient(circle at 75px 75px, ${OG.dot} 2%, transparent 0%)`,
          backgroundSize: "100px 100px",
          color: OG.foreground,
          position: "relative",
        },
        children: [
          // Top-right decorative glow (accent blue)
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                top: "-120px",
                right: "-80px",
                width: "550px",
                height: "550px",
                background: `linear-gradient(140deg, ${OG.accent}, ${OG.featured})`,
                filter: "blur(110px)",
                opacity: 0.16,
                borderRadius: "100%",
              },
            },
          },
          // Bottom-left decorative glow
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                bottom: "-120px",
                left: "-80px",
                width: "450px",
                height: "450px",
                background: `linear-gradient(140deg, ${OG.featured}, ${OG.accent})`,
                filter: "blur(110px)",
                opacity: 0.12,
                borderRadius: "100%",
              },
            },
          },

          // Central content
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "40px",
                width: "90%",
              },
              children: [
                // "# tag" hero label
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      alignItems: "baseline",
                      gap: "4px",
                    },
                    children: [
                      {
                        type: "span",
                        props: {
                          style: {
                            fontSize: 80,
                            fontWeight: 900,
                            color: OG.accent,
                            opacity: 0.7,
                            lineHeight: 1,
                            marginRight: "4px",
                          },
                          children: "#",
                        },
                      },
                      {
                        type: "span",
                        props: {
                          style: {
                            fontSize: 96,
                            fontWeight: 900,
                            letterSpacing: "-2px",
                            color: OG.foreground,
                            lineHeight: 1,
                          },
                          children: tagName,
                        },
                      },
                    ],
                  },
                },

                // Separator
                {
                  type: "div",
                  props: {
                    style: {
                      width: "80px",
                      height: "5px",
                      backgroundColor: OG.accent,
                      borderRadius: "4px",
                      margin: "28px 0",
                      opacity: 0.7,
                    },
                  },
                },

                // Subtitle
                {
                  type: "p",
                  props: {
                    style: {
                      fontSize: 32,
                      color: OG.secondary,
                      margin: 0,
                      lineHeight: 1.4,
                      fontWeight: 400,
                    },
                    children: `Posts by tag`,
                  },
                },
              ],
            },
          },

          // Footer pill: site hostname
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                bottom: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: OG.surface,
                border: `1px solid ${OG.border}`,
                padding: "12px 30px",
                borderRadius: "100px",
              },
              children: {
                type: "span",
                props: {
                  style: {
                    fontSize: 22,
                    color: OG.secondary,
                    fontWeight: 600,
                    letterSpacing: "1px",
                  },
                  children: hostname,
                },
              },
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      embedFont: true,
      fonts: await loadGoogleFonts(tagName + SITE.title + hostname),
    }
  );
};
