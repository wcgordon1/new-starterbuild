import type { APIRoute } from "astro";

const getSecurityTxt = (contactEmail: string) => `
Contact: mailto:${contactEmail}
Expires: ${new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString()}
Preferred-Languages: en
`;

export const GET: APIRoute = () => {
  const contactEmail = "will@starterbuild.com";
  return new Response(getSecurityTxt(contactEmail), {
    headers: {
      "Content-Type": "text/plain",
    },
  });
};
