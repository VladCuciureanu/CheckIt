import type { DefaultSeoProps } from "next-seo"

const title = `CheckIt`
const description = `Minimalist checklist application.`
const domain = `https://github.com/VladCuciureanu/CheckIt`

export const seo: DefaultSeoProps = {
  title: title + " | " + description,
  description,
  openGraph: {
    title,
    type: "website",
    url: `https://${domain}`,
    site_name: title,
    images: [
      {
        url: "public/graphics/og.jpg",
        width: 1600,
        height: 836,
        alt: title,
      },
    ],
  },
}
