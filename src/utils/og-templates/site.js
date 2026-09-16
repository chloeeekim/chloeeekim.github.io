import satori from "satori";
import { SITE } from "@/config";
import loadGoogleFonts from "../loadGoogleFont";
import { OG } from "./palette";

export default async () => {
  // Get the clean hostname (e.g. mydomain.com)
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
          // 1. Top Right Decorative Gradient (Purple)
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                top: "-150px",
                right: "-50px",
                width: "600px",
                height: "600px",
                background: `linear-gradient(140deg, ${OG.accent}, ${OG.featured})`,
                filter: "blur(120px)",
                opacity: 0.16,
                borderRadius: "100%",
              },
            },
          },
          // 2. Bottom Left Decorative Gradient (Indigo)
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                bottom: "-150px",
                left: "-50px",
                width: "500px",
                height: "500px",
                background: `linear-gradient(140deg, ${OG.featured}, ${OG.accent})`,
                filter: "blur(120px)",
                opacity: 0.12,
                borderRadius: "100%",
              },
            },
          },

          // 3. Central Container
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
                // Site Title (HERO)
                {
                  type: "h1",
                  props: {
                    style: {
                      fontSize: 100, // Very large
                      fontWeight: 900,
                      letterSpacing: "-2px",
                      color: OG.foreground,
                      margin: "0 0 20px 0",
                      lineHeight: 1,
                    },
                    children: SITE.title,
                  },
                },

                // Small separator line
                {
                  type: "div",
                  props: {
                    style: {
                      width: "80px",
                      height: "6px",
                      backgroundColor: OG.accent,
                      borderRadius: "4px",
                      marginBottom: "30px",
                    },
                  },
                },

                // Site description
                {
                  type: "p",
                  props: {
                    style: {
                      fontSize: 36,
                      color: OG.secondary,
                      maxWidth: "80%", // So it doesn't stretch too much to the sides
                      margin: 0,
                      lineHeight: 1.4,
                      fontWeight: 400,
                    },
                    children: SITE.desc,
                  },
                },
              ],
            },
          },

          // 4. Footer: Site URL (Pill design)
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
                    fontSize: 24,
                    color: OG.secondary, // Subtle text
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
      fonts: await loadGoogleFonts(SITE.title + SITE.desc + hostname),
    }
  );
};
