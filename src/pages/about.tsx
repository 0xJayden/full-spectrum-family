import Image from "next/image";

import Navbar from "~/components/Navbar";
import about from "~/assets/images/about.png";

export default function About() {
  return (
    <div>
      <Navbar />
      <div className="space-y-3 p-5 md:flex md:space-x-5 md:space-y-0">
        <Image className="md:hidden" alt="" src={about} />
        <div className="space-y-3 md:p-5">
          <h1 className="text-center text-3xl font-bold">About</h1>
          <p>{`Welcome to the Full Spectrum Family! We are thrilled to have you here and excited to share our mission with you.`}</p>
          <p>{`Full Spectrum Family is the community outreach and engagement branch of Infinity Opportunities, a company created with the intention of providing stable community and employment for neurodivergent adults. We believe that everyone has unique talents and abilities, and we strive to create a world where these differences are celebrated and embraced.`}</p>
          <p>{`Our community is made up of artists, educators, innovators, professionals, and brilliant souls from all over the globe who are dedicated to changing the world by nurturing and embracing our inherent differences and gifts, rather than in spite of them. We believe that by working together, we can create a brighter future for everybody.`}</p>
          <p>{`At Full Spectrum Family, we are committed to building an international network of like-minded individuals who are passionate about making a positive impact. Our community is open and welcoming to everyone, regardless of neurotype or background.`}</p>
          <p>{`We offer a range of programs and initiatives that support our mission, including art exhibitions, educational workshops, and employment opportunities. We believe that by providing stable employment and a supportive community, we can empower neurodivergent adults to reach their full potential.`}</p>
          <p>{`We invite you to explore our website and learn more about Full Spectrum Family and our mission. We hope that you will join us in our efforts to create a more inclusive and accepting world. Thank you for visiting!`}</p>
        </div>
        <Image className="hidden md:block md:p-5" alt="" src={about} />
      </div>
    </div>
  );
}
