import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

const sendEmail = async (to: string, subject: string, html: string) => {
   const { data, error } = await resend.emails.send({
      from: 'MyApp <onboarding@resend.dev>',
      to: [to],
      subject: subject,
      html: html,
   });
   return { data, error };
};

export { sendEmail };
