import {
   Html,
   Head,
   Preview,
   Tailwind,
   Body,
   Container,
   Section,
   Text,
   Button,
   Hr,
   Link,
} from '@react-email/components';

interface EmailVerificationProps {
   userName: string;
   verificationUrl: string;
   companyName: string;
}

const EmailVerification = ({ userName, verificationUrl, companyName }: EmailVerificationProps) => {

   return (
      <Html lang="en" dir="ltr">
         <Head />
         <Preview>
            Verify your email address to complete your registration
         </Preview>
         <Tailwind>
            <Body className="bg-gray-100 font-sans p-[40px]">
               <Container className="bg-white rounded-[10px] shadow-sm max-w-[600px] mx-auto p-[40px]">
                  {/* Header */}
                  <Section className="text-center mb-[32px]">
                     <Text className="text-[24px] font-bold text-gray-900 m-0">
                        Welcome to {companyName}!
                     </Text>
                  </Section>

                  {/* Main Content */}
                  <Section className="mb-[32px]">
                     <Text className="text-[16px] text-gray-700 mb-[16px] m-0">
                        Hi {userName},
                     </Text>
                     <Text className="text-[16px] text-gray-700 mb-[16px] m-0">
                        Thank you for signing up! To complete your registration
                        and start using your account, please verify your email
                        address by clicking the button below.
                     </Text>
                     <Text className="text-[16px] text-gray-700 mb-[24px] m-0">
                        This verification link will expire in 24 hours for
                        security purposes.
                     </Text>
                  </Section>

                  {/* Verification Button */}
                  <Section className="text-center mb-[32px]">
                     <Button
                        href={verificationUrl}
                        className="bg-blue-600 text-white px-[32px] py-[12px] rounded-[6px] text-[16px] font-semibold no-underline box-border"
                     >
                        Verify Email Address
                     </Button>
                  </Section>

                  {/* Alternative Link */}
                  <Section className="mb-[32px]">
                     <Text className="text-[14px] text-gray-600 mb-[8px] m-0">
                        If the button doesn't work, you can copy and paste this
                        link into your browser:
                     </Text>
                     <Text className="text-[14px] text-blue-600 break-all m-0">
                        <Link
                           href={verificationUrl}
                           className="text-blue-600 underline"
                        >
                           {verificationUrl}
                        </Link>
                     </Text>
                  </Section>

                  <Hr className="border-gray-200 my-[24px]" />

                  {/* Security Notice */}
                  <Section className="mb-[24px]">
                     <Text className="text-[14px] text-gray-600 mb-[8px] m-0">
                        <strong>Security Notice:</strong>
                     </Text>
                     <Text className="text-[14px] text-gray-600 m-0">
                        If you didn't create an account with us, please ignore
                        this email. Your email address will not be added to our
                        system.
                     </Text>
                  </Section>

                  {/* Footer */}
                  <Section className="border-t border-gray-200 pt-[24px]">
                     <Text className="text-[12px] text-gray-500 text-center mb-[8px] m-0">
                        This email was sent by {companyName}
                     </Text>
                     <Text className="text-[12px] text-gray-500 text-center mb-[8px] m-0">
                        123 Business Street, Suite 100, Dhaka 1000, Bangladesh
                     </Text>
                     <Text className="text-[12px] text-gray-500 text-center m-0">
                        © 2025 {companyName}. All rights reserved.
                     </Text>
                  </Section>
               </Container>
            </Body>
         </Tailwind>
      </Html>
   );
};

EmailVerification.PreviewProps = {
   userName: 'John Doe',
   verificationUrl: 'https://yourapp.com/verify?token=abc123xyz789',
   companyName: 'YourApp',
};

export default EmailVerification;
